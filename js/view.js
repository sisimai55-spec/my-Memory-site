async function loadPosts() {

  const res = await fetch(CONFIG.postsUrl);
  const posts = await res.json();

  const area = document.getElementById("posts");
  area.innerHTML = "";

  posts.reverse().forEach(p => {
    area.innerHTML += `
      <div class="post">
        <b>${p.user}</b><br>
        ${p.text}
      </div>
    `;
  });
}

loadPosts();
