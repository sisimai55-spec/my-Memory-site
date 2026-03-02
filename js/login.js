const users = {
  "keikun": "1234",
  "test": "abcd"
};

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (users[user] === pass) {
    localStorage.setItem("loginUser", user);
    location.href = "view.html";
  } else {
    document.getElementById("msg").textContent =
      "ログイン失敗";
  }
}
