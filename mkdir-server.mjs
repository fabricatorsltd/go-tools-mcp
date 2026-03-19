import { mkdirSync } from "fs";
import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, terminal: false });

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + "\n");
}

rl.on("line", (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { return; }

  if (msg.method === "initialize") {
    send({ jsonrpc: "2.0", id: msg.id, result: {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "mkdir-server", version: "1.0.0" }
    }});
  } else if (msg.method === "notifications/initialized") {
    // no-op
  } else if (msg.method === "tools/list") {
    send({ jsonrpc: "2.0", id: msg.id, result: { tools: [{
      name: "mkdir",
      description: "Create a directory recursively",
      inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] }
    }]}});
  } else if (msg.method === "tools/call") {
    const dirPath = msg.params?.arguments?.path;
    try {
      mkdirSync(dirPath, { recursive: true });
      send({ jsonrpc: "2.0", id: msg.id, result: { content: [{ type: "text", text: `Created: ${dirPath}` }] }});
    } catch (e) {
      send({ jsonrpc: "2.0", id: msg.id, result: { content: [{ type: "text", text: `Error: ${e.message}` }], isError: true }});
    }
  } else if (msg.id !== undefined) {
    send({ jsonrpc: "2.0", id: msg.id, error: { code: -32601, message: "Method not found" }});
  }
});
