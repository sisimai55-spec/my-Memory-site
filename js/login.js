async function login() {

  const username = document.getElementById("username").value.trim();
  const token = document.getElementById("token").value.trim();
  const msg = document.getElementById("msg");

  if (!token) {
    msg.textContent = "トークンを入力してください";
    return;
  }

  try {
    const res = await fetch("data/tokens.json");
    const tokens = await res.json();

    // トークンチェック
    let ok = false;

    for (const user in tokens) {
      if (tokens[user].includes(token)) {
        ok = true;
        break;
      }
    }

    if (ok) {
      // ✅ ログイン保存
      localStorage.setItem("loginToken", token);
      localStorage.setItem("loginUser", username || "guest");

      // ✅ index.htmlへ移動
      location.href = "index.html";

    } else {
      msg.textContent = "トークンが違います";
    }

  } catch (e) {
    msg.textContent = "tokens.json が見つかりません";
  }
}
