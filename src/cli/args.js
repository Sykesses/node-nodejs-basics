const parseArgs = () => {
  const args = [];

  for (let i = 2; i < process.argv.length; i += 2) {
    const propName = process.argv[i].slice(2);
    const value = process.argv[i + 1];
    args.push(`${propName} is ${value}`);
  }

  let str = args.join(", ");
  console.log(str);
};

parseArgs();
