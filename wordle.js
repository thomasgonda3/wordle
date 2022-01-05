const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// cd into src directory
// $ node wordle.js
const length = 5;
const buffer = fs.readFileSync(
  `./dictionaries/dictionary-${length}.json`,
  "utf8"
);
let dictionary = JSON.parse(buffer);

const main = async () => {
  while (1) {
    console.log(`${dictionary.length} possible words left`);
    console.log(dictionary);
    const currentGuess = dictionary[0];
    const currentGuessArray = currentGuess.split("");
    console.log(`Try ${currentGuess}`);
    await new Promise((resolve) => {
      readline.question(
        `Type in Results: 0 = miss, 1 = partial hit, 2 = hit in format 0 0 0 0 0 \n`,
        (result) => {
          const array = result.split(" ");
          dictionary = dictionary.filter((x) => {
            const noHits = [];
            for (let i = 0; i < length; i++) {
              if (x[i] != currentGuessArray[i]) noHits.push(x[i]);
            }
            let score;
            for (let i = 0; i < length; i++) {
              score = 0;
              if (x[i] != currentGuessArray[i]) {
                const index = noHits.findIndex(
                  (j) => j == currentGuessArray[i]
                );
                if (index !== -1) {
                  noHits.splice(index, 1);
                  score = 1;
                }
              }
              if (x[i] == currentGuessArray[i]) score = 2;
              if (score != array[i]) return false;
            }
            return true;
          });
          resolve();
        }
      );
    });
  }
  readline.close();
};

main().catch((e) => console.log(e));
