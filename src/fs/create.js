import { stat, writeFile } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const folderPath1 = join(__dirname, "files", "fresh.txt");
  const content = "I am fresh and young";
  stat(folderPath1, (err) => {
    if (err) {
      writeFile(folderPath1, content, (err) => {
        if (err) {
          throw new Error("FS operation failed");
        } else {
          console.log("file created");
        }
      });
    } else {
      throw new Error("FS operation failed");
    }
  });
};

await create();
