async function login() {

  const username =
    document.getElementById("username").value.trim();

  const token =
    document.getElementById("token").value.trim();

  const msg = document.getElementById("msg");

  if (!token) {
    msg.textContent = "トークンを入力してね";
    return;
  }

  try {
    const res = await fetch(CONFIG.tokensUrl);
    const tokens = await res.json();

    let ok = false;

    // ユーザ名指定あり
    if (username && tokens[username]) {
      ok = tokens[username].includes(token);
    }
    // トークンのみOK
    else {
      for (const user in tokens) {
        if (tokens[user].includes(token)) {
          ok = true;
          break;
        }
      }
    }

    if (!ok) {
      msg.textContent = "トークンが違います";
      return;
    }

    // 保存
    localStorage.setItem("loginToken", token);
    localStorage.setItem("username", username || "guest");

    location.href = "view.html";

  } catch {
    msg.textContent = "tokens.json が見つかりません";
  }
}
