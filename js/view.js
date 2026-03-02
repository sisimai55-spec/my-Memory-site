fetch("posts.json")
.then(r=>r.json())
.then(data=>{

  const area=document.getElementById("posts");

  data.reverse().forEach(p=>{

    const div=document.createElement("div");

    div.innerHTML =
      "<b>"+p.user+"</b><br>"
      +p.text+"<br>"
      +(p.image ?
        `<img src="${p.image}" width="200">`
        :"");

    area.appendChild(div);
  });

});
