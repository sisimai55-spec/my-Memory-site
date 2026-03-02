// tokens.jsonを読む場合は fetch で取得
const TOKENS_URL = "data/tokens.json";

async function login() {
  const user = document.getElementById("username").value;
  const token = document.getElementById("token").value;

  if (!user || !token) {
    document.getElementById("msg").textContent =
      "ユーザ名とトークンを入力してください";
    return;
  }

  try {
    const res = await fetch(TOKENS_URL);
    const data = await res.json();

    // ユーザ名が存在して、トークン一致
    if (data[user] && data[user].includes(token)) {
      localStorage.setItem("loginUser", user);
      document.getElementById("msg").textContent =
        "✅ ログイン成功！ページ移動中...";
      
      setTimeout(() => {
        location.href = "top.html"; // 閲覧ページへ
      }, 500);

    } else {
      document.getElementById("msg").textContent =
        "❌ ユーザ名またはトークンが違います";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("msg").textContent =
      "データ取得に失敗しました";
  }
}
