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
  // Play dice rolling sound
  const rollSound = document.getElementById("roll-sound");
  rollSound.play();

  // Generate random dice results
  const dice1 = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];
  const dice2 = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];
  const dice3 = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];

  // Display the dice results
  displayDice(dice1, dice2, dice3);

  // Calculate the game result based on dice outcomes
  calculateResult([dice1, dice2, dice3]);
}

// Display dice results on the page
function displayDice(dice1, dice2, dice3) {
  // Get emoji representation for dice results
  const dice1Symbol = getSymbol(dice1);
  const dice2Symbol = getSymbol(dice2);
  const dice3Symbol = getSymbol(dice3);

  // Display results in result-message
  const diceResultMessage = `Dice Results: ${dice1Symbol}, ${dice2Symbol}, ${dice3Symbol}`;
  document.getElementById("result-message").innerHTML = diceResultMessage;
}

// Get the emoji symbol for each dice result
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

// Calculate and display the game result
function calculateResult(diceResults) {
  let winAmount = 0;
  diceResults.forEach(result => {
    if (bets[result] > 0) {
      winAmount += bets[result] * 2; // Double the bet as winning
    }
  });

  // Update balance and display results
  if (winAmount > 0) {
    document.getElementById("result-message").innerHTML += `<br>You won ${winAmount} chips! 🎉`;
    balance += winAmount;
  } else {
    document.getElementById("result-message").innerHTML += `<br>You lost! 😢`;
  }

  // Reset bets and update balance display
  document.getElementById("balance").textContent = balance;
  resetBets();
}

// Reset all bets to zero after a round
function resetBets() {
  for (const type in bets) {
    bets[type] = 0;
    document.getElementById(`${type}-bet`).textContent = `0`;
  }
}
