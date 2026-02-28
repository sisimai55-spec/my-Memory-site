async function load(){

const api=
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${DATA_FILE}`;

const res=await fetch(api);
const json=await res.json();

const data=JSON.parse(
decodeURIComponent(escape(atob(json.content)))
);

const list=document.getElementById("list");

data.reverse().forEach(d=>{

const div=document.createElement("div");
div.className="card";

div.innerHTML=`
<b>${d.user}</b><br>
${d.time}<br><br>
${d.text||""}
${d.photo?`<img src="${d.photo}">`:""}
`;

list.appendChild(div);

});
}

load();
