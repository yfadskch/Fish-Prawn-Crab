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

// Select a chip value
function selectChip(value) {
  currentChip = value;
  console.log(`Current chip set to ${value}`);
}

// Place a bet
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

// Roll the dice
function rollDice() {
  const rollSound = document.getElementById("roll-sound");
  rollSound.play();

  const dice1 = diceSymbols[Math.floor(Math.random() * 6)];
  const dice2 = diceSymbols[Math.floor(Math.random() * 6)];
  const dice3 = diceSymbols[Math.floor(Math.random() * 6)];

  displayDice(dice1, dice2, dice3);
  calculateResult([dice1, dice2, dice3]);
}

// Display dice results
function displayDice(dice1, dice2, dice3) {
  document.getElementById("dice1").textContent = getSymbol(dice1);
  document.getElementById("dice2").textContent = getSymbol(dice2);
  document.getElementById("dice3").textContent = getSymbol(dice3);
}

// Get symbol for dice type
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

// Calculate the result
function calculateResult(diceResults) {
  let winAmount = 0;
  diceResults.forEach(result => {
    if (bets[result] > 0) {
      winAmount += bets[result];
    }
  });

  if (winAmount > 0) {
    document.getElementById("result-message").textContent = `You won ${winAmount} chips! 🎉`;
  } else {
    document.getElementById("result-message").textContent = "You lost! 😢";
  }

  balance += winAmount;
  document.getElementById("balance").textContent = balance;
  resetBets();
}

// Reset bets
function resetBets() {
  for (const type in bets) {
    bets[type] = 0;
    document.getElementById(`${type}-bet`).textContent = `0`;
  }
}
