const fs = require("fs");

const dictBuffer = fs.readFileSync("./dictionaries/dictionary.json", "utf8");
const dictionary = JSON.parse(dictBuffer);

const freqBuffer = fs.readFileSync("./frequency.json", "utf8");
const frequencies = JSON.parse(freqBuffer);

for (let i = 1; i <= 10; i++) {
  console.log(`Writing Dictionary ${i}`);
  const frequency = frequencies[`frequency-${i}`];
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
