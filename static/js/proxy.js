let index_form = document.getElementById("uv-form");
let input = document.getElementById("uv-form-input");

let proxy_form = document.getElementById("proxy_uv_form");
let proxy_input = document.getElementById("proxy_uv_input");
let proxy_iframe;
if (proxy_input) {
    proxy_input.value = "Loading. . .";
    proxy_input.readOnly = true;
    setInterval(() => {
        proxy_iframe = document.querySelector(`iframe[class="${pxy.cIframe}"]`);
        proxy_input.readOnly = false;
    }, 250);
}
let proxy_title = document.getElementById("proxyLink");
let proxyImg = document.getElementById("faviconProxy");

let selected_choice = localStorage.getItem("selectedChoice") || "uv";
let search_engine = localStorage.getItem("searchEngine") || "https://www.google.com/search?q=";

function isValidURL(val = "") {
    const startsWithHttp = /^http(s?):\/\/\w+/.test(val);
    const containsDot = /\w+\.\w+/.test(val);
    const isSearchURL = val.startsWith(search_engine);

    return (startsWithHttp && containsDot) || (containsDot && !isSearchURL);
}



const NavigateToProxy = async (type, content, choice = "uv") => {
    let encodedContent;
    let url = content;
    if (!isValidURL(content)) {
        url = search_engine + content;
    } else if (!(content.startsWith('https://') || content.startsWith('http://'))) {
        url = 'http://' + content;
    }

    if (type === "proxy-form") {
        try {
            if (choice === "uv" || choice === "rammerhead" || choice === "scramjet") {
                encodedContent = await chemical.encode(url, {
                    service: choice,
                    autoHttps: true,
                    searchEngine: localStorage.getItem("searchEngine")
                });
                console.log(encodedContent)
                localStorage.setItem("encodedProxyURL", encodedContent);
                proxy_iframe.src = encodedContent;
                document.querySelector(".loading-curtain").classList.add("fade-in");
                proxy_iframe.addEventListener("load", () => {
                    document.querySelector(".loading-curtain").classList.remove("fade-in");
                    document.querySelector(".loading-curtain").classList.add("fade-out");
                })
            }

        } catch (err) {
            alert("There has been an error while registering the ServiceWorker. (Check console for more information.)");
            console.error(err);
        }
    }

    if (type === "form") {
        try {
            if (choice === "uv" || choice === "rammerhead") {
                NavigateToProxy("navigate", url);
            }

        } catch (err) {
            alert("Error occurred.");
            console.error(err);
        }
    }

    if (type === "navigate") {
        localStorage.setItem("requestedURL", content);
        localStorage.setItem("form-add-tab", "yes");
        home.classList.add("fade-out");
        games.classList.add("fade-out");
        apps.classList.add("fade-out");
        navbar.classList.add("fade-out");
        setTimeout(() => {
            home.style.visibility = "hidden";
            apps.style.visibility = "hidden";
            games.style.visibility = "hidden";
            navbar.style.visibility = "hidden";
            location.replace("/~");
        }, 250);
    }
};

const NavigateToGame = async (type, src, choice = "uv") => {
    if (type === "proxy") {
        try {
            if (choice === "uv" || choice === "rammerhead") {
                NavigateToGame("navigate", src);
            }

        } catch (err) {
            alert("Error occurred.");
            console.error(err);
        }
    }
    if (type === "local") {
        NavigateToGame("navigate", src);
    }

    if (type === "navigate") {
        localStorage.setItem("requestedURL", src);
        localStorage.setItem("game-add-tab", "yes")
        home.classList.add("fade-out");
        games.classList.add("fade-out");
        apps.classList.add("fade-out");
        navbar.classList.add("fade-out");
        loadingScreen.classList.add("fade-in");
        setTimeout(() => {
            location.replace("/~");
        }, 100);
    }
};

if (index_form) {
    index_form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Index form submitted:", input.value);
        await NavigateToProxy("form", input.value, selected_choice);
        console.log("NavigateToProxy called with:", input.value, selected_choice);
    });
}

if (proxy_form) {
    proxy_form.addEventListener("submit", async (e) => {
        e.preventDefault();
        await NavigateToProxy("proxy-form", proxy_input.value, selected_choice);
    });
}