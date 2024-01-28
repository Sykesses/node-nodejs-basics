import { createReadStream, createWriteStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";
const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = join(__dirname, "files", "fileToCompress.txt");
  const filePathZip = join(__dirname, "files", "archive.gz");

  const readStream = createReadStream(filePath);

  const writeStream = createWriteStream(filePathZip);

  // Создаем поток сжатия zlib
  const gzip = createGzip();

  // Подключаем потоки: readStream -> gzip -> writeStream
  readStream.pipe(gzip).pipe(writeStream);

  // Обработка события завершения записи в архивный файл
  writeStream.on("finish", () => {
    console.log("File compressed successfully.");
  });

  // Обработка ошибок при сжатии файла
  writeStream.on("error", (err) => {
    console.error("Error:", err);
  });
};

await compress();
