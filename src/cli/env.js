const parseEnv = () => {
  const env = Object.keys(process.env);
  const rss = env.filter((key) => key.startsWith("RSS_"));
  const values = rss.map((key) => `${key}=${process.env[key]}`);
  console.log(values.join("; "));
};

parseEnv();
