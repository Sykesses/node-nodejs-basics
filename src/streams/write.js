import { createWriteStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToWrite.txt");

  const writeStream = createWriteStream(filePath);
  process.stdin.pipe(writeStream);

  writeStream.on("error", (err) => {
    throw err;
  });
};
await write();
