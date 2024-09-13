const form = document.getElementById("uv-form");
const home = document.querySelector(".home");
const games = document.querySelector(".games");
const apps = document.querySelector(".apps");
const settings = document.querySelector(".settings");
const navbar = document.querySelector(".nav-bar");
const loadingScreen = document.getElementById("loading-screen");

const previousPage = localStorage.getItem("prevPage") || "home";

home.style.opacity = 0;
home.style.visibility = "hidden";
home.style.display = "none";
games.style.opacity = 0;
games.style.visibility = "hidden";
games.style.display = "none";
apps.style.opacity = 0;
apps.style.visibility = "hidden";
apps.style.display = "none";
settings.style.opacity = 0;
settings.style.visibility = "hidden";
settings.style.display = "none";

let holder = document.querySelector(".holder");

holder.style.visibility = "hidden";
holder.style.opacity = 0;
holder.style.transition = "0.5s ease";

const switchPage = (p) => {
    if (p === "home") {
        home.style.display = "";
        home.style.visibility = "visible";
        home.style.opacity = 1;
        games.style.opacity = 0;
        games.style.visibility = "hidden";
        apps.style.opacity = 0;
        apps.style.visibility = "hidden";
        settings.style.opacity = 0;
        settings.style.visibility = "hidden";

        localStorage.setItem("prevPage", "home");

        setTimeout(() => {
            apps.style.display = "none";
            games.style.display = "none";
            settings.style.display = "none";
        }, 250);
    }
    if (p === "games") {
        games.style.display = "";
        games.style.visibility = "visible";
        games.style.opacity = 1;
        home.style.opacity = 0;
        home.style.visibility = "hidden";
        apps.style.opacity = 0;
        apps.style.visibility = "hidden";
        settings.style.opacity = 0;
        settings.style.visibility = "hidden";
        localStorage.setItem("prevPage", "games");
        setTimeout(() => {
            apps.style.display = "none";
            home.style.display = "none";
            settings.style.display = "none";
        }, 250);
    }
    if (p === "apps") {
        apps.style.display = "";
        apps.style.visibility = "visible";
        apps.style.opacity = 1;
        games.style.opacity = 0;
        games.style.visibility = "hidden";
        home.style.opacity = 0;
        home.style.visibility = "hidden";
        settings.style.opacity = 0;
        settings.style.visibility = "hidden";

        localStorage.setItem("prevPage", "apps");

        setTimeout(() => {
            games.style.display = "none";
            home.style.display = "none";
            settings.style.display = "none";
        }, 250);
    }
    if (p === "settings") {
        settings.style.display = "";
        settings.style.visibility = "visible";
        settings.style.opacity = 1;
        games.style.opacity = 0;
        games.style.visibility = "hidden";
        home.style.opacity = 0;
        home.style.visibility = "hidden";
        apps.style.opacity = 0;
        apps.style.visibility = "hidden";

        localStorage.setItem("prevPage", "settings");

        setTimeout(() => {
            games.style.display = "none";
            home.style.display = "none";
            apps.style.display = "none";
        }, 250);
    }
}

const notify = (type, content) => {
    let notification = document.createElement("div");
    notification.className = "notification";
    notification.style.transform = "scale(0.1)";
    let audio = document.createElement("audio");
    let audio_source = document.createElement("source");
    audio_source.setAttribute("type", "audio/mpeg");
    if (type == "warn") {
        notification.style.backgroundColor = "var(--warning_yellow)";
        notification.style.border = "2px solid var(--warning_yellow_outline)";
        audio_source.src = "./audio/warning.mp3";
    } else if (type == "error") {
        notification.style.backgroundColor = "var(--error_red)";
        notification.style.border = "2px solid var(--error_red_outline)";
        audio_source.src = "./audio/error.mp3";
    } else if (type == "normal") {
        notification.style.backgroundColor = "var(--normal)";
        notification.style.border = "2px solid var(--normal_outline)";
        audio_source.src = "./audio/notification.mp3";
    }
    audio.appendChild(audio_source);
    notification.appendChild(audio);
    let notifContent = document.createElement("p");
    notifContent.innerHTML = content;
    notification.appendChild(notifContent);
    document.querySelector(".notif-div").appendChild(notification);
    notification.style.transition = "0.25s ease";
    notification.style.visibility = "visible";
    setTimeout(() => {
        notification.style.transform = "scale(1)";
        setTimeout(() => {
            notification.style.opacity = "1";
            audio.play();
            setTimeout(() => {
                notification.style.transform = "scale(0.1)";
                notification.style.opacity = "0";
                setTimeout(() => {
                    notification.style.visibility = "hidden";
                    document.querySelector(".notif-div").removeChild(notification);
                }, 250);
            }, 2000);
        }, 1);
    }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
    let sentences = [
        "Search or type a URL...",
        "discord.gg/kittycatclub",
        "A1RG3MM was here :eyespoppingout:",
        "KCC on top!",
        "4 developers, 1 proxy.",
        "AI coming soon...",
        "hello there",
        "skibidi skibidi",
        "Do not be a beta, be a sigma.",
        "Now with Ultraviolet V3 Support!",
        "Join our discord if you need help with stuff.",
        "KCC V2 finally out after a while!",
    ];
    let placeholder = document.getElementById("uv-form-input");
    let index = Math.floor(Math.random() * sentences.length);
    placeholder.placeholder = sentences[index];
    switchPage(previousPage);
    setTimeout(() => {
        holder.style.visibility = "visible";
        holder.style.opacity = 1;  
    }, 500);
});
