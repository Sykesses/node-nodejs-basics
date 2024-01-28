import { readFile } from "node:fs";
import { stat } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const folderPath1 = join(__dirname, "files", "fileToRead.txt");
  stat(folderPath1, (err) => {
    if (err) {
      throw new Error("FS operation 1 failed");
    } else {
      readFile(folderPath1, { encoding: "utf-8" }, (err, data) => {
        //stat не нужен в read
        if (err) {
          throw new Error("FS operation 2 failed");
        } else {
          console.log(data);
        }
      });
    }
  });
};

await read();
