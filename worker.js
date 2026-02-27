export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    let tokens = await env.TOKENS.get("list");
    tokens = tokens ? JSON.parse(tokens) : [];

    // ===== チェック =====
    if (url.pathname === "/check") {
      if (tokens.includes(token)) {
        return new Response("✅ ログイン成功");
      }
      return new Response("❌ トークンエラー");
    }

    // ===== 追加 =====
    if (url.pathname === "/add") {
      if (!tokens.includes(token)) {
        tokens.push(token);
        await env.TOKENS.put("list", JSON.stringify(tokens));
      }
      return new Response("追加OK");
    }

    // ===== 削除 =====
    if (url.pathname === "/delete") {
      tokens = tokens.filter(t => t !== token);
      await env.TOKENS.put("list", JSON.stringify(tokens));
      return new Response("削除OK");
    }

    return new Response("Worker running");
  }
};
