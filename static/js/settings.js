let advanced_cloak = localStorage.getItem("advCloak") || "false";
let tab_prev = localStorage.getItem("tabPrev") || "false";
let customTab = document.getElementById("tab-input");
let customFavicon = document.getElementById("favicon-input");

const aboutBlank = () => {
    let win = window.open();
    let favicon = document.createElement("link");
    let a = document.createElement("iframe");
    favicon.rel = "shortcut icon";
    favicon.type = "image/x-icon";
    favicon.href = document.getElementById("favicon").href;
    a.style.position = "fixed";
    a.style.top = a.style.bottom = a.style.left = a.style.right = 0;
    a.style.border = "none";
    a.style.margin = 0;
    a.style.padding = 0;
    a.style.width = "100%";
    a.style.height = "100%";
    a.src = window.location.href;
    win.document.head.appendChild(favicon);
    win.document.body.appendChild(a);
    win.document.title = document.title;
    location.replace("https://www.google.com");
}

const webCloak = (site) => {
    if (site) {
        if (isValidURL(site)) {
            let win = window.open();
            let favicon = document.createElement("link");
            let a = document.createElement("iframe");
            favicon.rel = "shortcut icon";
            favicon.type = "image/x-icon";
            favicon.href = document.getElementById("favicon").href;
            a.style.position = "fixed";
            a.style.top = a.style.bottom = a.style.left = a.style.right = 0;
            a.style.border = "none";
            a.style.margin = 0;
            a.style.padding = 0;
            a.style.width = "100%";
            a.style.height = "100%";
            if (selected_choice === "uv") {
                a.src = __uv$config.prefix + __uv$config.encodeUrl(site);
            }
            if (selected_choice === "scramjet") {
                a.src = __scramjet$config.prefix + __scramjet$config.codec.encode(site);
            }
            win.document.head.appendChild(favicon);
            win.document.body.appendChild(a);
            win.document.title = document.title;
        } else {
            notify("error", "The given URL is an invalid URL.");
        }
    } else {
        notify("warn", "Your input cannot be blank!");
    }
}

const tabCloak = (ck_type) => {
    let favicon = document.getElementById("favicon");
    if (ck_type === "Google") {
        document.title = "Google";
        favicon.href = "./img/google.png";
    }
    if (ck_type === "Classroom") {
        document.title = "Home";
        favicon.href = "./img/Google_Classroom.png"
    }
    if (ck_type === "Docs") {
        document.title = "Google Docs";
        favicon.href = "./img/google_docs.ico"
    }
    if (ck_type === "KA") {
        document.title = "Khan Academy";
        favicon.href = "./img/ka.png"
    }
    if (ck_type === "Canvas") {
        document.title = "Dashboard";
        favicon.href = "./img/instructure.ico"
    }
    localStorage.setItem("customTabName", document.title);
    localStorage.setItem("customFavicon", favicon.href);
}

const changeBG = (input) => {
    let body = document.querySelector("body");
    let bgSelection = document.getElementById('bg-selection');
    if (input.value) {
        if (isValidURL(input.value)) {
            body.style.backgroundImage = `url("${input.value}")`;
            localStorage.setItem("customBG", document.body.style.backgroundImage);
            bgSelection.value = "none";
        } else {
            notify("error", "The Given URL is an invalid URL.");
        }
    } else {
        body.style.backgroundImage = "";
        bgSelection.value = "none";
    }
}


const tabPrev = (btn) => {
    if (tab_prev === "false") {
        localStorage.setItem("tabPrev", "true");
        btn.innerHTML = "Disable Prevention";
        tab_prev = "true";
        console.log(tab_prev)
    } else {
        if (tab_prev === "true") {
            localStorage.setItem("tabPrev", "false");
            btn.innerHTML = "Enable Prevention";
            tab_prev = "false";
            console.log(tab_prev)
        }
    }
}

const setNavbarOrion = (type) => {
    let horizontalNav = document.querySelector(".nav-bar-horz");
    navbar.style.display = "none";
    horizontalNav.style.display = "none";
    navbar.style.left = "auto";
    navbar.style.right = "auto";
    home.style.alignItems = games.style.alignItems = apps.style.alignItems = settings.style.alignItems = "";
    home.style.left = games.style.left = apps.style.left = settings.style.left = "25vw";
    home.style.transform = games.style.transform = apps.style.transform = settings.style.transform = "none";
    home.style.marginTop = games.style.marginTop = apps.style.marginTop = settings.style.marginTop = "auto";
    home.style.width = games.style.width = apps.style.width = settings.style.width = "75vw"
    home.style.transform = games.style.transform = apps.style.transform = settings.style.transform = "";
    if (type === "right") {
        localStorage.setItem("navbarType", "right");
        navbar.style.right = "10px";
        navbar.style.display = "";
        home.style.transform = games.style.transform = apps.style.transform = settings.style.transform = "translateX(-25vw)";
    }
    if (type === "left") {
        localStorage.setItem("navbarType", "left");
        navbar.style.left = "10px";
        navbar.style.display = "";
        home.style.transform = games.style.transform = apps.style.transform = settings.style.transform = "25vw";
    }
    if (type === "top") {
        localStorage.setItem("navbarType", "top");
        horizontalNav.style.display = "";
        home.style.alignItems = games.style.alignItems = apps.style.alignItems = settings.style.alignItems = "";
        home.style.left = games.style.left = apps.style.left = settings.style.left = "50%";
        home.style.transform = games.style.transform = apps.style.transform = settings.style.transform = "translateX(-50%)";
        settings.style.marginTop = "5em";
        games.style.marginTop = apps.style.marginTop = "10em";
        home.style.width = "100vw";
        games.style.width = apps.style.width = settings.style.width = "95vw";
    }
}


