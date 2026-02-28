async function login(){

const token=document.getElementById("token").value.trim();
const msg=document.getElementById("msg");

msg.innerText="読み込み中...";

try{

const url =
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${TOKEN_FILE}`;

msg.innerText="GitHub接続中...";

const res = await fetch(url);

msg.innerText="レスポンス取得";

const json = await res.json();

if(!json.content){
msg.innerText="tokens.json が見つかりません";
return;
}

msg.innerText="トークン確認中...";

const decoded = atob(json.content.replace(/\n/g,""));
const tokens = JSON.parse(decoded);

if(tokens[token]==="active"){
msg.innerText="ログイン成功！";
localStorage.setItem("loginToken",token);

setTimeout(()=>{
location.href="index.html";
},500);

}else{
msg.innerText="トークンが違います";
}

}catch(e){
msg.innerText="エラー："+e;
}
}
