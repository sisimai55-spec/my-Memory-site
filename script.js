async function login() {
  const userToken = document.getElementById("token").value.trim();

  // JSON からユーザー名とトークンのセットを取得
  const res = await fetch("users.json");
  const users = await res.json();

  // JSON の中に入力トークンがあればログイン成功
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
