async function loadData() {

  const token = prompt("トークンを入力してください");
  if (!token) {
    alert("トークンが必要です");
    return;
  }

  const res = await fetch("/list?token=" + token);

  if (res.status !== 200) {
    alert("閲覧できません");
    return;
  }

  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(item => {

    const div = document.createElement("div");
    div.className = "card";

    // テキスト表示
    if (item.type === "text") {
      div.innerText = item.user + " : " + item.content;
    }

    // 写真表示
    if (item.type === "photo") {
      const img = document.createElement("img");
      img.src = item.url;
      img.width = 200;
      div.appendChild(img);
    }

    list.appendChild(div);
  });
}
