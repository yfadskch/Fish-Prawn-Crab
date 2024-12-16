let balance = 200;
let points = 0;

// 打开 Reward 弹窗
function openRewardPopup() {
  document.getElementById("modal").style.display = "flex";
}

// 关闭 Reward 弹窗
document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal-message").textContent = "";
});

// 监听奖励选项
document.querySelectorAll(".reward-option").forEach((button) => {
  button.addEventListener("click", function () {
    const option = this.getAttribute("data-option");
    claimReward(option);
  });
});

// 奖励逻辑
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
    message = "Not enough points to redeem this reward!";
  }

  document.getElementById("modal-message").textContent = message;
  updateUI();
}

// 更新 UI
function updateUI() {
  document.getElementById("balance").textContent = balance.toFixed(2);
  document.getElementById("points").textContent = points;
}
