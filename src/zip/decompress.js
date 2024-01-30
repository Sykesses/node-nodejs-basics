import { createReadStream, createWriteStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createGunzip } from "node:zlib";
const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePathZ = join(__dirname, "files", "archive.gz");
  const filePath = join(__dirname, "files", "fileToCompress.txt");
  const readStream = createReadStream(filePathZ);

  // Создаем поток записи в исходный файл
  const writeStream = createWriteStream(filePath);

  // Создаем поток разархивации zlib
  const gunzip = createGunzip();

  // Подключаем потоки: readStream -> gunzip -> writeStream
  readStream.pipe(gunzip).pipe(writeStream);

  // Обработка события завершения записи в исходный файл
  writeStream.on("finish", () => {
    console.log("File decompressed successfully.");
  });

  // Обработка ошибок при разархивации
  writeStream.on("error", (err) => {
    console.error("Error:", err);
  });
};

await decompress();
