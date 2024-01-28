import { createReadStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToRead.txt");
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);
    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });
    readStream.on("end", () => {
      console.log("\nEnd of file.");
      resolve();
    });
    readStream.on("error", (err) => {
      reject(err);
    });
  });
};

await read();
