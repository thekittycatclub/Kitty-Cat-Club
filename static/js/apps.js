let appsJSON = [
    {
        title: "Youtube",
        type: "proxy",
        img: "./img/gxmes/youtube.png",
        src: "https://youtube.com"
    },
    {
        title: "Discord",
        type: "proxy",
        img: "./img/gxmes/discord.jpg",
        src: "https://discord.com/app"
    },
    {
        title: "Tiktok",
        type: "proxy",
        img: "./img/gxmes/Tiktok.png",
        src: "https://tiktok.com"
    },
    {
        title: "X (Twitter)",
        type: "proxy",
        img: "./img/gxmes/twitter.png",
        src: "https:///twitter.com"
    },
    {
        title: "Netflix",
        type: "proxy",
        img: "./img/gxmes/netflix.png",
        src: "https://netflix.com"
    },
    {
        title: "Instagram",
        type: "proxy",
        img: "./img/gxmes/insta.png",
        src: "https://instagram.com"
    },
    {
        title: "Geforce NOW",
        type: "proxy",
        img: "./img/gxmes/gfnow.png",
        src: "https://nvidia.com/en-us/geforce-now/"
    },
    {
        title: "Android OS",
        type: "proxy",
        img: "./img/gxmes/OS_Android.webp",
        src: "https://now.gg/play/uncube/10005/now"
    },
    {
        title: "Crazy Games",
        type: "proxy",
        img: "./img/gxmes/crazygames.png",
        src: "https://crazygames.com"
    },
    {
        title: "Poki",
        type: "proxy",
        img: "./img/gxmes/poki.png",
        src: "https://poki.com"
    },
    {
        title: "Github",
        type: "proxy",
        img: "./img/gxmes/github.jpg",
        src: "https://github.com"
    },
    {
        title: "Visual Studio Code",
        type: "proxy",
        img: "./img/gxmes/vsc.png",
        src: "https://vscode.dev"
    },
];

function appendAppToList(g) {
    let button = document.createElement("button");
    button.className = "card";
    button.setAttribute("onclick", `NavigateToGame('${g.type}', '${g.src}', '${selectedProxyEngine}')`);
    button.innerHTML = `
        <img src="${g.img}" alt="${g.title}"/>
        <p class="card-title">${g.title}</p>
    `;
    document.querySelector(".apps-list").appendChild(button);
}

document.addEventListener("DOMContentLoaded", () => {
    appsJSON.forEach(app => {
        appendAppToList(app);
    });
});

function filterApps(searchTerm) {
    const appsList = document.querySelector(".apps-list");
    appsList.innerHTML = ""; 
    appsJSON
        .filter(app => app.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .forEach(app => {
            appendAppToList(app);
        });
}

document.getElementById("apps-search").addEventListener("input", (e) => {
    filterApps(e.target.value);
});

