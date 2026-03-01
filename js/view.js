async function load(){

const res = await fetch(CONFIG.postsUrl);
const posts = await res.json();

posts.reverse().forEach(p=>{

postsEl.innerHTML += `
<div class="post">

<b>${p.user}</b><br>
${p.text}<br>

${p.image ?
`<img src="${p.image}" onclick="openImg('${p.image}')">`
:""}

<br>

❤️ ${p.likes}
<button onclick="like('${p.id}')">いいね</button>

${
p.token===localStorage.getItem("token")
? `<button onclick="del('${p.id}')">削除</button>`
:""
}

</div>`;
});
}

function like(id){
fetch("/api/like",{method:"POST",body:JSON.stringify({id})})
.then(load);
}

function del(id){
fetch("/api/delete",{
method:"POST",
body:JSON.stringify({
id,
token:localStorage.getItem("token")
})
}).then(load);
}

function openImg(src){
viewer.style.display="flex";
bigImg.src=src;
}

function closeViewer(){
viewer.style.display="none";
}

load();
