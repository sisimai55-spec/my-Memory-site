export default {
  async fetch(request) {
    return new Response("Hello from Worker!", {
      headers: { "content-type": "text/plain" }
    });
  }
};
