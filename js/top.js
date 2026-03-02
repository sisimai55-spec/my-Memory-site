// ===== ログインチェック =====
const user = localStorage.getItem("loginUser");
const userText = document.getElementById("user");

if (user) {
  userText.textContent = "ログイン中: " + user;
} else {
  userText.textContent = "未ログイン";
}

// ===== 閲覧 =====
function goView() {
  location.href = "./view.html";
}

// ===== 投稿 =====
function goPost() {

  const user = localStorage.getItem("loginUser");

  console.log("loginUser =", user); // ←確認用

  if (!user || user === "null") {
    localStorage.setItem("afterLogin", "./post.html");
    location.href = "./index.html";
    return;
  }

  location.href = "./post.html";
}

// ===== ログアウト =====
function logout() {
  localStorage.removeItem("loginUser");
  alert("ログアウトしました");
}
