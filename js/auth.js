function requireLogin(){
  if(!localStorage.getItem("login")){
    location.href="index.html";
  }
}

function logout(){
  localStorage.removeItem("login");
  location.href="index.html";
}
