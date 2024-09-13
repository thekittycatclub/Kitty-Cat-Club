let hasDeletedTab = 0;
let inputFocus = 0;
let loading = 0;
let chemLoaded = 0;
class Proxy {
    constructor() {
        this.tabsJSON = JSON.parse(localStorage.getItem("tabsJSON")) || [];
        this.cIframe = localStorage.getItem("cIframe") || "";
        this.ctix = localStorage.getItem("ctix") || "";
    }

    initIframeEvents() {
        let monitoredIframe = document.querySelector(`[class="${this.cIframe}"]`)

        let previousSrc = monitoredIframe.src;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'src') {
                    const newSrc = monitoredIframe.src;
                    if (previousSrc !== newSrc) {
                        previousSrc = newSrc;
                        this.showLoadingScreen();
                    }
                }
            });
        });
        observer.observe(monitoredIframe, {
            attributes: true
        });
        monitoredIframe.addEventListener('load', () => {
            this.hideLoadingScreen();
        });
    }

    showLoadingScreen() {
        document.querySelector(".loading-curtain").classList.remove("fade-out");
        document.querySelector(".loading-curtain").classList.add("fade-in");
    }

    hideLoadingScreen() {
        document.querySelector(".loading-curtain").classList.add("fade-out");
        document.querySelector(".loading-curtain").classList.remove("fade-in");
    }

    newIframe(ID) {
        let newFrame = document.createElement("iframe");
        newFrame.setAttribute("class", `${ID}-iframe`);
        newFrame.setAttribute("id", `display-url`);
        document.body.appendChild(newFrame);
    }

    newTab(tab) {
        let nt = document.createElement("div");
        nt.setAttribute("tab-id", tab.id);
        nt.setAttribute("onclick", `pxy.switchTab("${tab.id}")`);
        nt.className = "tab";
        nt.innerHTML = `
            <img src="${tab.img}"/>
            <p>${tab.name}</p>
        `;
        document.querySelector(".tabs-list").appendChild(nt);
    }

    addTab(name = "Loading...", img = "https://www.google.com/s2/favicons?domain=www.example.com&sz=64", url = localStorage.getItem("searchEngine")) {
        let generatedID = this.generateID();
        let newTab = {
            name: name,
            img: img,
            url: url,
            id: generatedID,
            iframe: generatedID + "-iframe"
        }
        this.newIframe(generatedID);
        this.newTab(newTab);
        this.tabsJSON.push(newTab);
        this.cIframe = generatedID + "-iframe";
        this.ctix = generatedID;
        localStorage.setItem("tabsJSON", JSON.stringify(this.tabsJSON));
        this.switchTab(newTab.id);
    }

    async switchTab(ID) {
        document.querySelectorAll("iframe").forEach(frame => {
            frame.style.display = "none";
            if (loading === 1) {
                frame.style.visibility = "hidden";
            }
        });

        document.querySelectorAll(".tab").forEach(t => {
            t.classList.remove("active-tab");
        });

        let tab = this.tabsJSON.find(tab => tab.id === ID)
        let ctab = document.querySelector(`[tab-id="${tab.id}"]`);
        if (ctab) {
            ctab.classList.add("active-tab");
        }

        if (tab) {
            let iframe = document.querySelector(`iframe[class="${tab.iframe}"]`);
            if (iframe) {
                iframe.style.display = "block";
                if (!iframe.src || iframe.src === "") {
                    if (selected_choice === "uv") {
                        iframe.src = await chemical.encode(tab.url, {
                            service: "uv",
                            autoHttps: true,
                            searchEngine: localStorage.getItem("searchEngine")
                        });
                    }
                    if (selected_choice === "scramjet") {
                        iframe.src = await chemical.encode(tab.url, {
                            service: "scramjet",
                            autoHttps: true,
                            searchEngine: localStorage.getItem("searchEngine")
                        });
                    }
                    if (selected_choice === "rammerhead") {
                        iframe.src = await chemical.encode(tab.url, {
                            service: "rammerhead",
                            autoHttps: true,
                            searchEngine: localStorage.getItem("searchEngine")
                        });
                    }
                    this.ctix = tab.id;
                    this.cIframe = tab.iframe;
                    document.querySelector(".loading-curtain").classList.add("fade-in");
                    iframe.addEventListener("load", () => {
                        document.querySelector(".loading-curtain").classList.remove("fade-in");
                        document.querySelector(".loading-curtain").classList.add("fade-out");
                    })
                }
                this.ctix = tab.id;
                this.cIframe = tab.iframe;
            }
        }
    }



    deleteTab(ID) {
        const tabIndex = this.tabsJSON.findIndex(tab => tab.id === ID);
        if (tabIndex !== -1) {
            this.tabsJSON.splice(tabIndex, 1);
            let ctab = document.querySelector(`.tab[tab-id="${ID}"]`);
            if (ctab) {
                ctab.remove();
            }
            let cframe = document.querySelector(`iframe[class="${ID}-iframe"]`);
            if (cframe) {
                cframe.remove();
            }
            localStorage.setItem("tabsJSON", JSON.stringify(this.tabsJSON));
            if (this.tabsJSON.length > 0) {
                let nextTabIndex;

                if (tabIndex < this.tabsJSON.length) {
                    nextTabIndex = tabIndex;
                } else {
                    nextTabIndex = tabIndex - 1;
                }

                this.switchTab(this.tabsJSON[nextTabIndex].id);
            }
            hasDeletedTab = 1;
            setTimeout(() => {
                hasDeletedTab = 0;
            }, 1000);
        }
    }

    refreshTabs() {
        document.querySelector(".tabs-list").innerHTML = "";
        pxy.tabsJSON.forEach(tab => {
            pxy.newTab(tab);
        });
    }

    generateID() {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let id = '';
        for (let i = 0; i < 12; i++) {
            let randomIndex = Math.floor(Math.random() * chars.length);
            id += chars[randomIndex];
        }
        return id;
    }
}

