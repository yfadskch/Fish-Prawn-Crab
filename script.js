let balance = 200;
let points = 0;
const bets = {
  tiger: 0,
  gourd: 0,
  rooster: 0,
  crab: 0,
  fish: 0,
  shrimp: 0
};
let currentChip = 10;
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
  let iterations = 20;
  let speed = 50;
  const results = [];

  const rollAnimation = setInterval(() => {
    results[0] = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];
    results[1] = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];
    results[2] = diceSymbols[Math.floor(Math.random() * diceSymbols.length)];

    document.getElementById("dice1").textContent = getEmoji(results[0]);
    document.getElementById("dice2").textContent = getEmoji(results[1]);
    document.getElementById("dice3").textContent = getEmoji(results[2]);

    iterations--;
    speed += 10;

    if (iterations <= 0) {
      clearInterval(rollAnimation);
      finalizeRoll(results);
    }
  }, speed);
}

function finalizeRoll(results) {
  const totalBets = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
  points += totalBets;
  document.getElementById("points").textContent = points;

  results.forEach((result) => {
    if (bets[result] > 0) {
      balance += bets[result] * 2;
    }
  });

  document.getElementById("balance").textContent = balance.toFixed(2);
  resetBets();

  document.getElementById("result-message").textContent = `You rolled: ${getEmoji(results[0])}, ${getEmoji(results[1])}, ${getEmoji(results[2])}.`;
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
    "Choose a reward:\n1. 200 Points: +200 Balance\n2. 1000 Points: Welcome Bonus \n3. 2000 Points: Free 8.88"
  );

  if (reward === "1" and points >= 200) {
    points -= 200;
    balance += 200;
    alert("You redeemed +200 Balance!");
  } else if (reward === "2" and points >= 1000) {
    points -= 1000;
    const bonus = balance * 0.6;
    balance += bonus;
    alert(`You redeemed Welcome Bonus ! (+${bonus.toFixed(2)} Balance)`);
  } else if (reward === "3" and points >= 2000) {
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
