function requireLogin(){
 if(!localStorage.token){
   location.href="index.html";
 }
}
