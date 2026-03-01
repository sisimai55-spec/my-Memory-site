function requireLogin() {

  const token = localStorage.getItem("loginToken");

  if (!token) {
    location.href = "index.html";
  }
}
