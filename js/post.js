async function post(){

 const text=document.getElementById("text").value;

 await fetch(API_URL+"/api/post",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   user:localStorage.username,
   token:localStorage.token,
   text:text
  })
 });

 alert("保存した！");
}
