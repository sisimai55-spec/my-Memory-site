// ユーザー名とランダムトークンのセット
const users = {
  "keikun1704": "Ab3Xy9K2LmPq8Rt5"
};

function login() {
  const userToken = document.getElementById("token").value.trim();

  // 入力したトークンが users にあるかチェック
  let success = false;
  for(const username in users){
    if(users[username] === userToken){
      success = true;
      break;
    }
  }

  const result = document.getElementById("result");
  if(success){
    result.textContent = "ログイン成功！✨";
  } else {
    result.textContent = "トークンが違うよ❌";
  }
}
