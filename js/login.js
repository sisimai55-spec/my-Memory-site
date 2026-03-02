// ログインユーザー表示
const user = localStorage.getItem("loginUser");

if (user) {
  document.getElementById("user").textContent =
    "ログイン中: " + user;
}

// 閲覧（ログイン不要にしてもOK）
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

function logout() {
  localStorage.removeItem("loginUser");
  alert("ログアウトしました");
}
