async function checkLogin(username, userToken) {
  // JSON を fetch で取得
  const res = await fetch("users.json");
  const users = await res.json();

  if(users[username] && users[username] === userToken){
    alert("ログイン成功！✨");
    // ここで既存の処理をそのまま実行
  } else {
    alert("ユーザー名かトークンが違うよ❌");
  }
}

// ボタン押したときに呼ぶ
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("usernameInput").value.trim();
  const token = document.getElementById("tokenInput").value.trim();
  checkLogin(username, token);
});
