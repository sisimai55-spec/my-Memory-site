async function login(){

const token=document.getElementById("token").value;

const url=
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${TOKEN_FILE}`;

const res=await fetch(url);
const json=await res.json();

const tokens=JSON.parse(
decodeURIComponent(escape(atob(json.content)))
);

if(tokens[token]==="active"){
localStorage.setItem("loginToken",token);
location.href="index.html";
}else{
document.getElementById("msg").innerText="トークンが違います";
}
}
