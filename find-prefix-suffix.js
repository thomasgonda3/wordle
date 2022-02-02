const fs = require("fs");

const buffer = fs.readFileSync(
  "./dictionaries/regular-dictionary.json",
  "utf8"
);
const dictionary = JSON.parse(buffer);

for (let i = 2; i <= 4; i++) {
  console.log(`Writing Prefix-${i}`);
  const prefixObj = {};

  const prefixes = dictionary.map((x) => x.slice(0, i));

  for (const word of prefixes) {
    if (prefixObj[word] == null) prefixObj[word] = 0;
    prefixObj[word]++;
  }

  const prefixArray = Object.entries(prefixObj).sort((a, b) => b[1] - a[1]);

  fs.writeFileSync(
    `./regular/prefixes/prefix-${i}.json`,
    JSON.stringify(prefixArray, null, 2),
    (err) => {
      if (err) throw err;
      console.log(`prefix-${i} written successfully.`);
    }
  );
}

for (let i = 3; i >= 1; i--) {
  console.log(`Writing Suffix-${i}`);
  const suffixObj = {};

  const suffixes = dictionary.map((x) => x.slice(i));

  for (const word of suffixes) {
    if (suffixObj[word] == null) suffixObj[word] = 0;
    suffixObj[word]++;
  }

  const suffixArray = Object.entries(suffixObj).sort((a, b) => b[1] - a[1]);

  fs.writeFileSync(
    `./regular/suffixes/suffix-${5 - i}.json`,
    JSON.stringify(suffixArray, null, 2),
    (err) => {
      if (err) throw err;
      console.log(`suffix-${i} written successfully.`);
    }
  );
}
