import { readdir } from "node:fs";
import { stat } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const folderPath1 = join(__dirname, "files");
  stat(folderPath1, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    } else {
      readdir(folderPath1, (err, files) => {
        if (err) {
          throw new Error("FS operation failed");
        } else {
          const fileNames = [];
          files.forEach((file) => {
            fileNames.push(file);
          });
          console.log(fileNames);
        }
      });
    }
  });
};

await list();
