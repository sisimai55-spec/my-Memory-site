async function load(){

 const res=await fetch(API_URL+"/api/posts");
 const posts=await res.json();

 const area=document.getElementById("posts");

 posts.reverse().forEach(p=>{
   area.innerHTML+=`
   <div class="container">
   <b>${p.user}</b><br>
   ${p.text}
   </div>`;
 });
}

load();
