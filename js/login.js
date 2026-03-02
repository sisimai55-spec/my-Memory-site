async function login(){

 const token=document.getElementById("token").value.trim();
 const username=
   document.getElementById("username").value.trim() || "guest";

 const res=await fetch("data/tokens.json");
 const data=await res.json();

 if(!data.tokens.includes(token)){
   msg.textContent="トークンが違います";
   return;
 }

 localStorage.token=token;
 localStorage.username=username;

 location.href="view.html";
}
