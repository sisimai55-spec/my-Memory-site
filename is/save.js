const API="https://あなたのworker.workers.dev";

async function save(){

  const token=localStorage.getItem("token");

  const fd=new FormData();
  fd.append("user",document.getElementById("user").value);
  fd.append("text",document.getElementById("text").value);

  const file=document.getElementById("photo").files[0];
  if(file) fd.append("photo",file);

  await fetch(API+"/save?token="+token,{
    method:"POST",
    body:fd
  });

  alert("保存したよ！");
}
