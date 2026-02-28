async function login() {

  const username =
    document.getElementById("username").value.trim();

  const token =
    document.getElementById("token").value.trim();

  const url =
    "https://api.github.com/repos/sisimai55-spec/my-photo-text-site/contents/data/tokens.json?ref=main";

  const res = await fetch(url);
  const apiData = await res.json();

  const text =
    atob(apiData.content.replace(/\n/g,""));

  const json = JSON.parse(text);

  const users = json.users;

  let success = false;

  // ===== トークンだけチェック =====
  for (const name in users) {
    if (users[name] === token) {
      success = true;
      localStorage.setItem("user", name);
    }
  }

  // ===== ユーザ名も入力された場合 =====
  if (username && users[username] === token) {
    success = true;
    localStorage.setItem("user", username);
  }

  if (success) {
    localStorage.setItem("token", token);
    location.href = "top.html";
  } else {
    alert("ログインできません");
  }
}
