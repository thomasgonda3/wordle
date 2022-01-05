const fs = require("fs");

// cd into src directory
// $ node frequency.js
const buffer = fs.readFileSync("./dictionaries/dictionary.json", "utf8");
const dictionary = JSON.parse(buffer);

const frequencies = {};

const frequency = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
  l: 0,
  m: 0,
  n: 0,
  o: 0,
  p: 0,
  q: 0,
  r: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

for (let i = 1; i <= 10; i++) {
  console.log(`Writing Frequency ${i}`);
  const currentWords = dictionary.filter((x) => x.length === i);
  const currentFrequency = { ...frequency };
  for (const currentWord of currentWords) {
    const array = currentWord.split("");
    array.forEach((x) => currentFrequency[x]++);
  }
  for (const letter in currentFrequency) {
    currentFrequency[letter] =
      Math.round(
        10000 * (currentFrequency[letter] / (i * currentWords.length))
      ) / 10000;
  }
  frequencies[`frequency-${i}`] = currentFrequency;
}

fs.writeFileSync(
  `./frequency.json`,
  JSON.stringify(frequencies, null, 2),
  (err) => {
    if (err) throw err;
    console.log(`Frequency written successfully.`);
  }
);
