function login() {

  const username = document.getElementById("username").value.trim();
  const token = document.getElementById("token").value.trim();

  if (!username || !token) {
    document.getElementById("msg").textContent =
      "入力してね";
    return;
  }

  // 保存
  localStorage.setItem("loginUser", username);

  console.log("保存した:", localStorage.getItem("loginUser"));

  // 戻り先
  const next = localStorage.getItem("afterLogin");

  if (next) {
    localStorage.removeItem("afterLogin");
    location.href = next;
  } else {
    location.href = "./top.html";
  }
}
