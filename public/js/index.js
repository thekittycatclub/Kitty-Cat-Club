const form = document.querySelector('form');
const input = document.querySelector('input');
let searchEngine = localStorage.getItem('searchengine');
const iframeRes = document.getElementById("result");
let savedurl = localStorage.getItem("savedURL");
if (!searchEngine) {
    searchEngine = "https://www.google.com/search?q=";
}

const searchbar = document.getElementById("searchform");

function frameLoad(url) {
    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        document.getElementById("pf").src = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
}

if (form) {
    form.addEventListener("submit", async event => {
        event.preventDefault();
        window.navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            location.href = "/textbook";
            let url = input.value.trim();
            if (!isUrl(url)) {
                url = searchEngine + url;
            } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
                url = 'http://' + url;
            }
            localStorage.setItem("savedURL", __uv$config.prefix + __uv$config.encodeUrl(url));

        });
    });
} else {
    console.log("no form detected");
}

if (searchbar) {
    searchbar.addEventListener("submit", async event => {
        event.preventDefault();
        window.navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            let url = input.value.trim();
            if (!isUrl(url)) {
                url = searchEngine + url;
            } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
                url = 'http://' + url;
            }
            localStorage.setItem("savedURL", __uv$config.prefix + __uv$config.encodeUrl(url));
            location.reload();

        });
    });
} else {
    console.log("balls");
}

function openApp(url) {
    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        location.href = "/textbook"
        localStorage.setItem("savedURL", __uv$config.prefix + __uv$config.encodeUrl(url));
    });
}

function PageCloakFunction() {
    var win = window.open();
    var url = document.getElementById("pagecloak").value;
    var iframe = win.document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.top = "0";
    iframe.style.bottom = "0";
    iframe.style.left = "0";
    iframe.style.right = "0";
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    iframe.style.overflow = "hidden";

    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        if (url.includes("https://") || url.includes("http://")) {
            iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            win.document.body.appendChild(iframe);
        } else {
            url = "https://" + url;
            iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            win.document.body.appendChild(iframe);
        }
    });
}

function isUrl(val = "") {
    return /^http(s?):\/\//.test(val) || (val.includes(".") && val.trim().split(" ")[0].length > 0);
}

document.addEventListener("DOMContentLoaded", function () {
    iframeRes.src = savedurl;
});