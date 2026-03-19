export interface ModuleInfo {
  /** e.g. "go-relay/v2" */
  name: string;
  /** e.g. "github.com/mirkobrombin/go-relay/v2" */
  importPath: string;
  /** First descriptive sentence from the module section */
  description: string;
  /** Full Markdown content of the section */
  content: string;
}

export interface ParsedIndex {
  modules: ModuleInfo[];
  /** "## Design principles" + "## Ecosystem integration pattern" sections */
  ecosystem: string;
}

/**
 * Parses the go-tools-index.md content into structured data.
 * Sections are delimited by `\n---\n` horizontal rules.
 */
export function parseIndex(markdown: string): ParsedIndex {
  const parts = markdown.split(/\n---\n/);

  const modules: ModuleInfo[] = [];
  const ecosystemParts: string[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (/^### go-/.test(trimmed)) {
      const mod = parseModuleSection(trimmed);
      if (mod) modules.push(mod);
    } else if (
      trimmed.includes("## Design principles") ||
      trimmed.includes("## Ecosystem integration pattern") ||
      trimmed.includes("## Module quick-reference")
    ) {
      ecosystemParts.push(trimmed);
    }
  }

  return { modules, ecosystem: ecosystemParts.join("\n\n---\n\n") };
}

function parseModuleSection(section: string): ModuleInfo | null {
  const lines = section.split("\n");

  // Header: "### go-relay/v2"
  const headerMatch = lines[0]?.match(/^### (.+)$/);
  if (!headerMatch) return null;
  const name = headerMatch[1].trim();

  // Import path: backtick line like `github.com/mirkobrombin/go-relay/v2`
  const importLine = lines.find((l) => /^`github\.com\//.test(l));
  const importPath = importLine ? importLine.replace(/`/g, "").trim() : "";

  // Description: first non-empty, non-structural line after the import path line
  let pastImport = false;
  let description = "";
  for (const line of lines.slice(1)) {
    if (!pastImport) {
      if (line.startsWith("`") && line.includes("github.com")) pastImport = true;
      continue;
    }
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("#") || t.startsWith("`") || t.startsWith("|") || t.startsWith(">")) continue;
    description = t;
    break;
  }

  return { name, importPath, description, content: section };
}

/**
 * Finds a module by name or partial match.
 * Supports: exact name, alias without "go-" prefix, alias without version suffix,
 * and substring match on name or import path.
 */
export function findModule(modules: ModuleInfo[], query: string): ModuleInfo | undefined {
  const q = query.toLowerCase().trim();

  // 1. Exact match
  const exact = modules.find((m) => m.name.toLowerCase() === q);
  if (exact) return exact;

  // 2. Lenient: strip "go-" prefix and "/vN" version suffix
  //    "relay" matches "go-relay/v2", "state-flow" matches "go-state-flow"
  const stripped = q.replace(/^go-/, "").replace(/\/v\d+$/, "");
  const lenient = modules.find((m) => {
    const base = m.name.toLowerCase().replace(/^go-/, "").replace(/\/v\d+$/, "");
    return base === stripped;
  });
  if (lenient) return lenient;

  // 3. Substring on name or import path
  return modules.find(
    (m) => m.name.toLowerCase().includes(q) || m.importPath.toLowerCase().includes(q)
  );
}

export interface SearchResult {
  module: ModuleInfo;
  snippets: string[];
  score: number;
}

/**
 * Full-text search across all module documentation.
 * Returns up to N results sorted by relevance score (descending).
 */
export function searchModules(modules: ModuleInfo[], query: string): SearchResult[] {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);

  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const module of modules) {
    const text = module.content.toLowerCase();
    let score = 0;
    const snippets: string[] = [];

    for (const term of terms) {
      let pos = 0;
      let termHits = 0;

      while ((pos = text.indexOf(term, pos)) !== -1) {
        termHits++;
        // Collect readable context snippets around the first few hits
        if (snippets.length < 3) {
          const start = Math.max(0, pos - 50);
          const end = Math.min(module.content.length, pos + 120);
          const raw = module.content.slice(start, end).replace(/\n+/g, " ").trim();
          if (!snippets.some((s) => s.slice(0, 40) === raw.slice(0, 40))) {
            snippets.push(`…${raw}…`);
          }
        }
        pos += term.length;
      }

      // Weighted scoring: matches in name/description count more
      if (module.name.toLowerCase().includes(term)) score += termHits + 10;
      else if (module.description.toLowerCase().includes(term)) score += termHits + 5;
      else score += termHits;
    }

    if (score > 0) results.push({ module, snippets, score });
  }

  return results.sort((a, b) => b.score - a.score);
}
