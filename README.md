# go-tools-mcp

Remote [MCP](https://modelcontextprotocol.io) server for the [mirkobrombin/Fabricators Go modules](./go-tools-index.md) ecosystem. Hosted as a Cloudflare Worker.

**Endpoint:** `https://go-tools.fabricators.ltd/mcp`

Exposes four tools to any MCP client (Claude, Cursor, Windsurf, Copilot CLI, …):

| Tool | Description |
|------|-------------|
| `list_modules` | All 22 modules with import paths and one-line descriptions |
| `get_module(name)` | Complete docs for a module — API, examples, integration notes |
| `search_modules(query)` | Full-text search across all module docs |
| `get_ecosystem` | Integration diagram + design principles |

## Setup

```bash
pnpm install   # installs deps AND generates data.ts from go-tools-index.md
```

## Local development

```bash
pnpm dev       # wrangler dev → http://localhost:8787/mcp
```

Test with MCP Inspector:
```bash
pnpm dlx @modelcontextprotocol/inspector@latest
# Connect to: http://localhost:8787/mcp
```

## Deploy

```bash
pnpm deploy    # wrangler deploy → https://go-tools.fabricators.ltd/mcp
```

## Connect from an MCP client

```json
{
  "mcpServers": {
    "go-tools": {
      "url": "https://go-tools.fabricators.ltd/mcp"
    }
  }
}
```

## Update the index

```bash
pnpm update-index   # re-embeds go-tools-index.md into data.ts
pnpm deploy         # redeploy
```

## Architecture

- **Transport:** Streamable HTTP (`serve("/mcp")`) — MCP 2025 standard, single `POST /mcp` endpoint
- **No auth** — public documentation, no OAuth required
- **No external storage** — index content is bundled into the Worker at deploy time
- **Durable Objects** — `McpAgent` uses a DO for MCP session state (required by the protocol)

