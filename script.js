let balance = 200;
let points = 0;

// 选择筹码
function selectChip(value) {
  currentChip = value;
}

// 下注逻辑
function placeBet(type) {
  if (balance >= currentChip) {
    bets[type] += currentChip;
    balance -= currentChip;
    document.getElementById(`${type}-bet`).textContent = bets[type];
    updateUI();
  } else {
    alert("Not enough balance!");
  }
}

// 掷骰子逻辑（省略动画保持简洁）
function rollDice() {
  const results = ["tiger", "gourd", "shrimp"];
  results.forEach((result, i) => {
    document.getElementById(`dice${i + 1}`).textContent = result;
  });
}

// 打开奖励弹窗
function openRewardPopup() {
  document.getElementById("modal").style.display = "flex";
}

// 关闭弹窗
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal-message").textContent = "";
});

// 奖励选项
document.querySelectorAll(".reward-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    const option = btn.getAttribute("data-option");
    claimReward(option);
  });
});

function claimReward(option) {
  let message = "";
  if (option === "1" && points >= 200) {
    points -= 200;
    balance += 200;
    message = "You redeemed 200 points for +200 Balance!";
  } else if (option === "2" && points >= 1000) {
    points -= 1000;
    balance += 1000;
    message = "You redeemed 1000 points for Welcome Bonus!";
  } else if (option === "3" && points >= 3000) {
    points -= 3000;
    balance += 8.88;
    message = "You redeemed 3000 points for Free 8.88!";
  } else {
    message = "Not enough points!";
  }
  document.getElementById("modal-message").textContent = message;
  updateUI();
}

// 更新余额和积分
function updateUI() {
  document.getElementById("balance").textContent = balance.toFixed(2);
  document.getElementById("points").textContent = points;
}
