// ログインユーザー取得
const user = localStorage.getItem("loginUser");

// 要素がある時だけ表示（←重要）
const userEl = document.getElementById("user");

if (user && userEl) {
  userEl.textContent = "ログイン中: " + user;
}

// 閲覧
function goView() {
  location.href = "view.html";
}

// 投稿（ログイン必須）
function goPost() {

  const user = localStorage.getItem("loginUser");

  if (!user) {
    localStorage.setItem("afterLogin", "post.html");
    location.href = "index.html";
  } else {
    location.href = "post.html";
  }
}

// ログアウト
function logout() {
  localStorage.removeItem("loginUser");
  alert("ログアウトしました");
  location.href = "index.html";
}
