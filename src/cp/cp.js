import { spawn } from "child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const spawnChildProcess = async (args) => {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, "files", "script.js");

    const childProcess = spawn("node", [filePath, ...args], {
      stdio: ["pipe", "pipe", "pipe", "ipc"],
    });

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    childProcess.on("error", (err) => {
      reject(err);
    });

    childProcess.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`exit with ${code} and ${signal}`);
      }
    });
  });
};

spawnChildProcess(["ArgumentIvan", "ArgumentMikitko"]);
