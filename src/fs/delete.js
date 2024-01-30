import { stat, unlink } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const folderPath1 = join(__dirname, "files", "fileToRemove.txt");
  stat(folderPath1, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    } else {
      unlink(folderPath1, (err) => {
        if (err) {
          throw new Error("FS operation failed");
        } else {
          console.log("file deleted");
        }
      });
    }
  });
};

await remove();
