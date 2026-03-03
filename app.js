const WORKER = "あなたのWorkerのURL";

let authToken = localStorage.getItem("token") || "";

/* ===========================
   🔐 ログイン
=========================== */
async function login() {

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (!user || !pass) {
    alert("ユーザー名とパスワードを入力してね");
    return;
  }

  const res = await fetch(WORKER + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass })
  });

  if (res.ok) {
    const data = await res.json();
    authToken = data.token;
    localStorage.setItem("token", authToken);
    alert("ログイン成功！");
    location.href = "menu.html";
  } else {
    alert("ログイン失敗");
  }
}

/* ===========================
   🆕 新規登録（招待制）
=========================== */
async function register() {

  const inviteToken = document.getElementById("invite").value;
  const newUser = document.getElementById("newUser").value;
  const newPass = document.getElementById("newPass").value;

  if (!inviteToken || !newUser || !newPass) {
    alert("全部入力してね");
    return;
  }

  const res = await fetch(WORKER + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      inviteToken,
      newUser,
      newPass
    })
  });

  if (res.ok) {
    alert("登録成功！ログインしてね");
  } else {
    const text = await res.text();
    alert("登録失敗: " + text);
  }
}
