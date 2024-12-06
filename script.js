let balance = 100;
let currentChip = 10; // Default chip value
const bets = {
  tiger: 0,
  gourd: 0,
  rooster: 0,
  crab: 0,
  fish: 0,
  shrimp: 0
};

const diceSymbols = ['tiger', 'gourd', 'rooster', 'crab', 'fish', 'shrimp'];

function selectChip(value) {
  currentChip = value;
}

function placeBet(type) {
  if (balance >= currentChip) {
    bets[type] += currentChip;
    balance -= currentChip;
    document.getElementById(`${type}-bet`).textContent = bets[type];
    document.getElementById("balance").textContent = balance;
  } else {
    alert("Not enough balance!");
  }
}

function rollDice() {
  const rollSound = document.getElementById("roll-sound");
  rollSound.play();

  const finalResults = [
    diceSymbols[Math.floor(Math.random() * diceSymbols.length)],
    diceSymbols[Math.floor(Math.random() * diceSymbols.length)],
    diceSymbols[Math.floor(Math.random() * diceSymbols.length)]
  ];

  let interval = 100;
  let count = 0;
  const diceElements = [document.getElementById("dice1"), document.getElementById("dice2"), document.getElementById("dice3")];

  const rolling = setInterval(() => {
    diceElements.forEach(dice => {
      const randomSymbol = getSymbol(diceSymbols[Math.floor(Math.random() * diceSymbols.length)]);
      dice.textContent = randomSymbol;
    });

    count++;
    if (count > 15) {
      clearInterval(rolling);
      displayFinalResults(diceElements, finalResults);
    }

    interval += 20; // Gradually slow down
  }, interval);
}

function displayFinalResults(diceElements, results) {
  diceElements[0].textContent = getSymbol(results[0]);
  diceElements[1].textContent = getSymbol(results[1]);
  diceElements[2].textContent = getSymbol(results[2]);

  calculateResult(results);
}

function getSymbol(type) {
  const symbols = {
    tiger: "🐯",
    gourd: "🍐",
    rooster: "🐓",
    crab: "🦀",
    fish: "🐟",
    shrimp: "🦐"
  };
  return symbols[type];
}

function calculateResult(diceResults) {
  let winAmount = 0;
  diceResults.forEach(result => {
    if (bets[result] > 0) {
      winAmount += bets[result] * 2;
    }
  });

  if (winAmount > 0) {
    document.getElementById("result-message").textContent = `You won ${winAmount} chips! 🎉`;
    balance += winAmount;
  } else {
    document.getElementById("result-message").textContent = "You lost! 😢";
  }

  document.getElementById("balance").textContent = balance;
  resetBets();
}

function resetBets() {
  for (const type in bets) {
    bets[type] = 0;
    document.getElementById(`${type}-bet`).textContent = "0";
  }
}
