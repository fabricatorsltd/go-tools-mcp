export const LANDING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>go-tools</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --border: #30363d;
      --text: #e6edf3;
      --muted: #8b949e;
      --accent: #58a6ff;
      --accent-dim: #1f6feb33;
      --green: #3fb950;
      --code-bg: #1e2530;
      --radius: 8px;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.7;
    }

    /* ── Layout ─────────────────────────────────────────────────── */
    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ── Header / Hero ──────────────────────────────────────────── */
    header {
      border-bottom: 1px solid var(--border);
      padding: 48px 0 36px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--accent-dim);
      border: 1px solid var(--accent);
      color: var(--accent);
      border-radius: 20px;
      padding: 3px 12px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: .04em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 12px;
    }

    h1 span { color: var(--accent); }

    .tagline {
      color: var(--muted);
      font-size: 1.1rem;
      max-width: 600px;
      margin-bottom: 28px;
    }

    .endpoint-box {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 10px 16px;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 0.9rem;
    }

    .endpoint-box .label {
      color: var(--muted);
      font-family: inherit;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: .06em;
      text-transform: uppercase;
    }

    .endpoint-box a {
      color: var(--accent);
      text-decoration: none;
    }

    .endpoint-box a:hover { text-decoration: underline; }

    /* ── Main content ────────────────────────────────────────────── */
    main { padding: 40px 0 64px; }

    section { margin-bottom: 48px; }

    h2 {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    h2 .icon { font-size: 1.1rem; }

    p { color: var(--muted); margin-bottom: 12px; }

    /* ── Tools table ─────────────────────────────────────────────── */
    .tools-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    @media (max-width: 600px) {
      .tools-grid { grid-template-columns: 1fr; }
      h1 { font-size: 1.8rem; }
    }

    .tool-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px 18px;
      transition: border-color .15s;
    }

    .tool-card:hover { border-color: var(--accent); }

    .tool-name {
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 6px;
    }

    .tool-desc {
      font-size: 0.875rem;
      color: var(--muted);
      line-height: 1.5;
    }

    /* ── Copy button ─────────────────────────────────────────────── */
    .copyable {
      position: relative;
    }

    .copy-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 5px;
      color: var(--muted);
      cursor: pointer;
      padding: 3px 8px;
      font-size: 0.75rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
      transition: all .15s;
      user-select: none;
    }

    .copy-btn:hover { border-color: var(--accent); color: var(--text); }
    .copy-btn.copied { border-color: var(--green); color: var(--green); }

    /* ── Code blocks ─────────────────────────────────────────────── */
    .code-block {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px 20px;
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      position: relative;
    }

    .code-block .comment { color: var(--muted); }
    .code-block .cmd { color: var(--green); }
    .code-block .key { color: var(--accent); }
    .code-block .str { color: #f0883e; }

    pre { white-space: pre; }

    /* ── Principles list ─────────────────────────────────────────── */
    .principles-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .principles-list li {
      display: flex;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.6;
    }

    .principles-list li::before {
      content: "—";
      color: var(--accent);
      flex-shrink: 0;
      margin-top: 1px;
    }

    .principles-list strong { color: var(--text); }

    /* ── Module table ────────────────────────────────────────────── */
    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: var(--radius);
    }

    .module-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .module-table th {
      background: var(--surface);
      color: var(--muted);
      font-weight: 600;
      font-size: 0.75rem;
      letter-spacing: .05em;
      text-transform: uppercase;
      padding: 10px 16px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
    }

    .module-table td {
      padding: 9px 16px;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
      color: var(--muted);
    }

    .module-table tr:last-child td { border-bottom: none; }

    .module-table tr:hover td { background: var(--surface); }

    .mod-link {
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.85rem;
      color: var(--accent);
      text-decoration: none;
      white-space: nowrap;
    }

    .mod-link:hover { text-decoration: underline; }

    .dep-tag {
      display: inline-block;
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 1px 6px;
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.78rem;
      color: var(--muted);
      white-space: nowrap;
    }

    /* ── Tab switcher ────────────────────────────────────────────── */
    .client-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .tab {
      background: none;
      border: 1px solid var(--border);
      color: var(--muted);
      border-radius: 6px;
      padding: 5px 14px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all .15s;
    }

    .tab:hover { border-color: var(--accent); color: var(--text); }
    .tab.active { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); font-weight: 600; }

    .tab-content { display: none; }
    .tab-content.active { display: block; }

    code.ic {
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 1px 6px;
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.82em;
      color: var(--accent);
    }

    /* ── Architecture list ───────────────────────────────────────── */
    .arch-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .arch-list li {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      font-size: 0.9rem;
    }

    .arch-list .pill {
      background: var(--accent-dim);
      border: 1px solid var(--accent);
      color: var(--accent);
      border-radius: 4px;
      padding: 1px 8px;
      font-family: monospace;
      font-size: 0.8rem;
      white-space: nowrap;
      margin-top: 2px;
    }

    .arch-list .desc { color: var(--muted); line-height: 1.5; }

    /* ── Footer ──────────────────────────────────────────────────── */
    footer {
      border-top: 1px solid var(--border);
      padding: 24px 0;
      text-align: center;
      color: var(--muted);
      font-size: 0.85rem;
    }

    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1><span>go-tools</span></h1>
      <p class="tagline">
        22 Go modules by <a href="https://github.com/mirkobrombin" style="color:var(--accent);text-decoration:none">Mirko Brombin</a> /
        <a href="https://github.com/fabricatorsltd" style="color:var(--accent);text-decoration:none">fabricators</a> —
        covering auth, caching, routing, async jobs, ORM, FSM, logging, and more.
        The <a href="https://modelcontextprotocol.io" style="color:var(--accent);text-decoration:none">MCP</a> server
        gives any AI client instant access to the full documentation.
      </p>
      <div class="endpoint-box copyable" data-copy="https://go-tools.fabricators.ltd/mcp">
        <span class="label">Endpoint</span>
        <a href="https://go-tools.fabricators.ltd/mcp">https://go-tools.fabricators.ltd/mcp</a>
        <button class="copy-btn" aria-label="Copy endpoint">Copy</button>
      </div>
    </header>

    <main>

      <!-- Design Principles -->
      <section>
        <h2><span class="icon">📐</span> Design Principles</h2>
        <ul class="principles-list">
          <li>All modules are <code class="ic">CGO_ENABLED=0</code> safe — no C dependencies</li>
          <li><strong>go-foundation</strong> is the only shared base; all other modules depend on it (or nothing)</li>
          <li><strong>go-relay/v2</strong> is broker-agnostic: swap <code class="ic">MemoryBroker</code> → <code class="ic">RedisBroker</code> or <code class="ic">NATSBroker</code> without touching handler code</li>
          <li><strong>go-signal/v2</strong> (in-process, ephemeral) + <strong>go-relay/v2</strong> (persistent, retryable) form a two-tier async pipeline — signal for immediate reactions, relay for durable background work</li>
          <li><strong>go-warp</strong> syncbus supports multi-node cache consistency without changing application code (swap backend)</li>
          <li><strong>go-module-router/v2</strong> Action transport auto-emits on go-signal/v2 after every dispatch — side effects require zero boilerplate in the handler</li>
          <li><strong>go-revert/v2</strong> is panic-safe: a panicking step triggers full rollback, never leaves partial state</li>
        </ul>
      </section>

      <!-- Ecosystem Integration Pattern -->
      <section>
        <h2><span class="icon">🔗</span> Ecosystem Integration Pattern</h2>
        <div class="code-block copyable"><button class="copy-btn" aria-label="Copy">Copy</button><pre>User intent
    │
    ▼
