async function post() {

  const text = textEl.value;
  const file = photo.files[0];
  const user = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  let image = null;

  if (file) {
    image = await compressImage(file);
  }

  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      user,
      text,
      image,
      token
    })
  });

  alert("投稿完了！");
}

// ⭐画像圧縮
function compressImage(file) {
  return new Promise(resolve => {

    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => img.src = e.target.result;

    img.onload = () => {

      const canvas = document.createElement("canvas");
      const max = 800;

      let w = img.width;
      let h = img.height;

      if (w > max) {
        h *= max / w;
        w = max;
      }

      canvas.width = w;
      canvas.height = h;

      canvas.getContext("2d").drawImage(img,0,0,w,h);

      resolve(canvas.toDataURL("image/jpeg",0.7));
    };

    reader.readAsDataURL(file);
  });
}
