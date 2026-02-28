async function save(){

await requireLogin();

const user=document.getElementById("user").value;
const text=document.getElementById("text").value;
const file=document.getElementById("photo").files[0];

const api=
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${DATA_FILE}`;

const res=await fetch(api,{
headers:{Authorization:`token ${TOKEN}`}
});

const json=await res.json();

const content=JSON.parse(
decodeURIComponent(escape(atob(json.content)))
);

let photoData=null;

if(file){
photoData=await new Promise(resolve=>{
const r=new FileReader();
r.onload=()=>resolve(r.result);
r.readAsDataURL(file);
});
}

content.push({
user,
text,
photo:photoData,
time:new Date().toLocaleString()
});

const updated=btoa(
unescape(encodeURIComponent(JSON.stringify(content,null,2)))
);

await fetch(api,{
method:"PUT",
headers:{
Authorization:`token ${TOKEN}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"update data",
content:updated,
sha:json.sha
})
});

alert("保存しました！");
}
