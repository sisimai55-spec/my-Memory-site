// ===== 設定 =====

const API = "/api";   // Cloudflare functions


// ===== ページ移動 =====

function goRegister(){
location.href="register.html"
}

function goMenu(){
location.href="menu.html"
}

function goPost(){
location.href="post.html"
}

function goView(){
location.href="view.html"
}

function goAdmin(){
location.href="admin.html"
}


// ===== ログアウト =====

function logout(){

localStorage.removeItem("user")
localStorage.removeItem("token")

location.href="index.html"

}



// ===== ログイン =====

async function login(){

const user=document.getElementById("user").value
const token=document.getElementById("token").value

const res=await fetch(API+"/login",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({user,token})
})

const data=await res.json()

if(data.ok){

localStorage.user=user
localStorage.token=token

location.href="menu.html"

}else{

alert("ログイン失敗")

}

}



// ===== 新規登録 =====

async function register(){

const invite=document.getElementById("invite").value
const user=document.getElementById("newUser").value
const token=document.getElementById("newToken").value

const res=await fetch(API+"/register",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

invite,user,token

})

})

const data=await res.json()

if(data.ok){

alert("登録成功")

location.href="index.html"

}else{

alert("登録失敗")

}

}



// ===== 投稿 =====

async function post(){

const text=document.getElementById("text").value

const file=document.getElementById("image").files[0]

const now=new Date()

const date=now.toLocaleDateString()

const time=now.toLocaleTimeString()

const zip=new JSZip()

zip.file("text.txt",text)

zip.file("info.json",JSON.stringify({

user:localStorage.user,

date:date,

time:time

}))

zip.file("likes.json",JSON.stringify({

count:0,

users:[]

}))


if(file){

const buffer=await file.arrayBuffer()

zip.file("image.jpg",buffer)

}


const base64=await zip.generateAsync({type:"base64"})


await fetch(API+"/post",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

zip:base64

})

})


alert("投稿した")

}



// ===== 投稿読み込み =====

async function loadPosts(){

const res=await fetch(API+"/posts")

const list=await res.json()

const area=document.getElementById("posts")

area.innerHTML=""

for(const p of list){

const zip=await JSZip.loadAsync(p.zip,{base64:true})

const text=await zip.file("text.txt").async("string")

const info=JSON.parse(

await zip.file("info.json").async("string")

)

const likes=JSON.parse(

await zip.file("likes.json").async("string")

)

let del=""

if(info.user===localStorage.user){

del=`<button onclick="deletePost('${p.id}')">削除</button>`

}

area.innerHTML+=`

<div class="post">

<b>${info.user}</b>

<br>

${info.date} ${info.time}

<p>${text}</p>

<button onclick="like('${p.id}')">

👍 ${likes.count}

</button>

${del}

</div>

`

}

}



// ===== いいね =====

async function like(id){

await fetch(API+"/like",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

id:id,

user:localStorage.user

})

})

loadPosts()

}



// ===== 投稿削除 =====

async function deletePost(id){

await fetch(API+"/delete",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

id:id,

user:localStorage.user

})

})

loadPosts()

}



// ===== トークン一覧 =====

async function loadUsers(){

const res=await fetch(API+"/users")

const users=await res.json()

const area=document.getElementById("list")

area.innerHTML=""

for(const u of users){

area.innerHTML+=`

<div>

${u.user}

<button onclick="deleteUser('${u.user}')">削除</button>

</div>

`

}

}



// ===== ユーザー追加 =====

async function addUser(){

const user=document.getElementById("newUser").value

const token=document.getElementById("newToken").value

await fetch(API+"/addUser",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

user,token

})

})

loadUsers()

}



// ===== ユーザー削除 =====

async function deleteUser(user){

await fetch(API+"/deleteUser",{

method:"POST",

headers:{'Content-Type':'application/json'},

body:JSON.stringify({

user

})

})

loadUsers()

}
