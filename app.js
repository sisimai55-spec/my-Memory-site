// =====================
// 設定
// =====================
const WORKER = "あなたのWorkerURL";

// =====================
// 共通チェック
// =====================
function requireLogin() {
  if (!localStorage.getItem("loggedIn")) {
    alert("ログインしてね");
    location.href = "login.html";
    return false;
  }
  return true;
}

// =====================
// 🔐 ログイン
// =====================
async function login() {
  const user = document.getElementById("user")?.value;
  const pass = document.getElementById("pass")?.value;

  const res = await fetch(WORKER + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, pass })
  });

  if (res.ok) {
    localStorage.setItem("loggedIn", "true");
    location.href = "menu.html";
  } else {
    alert("ログイン失敗");
  }
}

// =====================
// 🧭 メニュー
// =====================
function goPost() {
  if (!requireLogin()) return;
  location.href = "post.html";
}

function goView() {
  location.href = "view.html";
}

function logout() {
  localStorage.removeItem("loggedIn");
  location.href = "login.html";
}

// =====================
// 🕒 ファイル名生成
// =====================
function makeFileName() {
  const now = new Date();

  const y = now.getFullYear();
  const m = String(now.getMonth()+1).padStart(2,"0");
  const d = String(now.getDate()).padStart(2,"0");
  const h = String(now.getHours()).padStart(2,"0");
  const min = String(now.getMinutes()).padStart(2,"0");
  const s = String(now.getSeconds()).padStart(2,"0");

  const rand = crypto.randomUUID().slice(0,6);

  return `${y}${m}${d}-${h}${min}${s}-${rand}.zip`;
}

// =====================
// 🖼 画像圧縮
// =====================
async function compressImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => img.src = e.target.result;
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxWidth = 800;

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        0.65
      );
    };
  });
}

// =====================
// 📦 投稿
// =====================
async function uploadPost() {

  if (!requireLogin()) return;

  const text = document.getElementById("text")?.value;
  const file = document.getElementById("image")?.files[0];

  const zip = new JSZip();
  zip.file("post.txt", text || "");

  if (file) {
    const compressed = await compressImage(file);
    const buffer = await compressed.arrayBuffer();
    zip.file("image.jpg", buffer);
  }

  const base64 = await zip.generateAsync({ type: "base64" });
  const filename = makeFileName();

  await fetch(WORKER + "/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, zip: base64 })
  });

  alert("投稿完了");
  location.href = "menu.html";
}

// =====================
// 🗑 削除
// =====================
async function deletePost(filename) {

  if (!requireLogin()) return;

  if (!confirm(filename + " を削除する？")) return;

  await fetch(WORKER + "/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename })
  });

  alert("削除完了");
  loadPosts();
}

// =====================
// 📖 投稿一覧表示（ZIP解凍）
// =====================
async function loadPosts() {

  const container = document.getElementById("posts");
  if (!container) return;

  container.innerHTML = "読み込み中...";

  const res = await fetch(WORKER + "/list");
  let files = await res.json();

  // 新しい順
  files.sort().reverse();

  container.innerHTML = "";

  for (const file of files) {

    const zipRes = await fetch(WORKER + "/get?name=" + file);
    const base64 = await zipRes.text();

    const zip = await JSZip.loadAsync(base64, { base64: true });

    const text = await zip.file("post.txt").async("string");

    let imgHTML = "";

    if (zip.file("image.jpg")) {
      const blob = await zip.file("image.jpg").async("blob");
      const url = URL.createObjectURL(blob);
      imgHTML = `<img src="${url}" width="300">`;
    }

    container.innerHTML += `
      <div style="border:1px solid #ccc;margin:10px;padding:10px;">
        <small>${formatTime(file)}</small>
        <p>${escapeHTML(text)}</p>
        ${imgHTML}
        <br>
        <button onclick="deletePost('${file}')">削除</button>
      </div>
    `;
  }
}

// =====================
// 🕒 ファイル名→時刻表示
// =====================
function formatTime(name) {
  const parts = name.split("-");
  if (parts.length < 2) return name;

  const date = parts[0];
  const time = parts[1];

  return `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)} `
       + `${time.slice(0,2)}:${time.slice(2,4)}:${time.slice(4,6)}`;
}

// =====================
// 🛡 XSS対策（簡易）
// =====================
function escapeHTML(str) {
  return str
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}
