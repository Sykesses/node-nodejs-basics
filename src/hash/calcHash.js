import { createReadStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(filePath);
    const hash = createHash("sha256");

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    readStream.on("end", () => {
      const hashHex = hash.digest("hex");
      console.log("SHA256 Hash:", hashHex);
      resolve(hashHex);
    });

    readStream.on("error", (err) => {
      reject(err);
    });
  });
};

await calculateHash();