function saveCustomTab() {

    if (!(customTab.value && customFavicon.value)) {
        notify("warn", "One or both inputs are blank!")
    } else {
        if (!isValidURL(customFavicon.value)) {
            notify("error", "The favicon URL isn't a valid URL.")
        } else {
            document.title = customTab.value;
            favicon.href = customTab.value;
            localStorage.setItem("customTabName", customTab.value);
            localStorage.setItem("customFavicon", customFavicon.value);

            document.getElementById("custom-tab-cloaking").style.transform = "scale(0.1)";
            document.querySelector(".curtain").style.opacity = 0;
            setTimeout(() => {
                document.querySelector(".curtain").style.visibility = "hidden";
            }, 250);
        }
    }
}

function cancelTabChanges() {
    customTab.value = "";
    customFavicon.value = "";
    document.getElementById("custom-tab-cloaking").style.transform = "scale(0.1)";
    document.querySelector(".curtain").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".curtain").style.visibility = "hidden";
    }, 250);
}

function showTabPanel() {
    customTab.value = localStorage.getItem("customTabName");
    customFavicon.value = localStorage.getItem("customFavicon");
    document.querySelector(".curtain").style.visibility = "visible";
    document.querySelector(".curtain").style.opacity = 1;
    document.getElementById("custom-tab-cloaking").style.display = "";
    document.getElementById("custom-game-panel").style.display = "none";
    document.getElementById("panic-key-system").style.display = "none";
    document.getElementById("custom-tab-cloaking").style.transform = "scale(1)";
}

function resetTabFavicon() {
    document.title = "Kitty Cat Club";
    favicon.href = "./img/logo.png";
    localStorage.setItem("customTabName", document.title);
    localStorage.setItem("customFavicon", favicon.href);
    document.getElementById("custom-tab-cloaking").style.transform = "scale(0.1)";
    document.querySelector(".curtain").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".curtain").style.visibility = "hidden";
    }, 250);
}


document.addEventListener("DOMContentLoaded", () => {
    if (advanced_cloak === "true") {
        document.getElementById("advCloak-btn").innerHTML = "Toggle Off";
        aboutBlank();
    }
    if (tab_prev === "true") {
        document.getElementById("prev-p").innerHTML = "Disable Prevention";
    }
    if (localStorage.getItem("customBG")) {
        document.body.style.backgroundImage = localStorage.getItem("customBG");
        if (document.body.style.backgroundImage.includes("Untitled_design_15.png")) {
            document.getElementById('bg-selection').value = 'KCC Background';
        }
    }
    if (localStorage.getItem("customTabName") && localStorage.getItem("customFavicon")) {
        document.title = localStorage.getItem("customTabName");
        document.getElementById("favicon").href = localStorage.getItem("customFavicon");
    }

    if (!localStorage.getItem("navbarType") || localStorage.getItem("navbarType") === "left") {
        document.getElementById('nav-bar-selection').value = "nav-left";
        setNavbarOrion("left");
    }
    if (localStorage.getItem("navbarType") === "right") {
        document.getElementById('nav-bar-selection').value = "nav-right";
        setNavbarOrion("right");
    }
    if (localStorage.getItem("navbarType") === "top") {
        document.getElementById('nav-bar-selection').value = "nav-top";
        setNavbarOrion("top");
    }
})

document.getElementById('bg-selection').addEventListener('change', function () {
    if (this.value === 'KCC Background') {
        document.body.style.backgroundImage = 'url("https://media.discordapp.net/attachments/1196299394232885298/1272325401275924511/Untitled_design_15.png?ex=66cd05de&is=66cbb45e&hm=734de7d4bcd8ede81efb65fc3866c6c7ac52028dd1db5d7840f1f3ab264419fb&=&format=webp&quality=lossless&width=1595&height=897")';
        document.body.style.backgroundSize = 'cover';
    }
    if (this.value === 'none') {
        document.body.style.backgroundImage = '';
    }
    localStorage.setItem("customBG", document.body.style.backgroundImage);
});

document.getElementById('nav-bar-selection').addEventListener('change', function () {
    if (this.value === 'nav-right') {
        setNavbarOrion("right");
    }
    if (this.value === 'nav-left') {
        setNavbarOrion("left");
    }
    if (this.value === 'nav-top') {
        setNavbarOrion("top");
    }
    localStorage.setItem("customBG", document.body.style.backgroundImage);
});




document.getElementById("advCloak-btn").addEventListener("click", () => {
    if (advanced_cloak === "false") {
        localStorage.setItem('advCloak', 'true');
        aboutBlank();
    }
    if (advanced_cloak === "true") {
        localStorage.setItem('advCloak', 'false');
        alert("Successfully stopped advanced cloaking! You may need to head back to the original site.");
        location.replace("https://google.com")
    }
});

window.addEventListener("beforeunload", function (event) {
    if (localStorage.getItem("tabPrev") === "true") {
        event.returnValue = false;
        return false;
    }
});