const form = document.getElementById('indexform');
const indexsearch = document.getElementById('searchbar');
let searchEngineindex = localStorage.getItem('searchengine');
const iframeResindex = document.getElementById("result");
let savedurlindex = localStorage.getItem("savedURL");
if (!searchEngineindex) {
    searchEngineindex = "https://www.google.com/search?q=";
}
const searchbarindex = document.getElementById("searchform");

if (form) {
    form.addEventListener("submit", async event => {
        event.preventDefault();
        window.navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            
            let url = indexsearch.value.trim();
            if (!isUrl(url)) {
                url = searchEngineindex + url;
            } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
                url = 'http://' + url;
            }
            localStorage.setItem("savedURL", __uv$config.prefix + __uv$config.encodeUrl(url));
            localStorage.setItem("savedinputurlindex", url);
            localStorage.setItem("savedinputurl", "");
            location.replace("/textbook");
        });
    });
} else {
    console.log("no form detected");
}

if (searchbarindex) {
    searchbarindex.addEventListener("submit", async event => {
        event.preventDefault();
        window.navigator.serviceWorker.register('./sw.js', {
            scope: __uv$config.prefix
        }).then(() => {
            let url = indexsearch.value.trim();
            if (!isUrl(url)) {
                url = searchEngineindex + url;
            } else if (!(url.startsWith('https://') || url.startsWith('http://'))) {
                url = 'http://' + url;
            }
            localStorage.setItem("savedURL", __uv$config.prefix + __uv$config.encodeUrl(url));
            localStorage.setItem("savedinputurlindex", url);
            localStorage.setItem("savedinputurl", "");
        });
    });
} else {
    console.log("balls");
}

function openApp(url) {
    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        localStorage.setItem("savedURL", __uv$config.prefix + __uv$config.encodeUrl(url));
        localStorage.setItem("savedinputurlindex", url);
        localStorage.setItem("savedinputurl", "");
        location.replace("/textbook");
    });
}
function openAppTM(url) {
    let url1;
    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        return __uv$config.prefix + __uv$config.encodeUrl(url);
    });
}
function isUrl(val = "") {
    return /^http(s?):\/\//.test(val) || (val.includes(".") && val.trim().split(" ")[0].length > 0);
}

document.addEventListener("DOMContentLoaded", function () {
    if (!iframeResindex) {
        return;
    } else {
        iframeResindex.src = savedurlindex;
        if (!localStorage.getItem("savedinputurl") || localStorage.getItem("savedinputurl") === null || localStorage.getItem("savedinputurl") === "") {
            document.querySelector(".searchinput").src = localStorage.getItem("savedinputurlindex");
        }
        
    }
});
