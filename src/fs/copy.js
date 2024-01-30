import { stat, cp } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const folderPath1 = join(__dirname, "files");
  const folderPath2 = join(__dirname, "filesCopy");
  stat(folderPath1, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    } else {
      stat(folderPath2, (err) => {
        if (err) {
          cp(folderPath1, folderPath2, { recursive: true }, (err) => {
            if (err) {
              throw new Error("FS operation failed");
            } else {
              console.log("file copyed");
            }
          });
        } else {
          throw new Error("FS operation failed");
        }
      });
    }
  });
};

await copy();
