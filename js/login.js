async function login(){

  const token =
    document.getElementById("token").value.trim();

  const msg = document.getElementById("msg");

  const res = await fetch(TOKENS_URL);
  const tokens = await res.json();

  let ok = false;

  for(const user in tokens){
    if(tokens[user].includes(token)){
      ok = true;
      localStorage.setItem("login", user);
    }
  }

  if(ok){
    location.href="top.html";
  }else{
    msg.textContent="トークンが違います";
  }
}
