let balance = 100;
let points = 3000; // Default points for redeem rewards
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
  // Dice roll logic remains unchanged
  alert("Dice rolled!");
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
