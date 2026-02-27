const API = "https://calm-dawn-dfef.sisimai55.workers.dev/";

async function login() {
    const token = document.getElementById("token").value;

    const res = await fetch(API + "/check?token=" + token);
    const data = await res.text();

    document.getElementById("result").innerText = data;
}

async function addToken() {
    const token = document.getElementById("newToken").value;

    const res = await fetch(API + "/add?token=" + token);
    const data = await res.text();

    document.getElementById("adminResult").innerText = data;
}

async function deleteToken() {
    const token = document.getElementById("deleteToken").value;

    const res = await fetch(API + "/delete?token=" + token);
    const data = await res.text();

    document.getElementById("adminResult").innerText = data;
}
