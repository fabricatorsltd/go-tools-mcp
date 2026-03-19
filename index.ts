import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { INDEX_CONTENT } from "./data";
import { parseIndex, findModule, searchModules } from "./parser";

// Parse once at Worker startup — content is static per deployment
const { modules, ecosystem } = parseIndex(INDEX_CONTENT);

export class GoToolsMCP extends McpAgent {
  server = new McpServer({
    name: "go-tools",
    version: "0.1.0",
    description:
      "Reference documentation for the mirkobrombin / Fabricators Go modules ecosystem. " +
      "22 modules covering auth, caching, routing, async jobs, ORM, FSM, logging, and more.",
  });

  async init(): Promise<void> {
    // ─── list_modules ──────────────────────────────────────────────────────────
    this.server.tool(
      "list_modules",
      "List all available Go modules with their import paths and one-line descriptions. " +
        "Use this to discover which module handles a specific concern before fetching full docs.",
      {},
      async () => {
        if (modules.length === 0) {
          return {
            content: [
              {
                type: "text" as const,
                text:
                  "Index not loaded. Run `npm run update-index` in the go-tools-mcp directory and redeploy.",
              },
            ],
          };
        }

        const header =
          "| Module | Import path | Description |\n|--------|-------------|-------------|";
        const rows = modules
          .map((m) => `| **${m.name}** | \`${m.importPath}\` | ${m.description} |`)
          .join("\n");

        return { content: [{ type: "text" as const, text: `${header}\n${rows}` }] };
      }
    );

    // ─── get_module ────────────────────────────────────────────────────────────
    this.server.tool(
      "get_module",
      "Get the complete documentation for a specific Go module — API reference, usage examples, " +
        "configuration options, and integration notes.",
      {
        name: z.string().describe(
          "Module name or partial alias. " +
            "Examples: 'go-relay', 'relay', 'go-relay/v2', 'warp', 'state-flow', 'wormhole', 'signal'."
        ),
      },
      async ({ name }) => {
        const mod = findModule(modules, name);

        if (!mod) {
          const available = modules.map((m) => m.name).join(", ");
          return {
            content: [
              {
                type: "text" as const,
                text: `Module "${name}" not found.\n\nAvailable modules: ${available}`,
              },
            ],
          };
        }

        return { content: [{ type: "text" as const, text: mod.content }] };
      }
    );

    // ─── search_modules ────────────────────────────────────────────────────────
    this.server.tool(
      "search_modules",
      "Search across all module documentation using keywords or concepts. " +
        "Use this when you are unsure which module handles a specific concern.",
      {
        query: z.string().describe(
          "Keywords or concept to search for. " +
            "Examples: 'distributed lock', 'HMAC token signing', 'FSM transitions', " +
            "'retry backoff', 'worker pool', 'saga compensation', 'code-first migration'."
        ),
      },
      async ({ query }) => {
        const results = searchModules(modules, query);

        if (results.length === 0) {
          return {
            content: [{ type: "text" as const, text: `No modules found matching "${query}".` }],
          };
        }

        const text = results
          .slice(0, 5)
          .map((r) => {
            const snips = r.snippets
              .slice(0, 2)
              .map((s) => `  > ${s}`)
              .join("\n");
            return `### ${r.module.name}\n\`${r.module.importPath}\`\n${r.module.description}\n${snips}`;
          })
          .join("\n\n");

        return { content: [{ type: "text" as const, text }] };
      }
    );

    // ─── get_ecosystem ─────────────────────────────────────────────────────────
    this.server.tool(
      "get_ecosystem",
      "Get the ecosystem integration diagram and design principles — how all 22 modules fit together, " +
        "dependency direction, two-tier async pipeline, caching layer, and data access patterns.",
      {},
      async () => {
        const text = ecosystem.trim() || "Ecosystem section not found in index.";
        return { content: [{ type: "text" as const, text }] };
      }
    );
  }
}

export default GoToolsMCP.serve("/mcp");
