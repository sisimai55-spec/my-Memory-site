async function requireLogin(){

const token=localStorage.getItem("loginToken");

if(!token){
location.href="login.html";
throw "no login";
}

const url=
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${TOKEN_FILE}`;

const res=await fetch(url);
const json=await res.json();

const tokens=JSON.parse(
decodeURIComponent(escape(atob(json.content)))
);

if(tokens[token]!=="active"){
localStorage.removeItem("loginToken");
location.href="login.html";
throw "invalid";
}
}
