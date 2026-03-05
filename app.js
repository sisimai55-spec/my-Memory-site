async function post(){

const text=document.getElementById("text").value
const img=document.getElementById("image").files[0]

const now=new Date()

const date=now.toISOString().split("T")[0]
const time=now.toTimeString().split(" ")[0]

const zip=new JSZip()

zip.file("text.txt",text)

zip.file("info.json",JSON.stringify({
user:localStorage.user,
date:date,
time:time
}))

zip.file("likes.json",JSON.stringify({
count:0,
users:[]
}))

if(img){

const buffer=await img.arrayBuffer()

zip.file("image.jpg",buffer)

}

const base64=await zip.generateAsync({type:"base64"})

await fetch("/save",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
zip:base64
})
})

alert("投稿完了")
}
