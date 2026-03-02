const TOKENS_URL = "data/tokens.json";

async function login() {

  const user =
    document.getElementById("username").value.trim();

  const token =
    document.getElementById("token").value.trim();

  const msg = document.getElementById("msg");

  if (!user || !token) {
    msg.textContent = "入力してください";
    return;
  }

  try {
    const res = await fetch(TOKENS_URL);
    const tokens = await res.json();

    // ✔ ユーザ存在チェック
    if (!tokens[user]) {
      msg.textContent = "ユーザが存在しません";
      return;
    }

    // ✔ トークン一致チェック
    if (tokens[user].includes(token)) {

      localStorage.setItem("loginUser", user);

      msg.textContent = "ログイン成功！";

      // ログイン後戻るページ
      const next =
        localStorage.getItem("afterLogin") || "top.html";

      localStorage.removeItem("afterLogin");

      setTimeout(() => {
        location.href = next;
      }, 500);

    } else {
      msg.textContent = "トークンが違います";
    }

  } catch (e) {
    console.error(e);
    msg.textContent = "データ読み込み失敗";
  }
}
