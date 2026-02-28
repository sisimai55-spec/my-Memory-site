// ユーザー名とランダムトークンのセット
const users = {
  "keikun1704": "Ab3Xy9K2LmPq8Rt5"
};

// ボタンを取得してイベント登録
const loginBtn = document.querySelector("button");
loginBtn.addEventListener("click", () => {
  const userToken = document.getElementById("token").value.trim();

  let success = false;
  for(const username in users){
    if(users[username] === userToken){
      success = true;
      break;
    }
  }

  const result = document.getElementById("result");
  result.textContent = success ? "ログイン成功！✨" : "トークンが違うよ❌";
});
