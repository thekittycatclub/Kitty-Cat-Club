const form = document.querySelector('form');
const input = document.querySelector('input');
const searchEngine = document.getElementById("uv-search-engine")
function frameLoad(url) {


    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        document.getElementById("pf").src=__uv$config.prefix + __uv$config.encodeUrl(url);
    });
}
if(form) {
form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = searchEngine + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});
}

