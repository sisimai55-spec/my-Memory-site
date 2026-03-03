const API="https://あなたのWorkerURL";

function saveSession(user,token){
  localStorage.setItem("user",user);
  localStorage.setItem("token",token);
}

function getUser(){ return localStorage.getItem("user"); }
function getToken(){ return localStorage.getItem("token"); }

async function login(){
  const user=username.value;
  const token=usertoken.value;

  const res=await fetch(API+"/login",{
    method:"POST",
    body:JSON.stringify({user,token})
  });

  if(res.ok){
    saveSession(user,token);
    location.href="select.html";
  }else{
    alert("ログイン失敗");
  }
}

async function register(){
  const user=username.value;
  const res=await fetch(API+"/register",{
    method:"POST",
    body:JSON.stringify({user})
  });
  const data=await res.json();
  alert("あなたのトークン: "+data.token);
}

function logout(){
  localStorage.clear();
  location.href="login.html";
}

async function post(){
  const text=document.getElementById("text").value;
  const file=document.getElementById("image").files[0];
  let img="";

  if(file){
    const reader=new FileReader();
    reader.onload=async ()=>{
      img=reader.result;
      await sendPost(text,img);
    };
    reader.readAsDataURL(file);
  }else{
    await sendPost(text,"");
  }
}

async function sendPost(text,image){
  await fetch(API+"/post",{
    method:"POST",
    body:JSON.stringify({
      user:getUser(),
      token:getToken(),
      text,
      image
    })
  });
  alert("投稿しました");
}

async function loadPosts(){
  const res=await fetch(API+"/posts");
  const posts=await res.json();
  const div=document.getElementById("posts");
  div.innerHTML="";
  posts.reverse().forEach(p=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <b>${p.user}</b><br>
      ${p.text}<br>
      ${p.image?`<img src="${p.image}" width="200"><br>`:""}
      ❤️ ${p.likes}<br>
      <button class="pink" onclick="like('${p.id}')">いいね</button>
      ${getUser()==="admin"
        ? `<button class="red" onclick="del('${p.id}')">削除</button>`
        : ""
      }
    `;
    div.appendChild(card);
  });
}

async function like(id){
  await fetch(API+"/like",{
    method:"POST",
    body:JSON.stringify({id})
  });
  loadPosts();
}

async function del(id){
  await fetch(API+"/delete",{
    method:"POST",
    body:JSON.stringify({
      id,
      token:getToken()
    })
  });
  loadPosts();
}
