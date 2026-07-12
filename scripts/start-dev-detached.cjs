const { openSync } = require("node:fs");
const { join } = require("node:path");
const { spawn } = require("node:child_process");

const cwd = "C:\\Users\\mahmo\\OneDrive\\Desktop\\NOT GPT";
const nodeExe =
  "C:\\Users\\mahmo\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin\\node.exe";
const nodePath = "C:\\Users\\mahmo\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\node\\bin";
const log = openSync(join(cwd, "dev-server.log"), "w");
const err = openSync(join(cwd, "dev-server.err.log"), "w");

const child = spawn(
  nodeExe,
  [join(cwd, "node_modules", "next", "dist", "bin", "next"), "dev", "--hostname", "127.0.0.1", "--port", "3100"],
  {
    cwd,
    detached: true,
    stdio: ["ignore", log, err],
    env: {
      ...process.env,
      CI: "true",
      Path: `${nodePath};${process.env.Path ?? process.env.PATH ?? ""}`,
      PATH: `${nodePath};${process.env.PATH ?? process.env.Path ?? ""}`
    },
    windowsHide: true
  }
);

child.unref();
console.log(child.pid);
