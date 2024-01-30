import { stat, rename } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const renameFile = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const folderPath1 = join(__dirname, "files", "wrongFilename.txt");
  const folderPath2 = join(__dirname, "files", "properFilename.md");
  stat(folderPath1, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    } else {
      stat(folderPath2, (err) => {
        if (err) {
          rename(folderPath1, folderPath2, (err) => {
            if (err) {
              throw new Error("FS operation failed");
            } else {
              console.log("file renamed");
            }
          });
        } else {
          throw new Error("FS operation failed");
        }
      });
    }
  });
};

await renameFile();
