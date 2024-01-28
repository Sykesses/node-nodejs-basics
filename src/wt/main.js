import { Worker, workerData } from "worker_threads";
import { cpus } from "os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

function createWorker(workerData) {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const workerPath = join(__dirname, "worker.js");
    const worker = new Worker(workerPath, { workerData });

    worker.on("message", (message) => {
      resolve({ status: "resolved", data: message });
    });

    worker.on("error", (error) => {
      reject({ status: "error", data: null });
    });
  });
}

const performCalculations = async () => {
  const numCores = cpus().length;
  const promisWorker = [];

  for (let i = 0; i < numCores; i++) {
    const workerData = 10 + i;
    promisWorker.push(createWorker(workerData));
  }

  try {
    const results = await Promise.all(promisWorker);
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

await performCalculations();
