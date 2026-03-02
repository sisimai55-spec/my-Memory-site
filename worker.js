export default {
 async fetch(req, env) {

  const url=new URL(req.url);

  const owner="あなたのGitHubユーザー名";
  const repo="my-Memory-site";
  const path="data/posts.json";

  // 投稿取得
  if(url.pathname==="/api/posts"){

   const r=await fetch(
`https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`
   );

   return new Response(await r.text(),{
    headers:{"Content-Type":"application/json"}
   });
  }

  // 投稿保存
  if(url.pathname==="/api/post"){

   const body=await req.json();

   const tokens=await fetch(
`https://raw.githubusercontent.com/${owner}/${repo}/main/data/tokens.json`
   ).then(r=>r.json());

   if(!tokens.tokens.includes(body.token))
     return new Response("Forbidden",{status:403});

   const file=await fetch(
`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
{
 headers:{
  Authorization:`Bearer ${env.GITHUB_TOKEN}`,
  "User-Agent":"cf"
 }
}).then(r=>r.json());

   const posts=JSON.parse(atob(file.content));

   posts.push({
    user:body.user,
    text:body.text,
    time:Date.now()
   });

   await fetch(
`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
{
 method:"PUT",
 headers:{
  Authorization:`Bearer ${env.GITHUB_TOKEN}`,
  "Content-Type":"application/json"
 },
 body:JSON.stringify({
  message:`post ${Date.now()}`,
  content:btoa(JSON.stringify(posts,null,2)),
  sha:file.sha
 })
});

   return new Response("saved");
  }

  return new Response("OK");
 }
}
