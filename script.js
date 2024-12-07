let balance = 100;
let points = 0; // Initialize points to 0
const bets = {
  tiger: 0,
  gourd: 0,
  rooster: 0,
  crab: 0,
  fish: 0,
  shrimp: 0
};
let currentChip = 10; // Default chip value

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
  // Generate random dice results
  const result1 = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];
  const result2 = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];
  const result3 = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];

  // Update dice display
  document.getElementById("dice1").textContent = getEmoji(result1);
  document.getElementById("dice2").textContent = getEmoji(result2);
  document.getElementById("dice3").textContent = getEmoji(result3);

  // Calculate total bets
  const totalBets = Object.values(bets).reduce((sum, bet) => sum + bet, 0);

  // Add points based on total bets
  points += totalBets;
  document.getElementById("points").textContent = points;

  // Reset bets
  resetBets();

  // Show result message
  document.getElementById("result-message").textContent = `You rolled: ${getEmoji(result1)}, ${getEmoji(result2)}, ${getEmoji(result3)}.`;
}

function resetBets() {
  for (const key in bets) {
    bets[key] = 0;
    document.getElementById(`${key}-bet`).textContent = 0;
  }
}

function getEmoji(type) {
  const emojis = {
    tiger: "🐯",
    gourd: "🍐",
    rooster: "🐓",
    crab: "🦀",
    fish: "🐟",
    shrimp: "🦐"
  };
  return emojis[type] || "🎲";
}

function openRewards() {
  const reward = prompt(
    "Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus 60%\n3. 2000 Points: Free 8.88"
  );

  if (reward === "1" && points >= 200) {
    points -= 200;
    balance += 200;
    alert("You redeemed +200 Balance!");
  } else if (reward === "2" && points >= 1000) {
    points -= 1000;
    const bonus = balance * 0.6;
    balance += bonus;
    alert(`You redeemed Welcome Bonus 60%! (+${bonus.toFixed(2)} Balance)`);
  } else if (reward === "3" && points >= 2000) {
    points -= 2000;
    balance += 8.88;
    alert("You redeemed Free 8.88!");
  } else {
    alert("Not enough points or invalid option.");
  }

  updateUI();
}

function updateUI() {
  document.getElementById("balance").textContent = balance.toFixed(2);
  document.getElementById("points").textContent = points;
}