let pxy = new Proxy();
let navbar = document.querySelector(".navigation");
let hasLoaded = 0;
let chemscript = document.querySelector("[data-script-id='chemScript']");
let se_select = document.getElementById("se-select");
let t_select = document.getElementById("t-select");
let wisp_input = document.getElementById("wisp-input");
let context_menu = document.querySelector(".context-menu");
// let px_engine = document.getElementById("px-engine");
let em_select = document.getElementById("emb-select");
let isHidden = 0;

let curtain = document.querySelector(".proxy-curtain");

const settingsPanel = (type) => {
    let settingsPanel = document.getElementById("settings-panel");
    if (type === "show") {
        curtain.style.visibility = "visible";
        curtain.style.opacity = "1";

        settingsPanel.style.transform = "scale(1)";
    }
    if (type === "hide") {
        curtain.style.opacity = "0";
        settingsPanel.style.transform = "scale(0.1)";
        setTimeout(() => {
            curtain.style.visibility = "hidden";
            if (wisp_input.value !== localStorage.getItem("kcc-wisp")) {
                localStorage.setItem("kcc-wisp", wisp_input.value)
                location.reload();
            }
            if (em_select.value !== localStorage.getItem("emSelected")) {
                localStorage.setItem("emSelected", em_select.value);
                if (em_select.value === "ab") {
                    localStorage.setItem("aboutBlankRes", "yes")
                }
                if (em_select.value === "normal") {
                    localStorage.setItem("aboutBlankRes", "no");
                }
                location.reload()
            }
        }, 250);
    }
}

const switchSEengine = (type) => {
    if (type === 'google') {
        localStorage.setItem("searchEngine", "https://www.google.com/search?q=");
    }
    if (type === 'bing') {
        localStorage.setItem("searchEngine", "https://www.bing.com/search?q=");
    }
    if (type === 'yahoo') {
        localStorage.setItem("searchEngine", "https://www.yahoo.com/search?p=");
    }
    if (type === 'duckduckgo') {
        localStorage.setItem("searchEngine", "https://duckduckgo.com/?t=");
    }
    if (type === 'ask') {
        localStorage.setItem("searchEngine", "https://www.ask.com/web?q=");
    }
    if (type === 'yandex') {
        localStorage.setItem("searchEngine", "https://wap.yandex.com/search?text=");
    }
    localStorage.setItem("se-select", type);
    se_select.value = localStorage.getItem("se-select")
}