go-module-router/v2   — receives and routes the intent, injects dependencies
    │
    ├── go-revert/v2   — wraps multi-step logic in compensatable workflows
    │
    ├── go-signal/v2   — emits the completed action for in-process side effects
    │
    └── go-relay/v2    — enqueues durable background jobs for async/retryable work
            │
            ├── MemoryBroker (dev / single-node)
            ├── RedisBroker  (production)
            └── NATSBroker   (high-throughput / distributed)

go-wormhole   — data access layer (code-first ORM, Unit of Work)
    └── providers: SQL / MongoDB / go-slipstream / MemDoc

go-warp/v1    — caching + distributed cache invalidation layer
    └── sits between app logic and primary storage (go-wormhole or go-slipstream)

go-slipstream — embedded Bitcask+Raft database
    └── used by go-wormhole (Slipstream provider) and go-warp (as L2 store)</pre></div>
      </section>

      <!-- Module Quick Reference -->
      <section>
        <h2><span class="icon">📦</span> Module Quick Reference</h2>
        <div class="table-wrap">
          <table class="module-table">
            <thead>
              <tr><th>Module</th><th>Import path</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td><a href="https://github.com/mirkobrombin/go-auth" class="mod-link">go-auth</a></td><td><code class="ic">github.com/mirkobrombin/go-auth</code></td><td>HMAC-SHA256 token signing</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-cli-builder" class="mod-link">go-cli-builder/v2</a></td><td><code class="ic">github.com/mirkobrombin/go-cli-builder/v2</code></td><td>Declarative struct-tag CLI</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-conf-builder" class="mod-link">go-conf-builder/v2</a></td><td><code class="ic">github.com/mirkobrombin/go-conf-builder/v2</code></td><td>Multi-source config loader</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-foundation" class="mod-link">go-foundation</a></td><td><code class="ic">github.com/mirkobrombin/go-foundation</code></td><td>Shared primitives (DI, tags, resiliency, …)</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-guard" class="mod-link">go-guard</a></td><td><code class="ic">github.com/mirkobrombin/go-guard</code></td><td>Declarative ABAC</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-httpx" class="mod-link">go-httpx</a></td><td><code class="ic">github.com/mirkobrombin/go-httpx</code></td><td>Middleware HTTP client</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-lock" class="mod-link">go-lock</a></td><td><code class="ic">github.com/mirkobrombin/go-lock</code></td><td>Distributed locking</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-logger" class="mod-link">go-logger</a></td><td><code class="ic">github.com/mirkobrombin/go-logger</code></td><td>Structured logging + sinks</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-metrics" class="mod-link">go-metrics</a></td><td><code class="ic">github.com/mirkobrombin/go-metrics</code></td><td>Counter abstraction</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-module-router" class="mod-link">go-module-router/v2</a></td><td><code class="ic">github.com/mirkobrombin/go-module-router/v2</code></td><td>Transport-agnostic router + DI</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-plugin" class="mod-link">go-plugin</a></td><td><code class="ic">github.com/mirkobrombin/go-plugin</code></td><td>Plugin registry + lifecycle</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-relay" class="mod-link">go-relay/v2</a></td><td><code class="ic">github.com/mirkobrombin/go-relay/v2</code></td><td>Async job processing</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-retry" class="mod-link">go-retry</a></td><td><code class="ic">github.com/mirkobrombin/go-retry</code></td><td>Compact retry helper</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-revert" class="mod-link">go-revert/v2</a></td><td><code class="ic">github.com/mirkobrombin/go-revert/v2</code></td><td>Saga + compensation</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-secrets" class="mod-link">go-secrets</a></td><td><code class="ic">github.com/mirkobrombin/go-secrets</code></td><td>Secret store abstraction</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-signal" class="mod-link">go-signal/v2</a></td><td><code class="ic">github.com/mirkobrombin/go-signal/v2</code></td><td>Type-safe in-process event bus</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-slipstream" class="mod-link">go-slipstream</a></td><td><code class="ic">github.com/mirkobrombin/go-slipstream</code></td><td>Embedded Bitcask+Raft database</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-state-flow" class="mod-link">go-state-flow</a></td><td><code class="ic">github.com/mirkobrombin/go-state-flow</code></td><td>Declarative FSM</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-struct-flags" class="mod-link">go-struct-flags/v2</a></td><td><code class="ic">github.com/mirkobrombin/go-struct-flags/v2</code></td><td>Flag-to-struct binding <span style="color:var(--muted);font-size:0.8em">(deprecated)</span></td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-warp" class="mod-link">go-warp/v1</a></td><td><code class="ic">github.com/mirkobrombin/go-warp/v1</code></td><td>L1/L2 cache + distributed sync</td></tr>
              <tr><td><a href="https://github.com/mirkobrombin/go-worker" class="mod-link">go-worker</a></td><td><code class="ic">github.com/mirkobrombin/go-worker</code></td><td>Fixed-size worker pool</td></tr>
              <tr><td><a href="https://github.com/fabricatorsltd/go-wormhole" class="mod-link">go-wormhole</a></td><td><code class="ic">github.com/fabricatorsltd/go-wormhole</code></td><td>EF-style ORM + code-first migrations</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- MCP Tools -->
      <section>
        <h2><span class="icon">🔧</span> Available Tools</h2>
        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-name">list_modules</div>
            <div class="tool-desc">All 22 modules with import paths and one-line descriptions.</div>
          </div>
          <div class="tool-card">
            <div class="tool-name">get_module(name)</div>
            <div class="tool-desc">Complete docs for a module — API reference, examples, integration notes.</div>
          </div>
          <div class="tool-card">
            <div class="tool-name">search_modules(query)</div>
            <div class="tool-desc">Full-text search across all module documentation by keyword or concept.</div>
          </div>
          <div class="tool-card">
            <div class="tool-name">get_ecosystem</div>
            <div class="tool-desc">Integration diagram and design principles — how all modules fit together.</div>
          </div>
        </div>
      </section>

      <!-- Connect -->
      <section>
        <h2><span class="icon">🔌</span> Connect from an MCP Client</h2>
        <p>Add this to your MCP client configuration and you're ready to go.</p>

        <div class="client-tabs">
          <button class="tab active" data-tab="claude">Claude Desktop</button>
          <button class="tab" data-tab="cursor">Cursor</button>
          <button class="tab" data-tab="windsurf">Windsurf</button>
          <button class="tab" data-tab="copilot">GitHub Copilot</button>
          <button class="tab" data-tab="vscode">VS Code</button>
        </div>

        <div class="tab-content active" id="tab-claude">
          <p style="margin-bottom:8px">Edit <code class="ic">~/Library/Application Support/Claude/claude_desktop_config.json</code>:</p>
          <div class="code-block copyable" data-copy='{"mcpServers":{"go-tools":{"url":"https://go-tools.fabricators.ltd/mcp"}}}'><button class="copy-btn" aria-label="Copy">Copy</button><pre>{
  <span class="key">"mcpServers"</span>: {
    <span class="key">"go-tools"</span>: {
      <span class="key">"url"</span>: <span class="str">"https://go-tools.fabricators.ltd/mcp"</span>
    }
  }
}</pre></div>
        </div>

        <div class="tab-content" id="tab-cursor">
          <p style="margin-bottom:8px">Edit <code class="ic">~/.cursor/mcp.json</code> (or via Settings → MCP):</p>
          <div class="code-block copyable" data-copy='{"mcpServers":{"go-tools":{"url":"https://go-tools.fabricators.ltd/mcp"}}}'><button class="copy-btn" aria-label="Copy">Copy</button><pre>{
  <span class="key">"mcpServers"</span>: {
    <span class="key">"go-tools"</span>: {
      <span class="key">"url"</span>: <span class="str">"https://go-tools.fabricators.ltd/mcp"</span>
    }
  }
}</pre></div>
        </div>

        <div class="tab-content" id="tab-windsurf">
          <p style="margin-bottom:8px">Edit <code class="ic">~/.codeium/windsurf/mcp_config.json</code>:</p>
          <div class="code-block copyable" data-copy='{"mcpServers":{"go-tools":{"url":"https://go-tools.fabricators.ltd/mcp"}}}'><button class="copy-btn" aria-label="Copy">Copy</button><pre>{
  <span class="key">"mcpServers"</span>: {
    <span class="key">"go-tools"</span>: {
      <span class="key">"url"</span>: <span class="str">"https://go-tools.fabricators.ltd/mcp"</span>
    }
  }
}</pre></div>
        </div>

        <div class="tab-content" id="tab-copilot">
          <p style="margin-bottom:8px">Edit <code class="ic">~/.copilot/mcp.json</code> (or via the Copilot CLI settings):</p>
          <div class="code-block copyable" data-copy='{"mcpServers":{"go-tools":{"url":"https://go-tools.fabricators.ltd/mcp"}}}'><button class="copy-btn" aria-label="Copy">Copy</button><pre>{
  <span class="key">"mcpServers"</span>: {
    <span class="key">"go-tools"</span>: {
      <span class="key">"url"</span>: <span class="str">"https://go-tools.fabricators.ltd/mcp"</span>
    }
  }
}</pre></div>
        </div>

        <div class="tab-content" id="tab-vscode">
          <p style="margin-bottom:8px">Edit <code class="ic">.vscode/mcp.json</code> in your workspace:</p>
          <div class="code-block copyable" data-copy='{"servers":{"go-tools":{"type":"http","url":"https://go-tools.fabricators.ltd/mcp"}}}'><button class="copy-btn" aria-label="Copy">Copy</button><pre>{
  <span class="key">"servers"</span>: {
    <span class="key">"go-tools"</span>: {
      <span class="key">"type"</span>: <span class="str">"http"</span>,
      <span class="key">"url"</span>: <span class="str">"https://go-tools.fabricators.ltd/mcp"</span>
    }
  }
}</pre></div>
        </div>
      </section>

      <!-- Architecture -->
      <section>
        <h2><span class="icon">🏗️</span> Architecture</h2>
        <ul class="arch-list">
          <li>
            <span class="pill">Transport</span>
            <span class="desc">Streamable HTTP — MCP 2025 standard, single <code style="color:var(--accent);font-size:0.85em">POST /mcp</code> endpoint.</span>
          </li>
          <li>
            <span class="pill">Auth</span>
            <span class="desc">None — public documentation, no OAuth required.</span>
          </li>
          <li>
            <span class="pill">Storage</span>
            <span class="desc">Index content is bundled into the Worker at deploy time. No external storage.</span>
          </li>
          <li>
            <span class="pill">Runtime</span>
            <span class="desc">Cloudflare Workers + Durable Objects for per-connection MCP session state.</span>
          </li>
        </ul>
      </section>

    </main>

    <footer>
      Part of the <a href="https://github.com/fabricatorsltd">fabricators</a> ecosystem ·
      <a href="https://go-tools.fabricators.ltd/mcp">MCP endpoint</a>
    </footer>
  </div>
  <script>
    document.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + target).classList.add('active');
      });
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const container = btn.closest('.copyable');
        const text = container.dataset.copy ?? container.querySelector('pre')?.textContent ?? '';
        navigator.clipboard.writeText(text.trim()).then(() => {
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
        });
      });
    });
  </script>
</body>
</html>`;
