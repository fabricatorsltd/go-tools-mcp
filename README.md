# go-tools-mcp

Remote [MCP](https://modelcontextprotocol.io) server for the [mirkobrombin/Fabricators Go modules](../go-tools-index.md) ecosystem. Hosted as a stateless Cloudflare Worker.

Exposes four tools to any MCP client (Claude, Cursor, Windsurf, Copilot CLI, …):

| Tool | Description |
|------|-------------|
| `list_modules` | All 22 modules with import paths and one-line descriptions |
| `get_module(name)` | Complete docs for a module — API, examples, integration notes |
| `search_modules(query)` | Full-text search across all module docs |
| `get_ecosystem` | Integration diagram + design principles |

## Setup

```bash
npm install        # installs deps AND generates src/data/index.ts from go-tools-index.md
```

The `postinstall` script reads `../go-tools-index.md` and embeds its content into
`src/data/index.ts`. Re-run `npm run update-index` whenever the index changes.

## Local development

```bash
npm run dev        # wrangler dev → http://localhost:8787/mcp
```

Test with MCP Inspector:
```bash
npx @modelcontextprotocol/inspector@latest
# Connect to: http://localhost:8787/mcp
```

## Deploy

```bash
npm run deploy     # wrangler deploy → https://go-tools-mcp.<account>.workers.dev/mcp
```

## Connect from an MCP client

```json
{
  "mcpServers": {
    "go-tools": {
      "url": "https://go-tools-mcp.<your-account>.workers.dev/mcp"
    }
  }
}
```

## Architecture

- **No auth** — public documentation, no OAuth required
- **No external storage** — index content is bundled into the Worker at deploy time
- **Stateless tools** — no session state; `McpAgent` provides the MCP transport layer
- **Update workflow** — edit `../go-tools-index.md` → `npm run update-index` → `npm run deploy`

