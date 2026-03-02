function login() {

  const username = document.getElementById("username").value;
  const token = document.getElementById("token").value;

  // 仮ログイン（あとでGitHub認証に変える）
  if (username && token) {

    // ★これが超重要
    localStorage.setItem("loginUser", username);

    // ログイン後移動
    const next = localStorage.getItem("afterLogin");

    if (next) {
      localStorage.removeItem("afterLogin");
      location.href = next;
    } else {
      location.href = "top.html";
    }

  } else {
    document.getElementById("msg").textContent =
      "ユーザ名とトークンを入力してね";
  }
}
