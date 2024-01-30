import { Transform, pipeline } from "stream";
const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding = "utf-8", callback) {
      let text = chunk.toString();
      const reversedText = text.split("").reverse().join("");
      callback(null, reversedText);
    },
  });
  pipeline(process.stdin, reverseStream, process.stdout, (err) => {
    throw err;
  });
};

await transform();
