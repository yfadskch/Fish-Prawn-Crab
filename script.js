let balance = 100;
const bets = {
  tiger: 0,
  gourd: 0,
  rooster: 0,
  crab: 0,
  fish: 0,
  shrimp: 0
};

const diceSymbols = ['tiger', 'gourd', 'rooster', 'crab', 'fish', 'shrimp'];

function placeBet(type) {
  if (balance > 0) {
    bets[type]++;
    balance--;
    document.getElementById(`${type}-bet`).textContent = bets[type];
    document.getElementById("balance").textContent = balance;
  } else {
    alert("Not enough balance!");
  }
}

function rollDice() {
  const rollSound = document.getElementById("roll-sound");
  rollSound.play();

  const dice1Element = document.getElementById("dice1");
  const dice2Element = document.getElementById("dice2");
  const dice3Element = document.getElementById("dice3");

  const dice1 = diceSymbols[Math.floor(Math.random() * 6)];
  const dice2 = diceSymbols[Math.floor(Math.random() * 6)];
  const dice3 = diceSymbols[Math.floor(Math.random() * 6)];

  displayDice(dice1, dice2, dice3);
  calculateResult([dice1, dice2, dice3]);
}

function displayDice(dice1, dice2, dice3) {
  document.getElementById("dice1").textContent = getSymbol(dice1);
  document.getElementById("dice2").textContent = getSymbol(dice2);
  document.getElementById("dice3").textContent = getSymbol(dice3);
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
      winAmount += bets[result];
    }
  });

  if (winAmount > 0) {
    const winSound = document.getElementById("win-sound");
    winSound.play();
    document.getElementById("result-message").textContent = `You won ${winAmount} chips! 🎉`;
  } else {
    const loseSound = document.getElementById("lose-sound");
    loseSound.play();
    document.getElementById("result-message").textContent = "You lost! 😢";
  }

  balance += winAmount;
  document.getElementById("balance").textContent = balance;
  resetBets();
}

function resetBets() {
  for (const type in bets) {
    bets[type] = 0;
    document.getElementById(`${type}-bet`).textContent = 0;
  }
}
