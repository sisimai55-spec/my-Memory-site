const WORKER = "https://my-memory-site.pages.dev/";

let authToken = localStorage.getItem("token") || "";

/* ===========================
   🔐 ログイン
=========================== */
async function login() {

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  const res = await fetch(WORKER + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass })
  });

  if (res.ok) {
    const data = await res.json();
    authToken = data.token;
    localStorage.setItem("token", authToken);
    location.href = "menu.html";
  } else {
    alert("ログイン失敗");
  }
}

/* ===========================
   🆕 新規登録
=========================== */
async function register() {

  const inviteToken = document.getElementById("invite").value;
  const newUser = document.getElementById("newUser").value;
  const newPass = document.getElementById("newPass").value;

  const res = await fetch(WORKER + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inviteToken, newUser, newPass })
  });

  if (res.ok) {
    alert("登録成功！");
  } else {
    alert("登録失敗");
  }
}

/* ===========================
   📦 投稿
=========================== */
async function uploadPost(filename, base64) {

  const res = await fetch(WORKER + "/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: authToken,
      filename,
      zip: base64
    })
  });

  if (!res.ok) alert("投稿失敗");
}

/* ===========================
   🗑 削除
=========================== */
async function deletePost(filename) {

  const res = await fetch(WORKER + "/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: authToken,
      filename
    })
  });

  if (!res.ok) alert("削除失敗");
}
