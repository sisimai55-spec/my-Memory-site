async function login() {

  const tokenInput =
    document.getElementById("token").value.trim();

  // GitHub APIから取得
  const res = await fetch(
    "https://api.github.com/repos/sisimai55-spec/my-photo-text-site/contents/data/tokens.json?ref=main"
  );

  const data = await res.json();

  // ⭐ 超重要：Base64 → 普通の文字へ変換
  const decoded = atob(data.content);

  const json = JSON.parse(decoded);

  const tokens = json.tokens;

  // 判定
  if (tokens.includes(tokenInput)) {

    localStorage.setItem("token", tokenInput);

    location.href = "top.html";

  } else {
    alert("トークンが違います");
  }
}
