const API = "https://あなたのworker.workers.dev";

async function login() {

  const token =
    document.getElementById("token").value;

  const r = await fetch(API + "/check?token=" + token);

  if(r.ok){
    localStorage.setItem("token", token);
    location.href="save.html";
  }else{
    alert("トークンエラー");
  }
}
