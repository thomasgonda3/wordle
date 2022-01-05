const fs = require("fs");

// cd into src directory
// $ node makeDictionary.js
const buffer = fs.readFileSync("./dictionaries/dictionary.json", "utf8");
const dictionary = JSON.parse(buffer);

const frequency = {
  e: 11.1,
  a: 8.4,
  r: 7.5,
  i: 7.5,
  o: 7.1,
  t: 6.9,
  n: 6.6,
  s: 5.7,
  l: 5.4,
  c: 4.5,
  u: 3.6,
  d: 3.3,
  p: 3.1,
  m: 3,
  h: 3,
  g: 2.4,
  b: 2,
  f: 1.8,
  y: 1.7,
  w: 1.2,
  k: 1.1,
  v: 1,
  x: 0.29,
  z: 0.27,
  j: 0.1965,
  q: 0.1962,
};

for (let i = 1; i <= 10; i++) {
  console.log(`Writing Dictionary ${i}`);
  const currentWords = dictionary.filter((x) => x.length === i);
  const scoredWords = currentWords.sort((a, b) => {
    const bArray = b.split("");
    const aArray = a.split("");
    return (
      bArray.reduce((x, y, i) => {
        if (bArray.slice(0, i).includes(y)) {
          return x;
        } else {
          return x + frequency[y];
        }
      }, 0) -
      aArray.reduce((x, y, i) => {
        if (aArray.slice(0, i).includes(y)) {
          return x;
        } else {
          return x + frequency[y];
        }
      }, 0)
    );
  });
  fs.writeFileSync(
    `./dictionaries/dictionary-${i}.json`,
    JSON.stringify(scoredWords, null, 2),
    (err) => {
      if (err) throw err;
      console.log(`dictionary-${i} written successfully.`);
    }
  );
}
