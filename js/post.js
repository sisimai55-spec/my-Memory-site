async function post() {

  const file = document.getElementById("image").files[0];
  const text = document.getElementById("text").value;
  const user = localStorage.getItem("loginUser");

  let imageBase64 = "";

  if (file) {
    const reader = new FileReader();

    reader.onload = async function() {

      imageBase64 = reader.result;

      await sendPost(imageBase64);
    };

    reader.readAsDataURL(file);
  } else {
    await sendPost("");
  }

  async function sendPost(img) {

    await fetch(
      "https://my-memory-site.pages.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user,
          text,
          image: img,
          time: new Date().toLocaleString()
        })
      }
    );

    alert("投稿成功！");
  }
}
