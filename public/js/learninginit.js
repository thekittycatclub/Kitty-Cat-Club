let searchEngine = localStorage.getItem('searchengine');
const iframeRes = document.getElementById("result");
let savedurl = localStorage.getItem("savedURL");
if (!searchEngine) {
    searchEngine = "https://www.google.com/search?q=";
}

const searchbar = document.getElementById("searchform");
const input = document.querySelector('.searchinput');
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

function isUrl(val = "") {
    return /^http(s?):\/\//.test(val) || (val.includes(".") && val.trim().split(" ")[0].length > 0);
}

document.addEventListener("DOMContentLoaded", function () {
    iframeRes.src = savedurl;
});