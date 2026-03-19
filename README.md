# go-tools-mcp

MCP server per la documentazione dei moduli Go di [mirkobrombin/go-tools](https://github.com/mirkobrombin/go-tools).

Espone 4 tool MCP via Cloudflare Workers, permettendo a qualsiasi agente AI (Claude, Cursor, Copilot CLI…) di interrogare la documentazione di 22 moduli Go senza caricare l'intero indice in context.

## Tool esposti

| Tool | Input | Output |
|------|-------|--------|
| `list_modules` | — | Tabella rapida di tutti i 22 moduli |
| `get_module(name)` | nome/alias modulo | Documentazione completa del modulo |
| `search_modules(query)` | keyword/concetto | Top-5 moduli rilevanti con snippets |
| `get_ecosystem` | — | Diagramma integrazione + design principles |

## Setup e deploy

### 1. Dipendenze

```bash
cd go-tools-mcp
npm install
# `postinstall` genera automaticamente data.ts da ../go-tools-index.md
```

### 2. Sviluppo locale

```bash
npm run dev
# Worker disponibile su http://localhost:8787/mcp
```

Testa con [MCP Inspector](https://github.com/modelcontextprotocol/inspector):
```bash
npx @modelcontextprotocol/inspector@latest
# URL: http://localhost:8787/mcp
```

### 3. Deploy su Cloudflare Workers

```bash
npx wrangler login   # solo prima volta
npm run deploy
# → https://go-tools-mcp.<account>.workers.dev/mcp
```

### 4. Aggiornare la documentazione

Quando aggiorni `go-tools-index.md`:

```bash
npm run update-index   # rigenera data.ts
npm run deploy         # rideploya il Worker
```

## Configurazione client MCP

### Claude Desktop

```json
{
  "mcpServers": {
    "go-tools": {
      "url": "https://go-tools-mcp.<account>.workers.dev/mcp"
    }
  }
}
```

### Cursor / Windsurf / VS Code

```json
{
  "mcp": {
    "servers": {
      "go-tools": {
        "url": "https://go-tools-mcp.<account>.workers.dev/mcp",
        "type": "http"
      }
    }
  }
}
```

### Copilot CLI

```bash
gh copilot config mcp add go-tools https://go-tools-mcp.<account>.workers.dev/mcp
```

## Struttura del progetto

```
go-tools-mcp/
├── index.ts              # Worker entrypoint + McpAgent con i 4 tool
├── parser.ts             # parseIndex(), findModule(), searchModules()
├── data.ts               # INDEX_CONTENT — generato da update-index.mjs (gitignored)
├── update-index.mjs      # Script di generazione data.ts
├── wrangler.jsonc        # Cloudflare Worker config
├── package.json
└── tsconfig.json
```

## Note architetturali

- La documentazione è **embeddato staticamente** nel Worker come stringa TypeScript — zero latenza, zero costo storage, deploy atomico.
- `McpAgent` usa Durable Objects per la gestione della sessione MCP (richiesta dal protocollo).
- Nessuna autenticazione in v1 (docs pubbliche). Aggiungibile via Cloudflare Access.
- Upgrade path: Cloudflare Vectorize per ricerca semantica; KV per aggiornamenti senza redeploy.