const abck = () => {
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

const context = (type) => {
    if (type === "show") {
        context_menu.style.visibility = "visible";
        context_menu.style.opacity = 1;
    }
    if (type === "hide") {
        context_menu.style.opacity = 0;
        context_menu.style.visibility = "hidden";
    }
}

function devTools() {
    if (!proxy_iframe) return
    let erudaWindow = proxy_iframe.contentWindow
    let erudaDocument = proxy_iframe.contentDocument

    if (!erudaWindow || !erudaDocument) console.error("The Iframe was not found.")

    if (erudaWindow.eruda?._isInit) {
        erudaWindow.eruda.destroy()
    } else {
        let script = erudaDocument.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/eruda'
        script.onload = function () {
            if (!erudaWindow) return
            erudaWindow.eruda.init();
            erudaWindow.eruda.show();
        }
        erudaDocument.head.appendChild(script);
    }
}

if (chemscript) {
    if (!localStorage.getItem("kcc-transport")) {
        localStorage.setItem("kcc-transport", "libcurl")
    }
    if (!localStorage.getItem("kcc-wisp")) {
        localStorage.setItem("kcc-wisp", `wss://wisp.mercurywork.shop/`);
    }
    chemscript.setAttribute("data-transport", localStorage.getItem("kcc-transport"));
    chemscript.setAttribute("data-wisp", localStorage.getItem("kcc-wisp"));
    wisp_input.value = localStorage.getItem("kcc-wisp")
}

if (!localStorage.getItem("selectedChoice")) {
    localStorage.setItem("selectedChoice", "uv")
}
// else {
//    px_engine.value = localStorage.getItem("uv");
//}

if (!localStorage.getItem("searchEngine")) {
    localStorage.setItem("searchEngine", "https://www.google.com/search?q=");
    localStorage.setItem("se-select", "google");
} else {
    localStorage.setItem("se-select", "google");
    switchSEengine(localStorage.getItem("se-select"));
}
if (!localStorage.getItem("emSelected")) {
    localStorage.setItem("emSelected", "normal")
} else {
    em_select.value = localStorage.getItem("emSelected")
}

function hsnavbar(type) {
    if (type === "show") {
        document.getElementById("show-navbar-btn").style.transform = "scale(0)"
        document.getElementById("show-navbar-btn").style.opacity = "0"
        isHidden = 0;
    }
    if (type === "hide") {
        isHidden = 1;
        document.getElementById("show-navbar-btn").style.transform = "scale(1)"
        document.getElementById("show-navbar-btn").style.opacity = "1"
    }
    context("hide");
}

function toggleFullscreen() {

    if (proxy_iframe.requestFullscreen) {
        proxy_iframe.requestFullscreen();
    } else if (proxy_iframe.mozRequestFullScreen) {
        proxy_iframe.mozRequestFullScreen();
    } else if (proxy_iframe.webkitRequestFullscreen) {
        proxy_iframe.webkitRequestFullscreen();
    } else if (proxy_iframe.msRequestFullscreen) {
        proxy_iframe.msRequestFullscreen();
    }
}

function hstabs() {
    let tabs = document.querySelector(".tabs");
    let showTabsBtn = document.getElementById("show-tabs-btn");
    if (tabs.style.visibility === "visible" || !tabs.style.visibility) {
        tabs.style.visibility = "hidden";
        tabs.style.opacity = 0;
        showTabsBtn.style.transform = "scale(1)";
        showTabsBtn.style.visibility = "visible";
        showTabsBtn.style.opacity = 1;
    }
    else if (tabs.style.visibility === "hidden") {
        showTabsBtn.style.visibility = "hidden";
        showTabsBtn.style.opacity = 0;
        showTabsBtn.style.transform = "scale(0)";
        tabs.style.visibility = "visible";
        tabs.style.opacity = 1;
    }
}

se_select.addEventListener('change', function () {
    if (this.value === 'google') {
        switchSEengine("google")
    }
    if (this.value === 'bing') {
        switchSEengine("bing")
    }
    if (this.value === 'yahoo') {
        switchSEengine("yahoo")
    }
    if (this.value === 'duckduckgo') {
        switchSEengine("duckduckgo")
    }
    if (this.value === 'ask') {
        switchSEengine("ask")
    }
    if (this.value === 'yandex') {
        switchSEengine("yandex")
    }
});
/*
px_engine.addEventListener('change', function () {
    if (this.value === 'uv') {
        localStorage.setItem("selectedChoice", "uv");
    }
    if (this.value === 'scramjet') {
        localStorage.setItem("selectedChoice", "scramjet");
    }
    if (this.value === 'rammerhead') {
        localStorage.setItem("selectedChoice", "rammerhead");
    }
    proxy_iframe.contentWindow.location.reload();
});
*/
t_select.addEventListener('change', function () {
    if (this.value === 'libcurl') {
        localStorage.setItem("kcc-transport", "libcurl");
        chemscript.setAttribute("data-transport", "libcurl")
    }
    if (this.value === 'epoxy') {
        localStorage.setItem("kcc-transport", "epoxy");
        chemscript.setAttribute("data-transport", "epoxy")
    }
    proxy_iframe.contentWindow.location.reload();
});


loading = 1;
document.addEventListener("DOMContentLoaded", async () => {
    window.addEventListener("chemicalLoaded", async function (e) {
        setInterval(async () => {
            document.querySelectorAll("iframe").forEach(cframe => {
                if (document.querySelector("#px-holder")) {
                    if (isHidden === 1) {
                        cframe.style.paddingTop = "0";
                        cframe.style.height = "100%";
                        navbar.style.top = "-100px";
                        navbar.style.display = "none";
                        document.getElementById("show-navbar-btn").style.visibility = "visible";
                    } else {
                        document.getElementById("show-navbar-btn").style.visibility = "hidden";
                        navbar.style.display = "";
                        navbar.style.top = "0px";
                        cframe.style.paddingTop = navbar.offsetHeight + 'px';
                        cframe.style.height = `calc(100% - ${navbar.offsetHeight}px)`;
                    }
                } else {
                    cframe.style.paddingTop = 0;
                    cframe.style.height = "100%";
                }
            });

            let item = pxy.tabsJSON.find(tab => tab.id === pxy.ctix);
            let currentTab = document.querySelector(`[tab-id="${pxy.ctix}"]`);
            let currentFrame = document.querySelector(`[class="${pxy.cIframe}"]`);

            if (!currentFrame) {
                if (hasDeletedTab !== 1 && hasDeletedTab === 0) {
                    pxy.addTab();
                }
                return;
            }

            let currentURL = currentFrame.contentWindow.location.href;
            let decodedURL;

            if (selected_choice === "uv" || selected_choice === "rammerhead" || selected_choice === "scramjet") {
                decodedURL = await chemical.decode(currentURL, {
                    service: selected_choice
                })
            }

            if (item) {
                if (currentTab && currentFrame) {
                    try {
                        let verifyDomain = new URL(`${decodedURL}`).hostname;
                        if (!verifyDomain) {
                            return;
                        } else {
                            item.img = `https://www.google.com/s2/favicons?domain=${verifyDomain}&sz=64`;
                            proxyImg.src = `https://www.google.com/s2/favicons?domain=${verifyDomain}&sz=64`;
                        }
                    } catch (e) {
                        return;
                    }

                    item.name = currentFrame.contentDocument.title;
                    item.url = decodedURL;
                    currentTab.innerHTML = `
                    <img src="${item.img}">
                    <p>${item.name}</p>
                `;
                }
                localStorage.setItem("prevTab", item);
                localStorage.setItem("tabsJSON", JSON.stringify(pxy.tabsJSON));
                if (inputFocus !== 1 && inputFocus === 0) {
                    proxy_input.value = decodedURL;
                }
            } else {
                console.warn("Couldn't find item from tabs JSON. Item: " + item);
            }
            pxy.initIframeEvents();
        }, 250);
        context('hide')
        await pxy.tabsJSON.forEach(tab => {
            pxy.newTab(tab);
            pxy.newIframe(tab.id);
            document.querySelectorAll(".tab").forEach(ctab => {
                if (ctab.getAttribute("tab-id") === tab.id) {
                    ctab.innerHTML = `
                        <img src="${tab.img}">
                        <p>${tab.name}</p>
                    `;
                }
            });
        });
        let addTabFlag = false;

        if (localStorage.getItem("form-add-tab") === "yes" && localStorage.getItem("form-add-tab") !== "no") {
            addTabFlag = true;
            localStorage.setItem("form-add-tab", "no");
        }
        if (localStorage.getItem("game-add-tab") === "yes" && localStorage.getItem("game-add-tab") !== "no") {
            addTabFlag = true;
            localStorage.setItem("game-add-tab", "no");
        }

        if (addTabFlag) {
            setTimeout(() => {
                pxy.addTab(
                    "Loading...",
                    "https://www.google.com/s2/favicons?domain=www.example.com&sz=64",
                    localStorage.getItem("requestedURL")
                );
            }, 500);
        }
        
        setTimeout(() => {
            pxy.switchTab(pxy.ctix);
            if (!localStorage.getItem("aboutBlankRes")) {
                localStorage.setItem("aboutBlankRes", "no");
            }
            if (localStorage.getItem("aboutBlankRes") === "yes" && localStorage.getItem("aboutBlankRes") !== "no") {
                abck();
            }
            proxy_iframe.addEventListener("load", () => {
                document.querySelectorAll("iframe").forEach(asjdhakjsdh => {
                    asjdhakjsdh.style.visibility = "visible";
                    document.querySelector(".loading-curtain").style.zIndex = "90";
                    document.querySelector("#px-holder").removeAttribute("class");
                    document.querySelector(".navigation").style.visibility = "visible";
                    document.querySelector(".tabs").style.visibility = "visible";
                })
            })
            pxy.initIframeEvents();
            loading = 0;
            chemLoaded = 1;
        }, 750);
    });
    window.addEventListener("beforeunload", () => {
        localStorage.setItem("ctix", pxy.ctix);
        localStorage.setItem("cIframe", pxy.cIframe);
    });
});
