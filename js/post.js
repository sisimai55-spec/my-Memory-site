async function post() {

  const text = document.getElementById("text").value;
  const user = localStorage.getItem("username");

  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      user,
      text
    })
  });

  alert("投稿したよ！");
}
