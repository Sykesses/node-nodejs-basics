const parseArgs = () => {
  const args = {};

  for (let i = 2; i < process.argv.length; i += 2) {
    const propName = process.argv[i].slice(2);
    const value = process.argv[i + 1];
    args[propName] = value;
  }

  for (const propName in args) {
    console.log(`${propName} is ${args[propName]}`);
  }
};

parseArgs();
