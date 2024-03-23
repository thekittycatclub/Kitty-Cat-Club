////Variables////
let iframe = document.getElementById("result");
let devtools = document.getElementById("devtools");
let proxyurl = document.getElementById("proxyurl");
let proxybtn = document.getElementById("proxybtn");
let pageSrc = iframe.src;
let navigation_bar = document.querySelector(".mainbtns");
let showorhideui = document.querySelector(".dropdown");
let notification = document.querySelector(".notification");
let hideuibtn = document.getElementById("hideui");
//temp variables
let isHidden = 0;
let varhidenav = "false";
let btnhidenav = "false";
let aboutblankcloak;
////Load saved data////
let newLoader = localStorage.getItem("loader");
let hideNavbar = localStorage.getItem("hidenavbar");
let savedlinkurl = localStorage.getItem("savedURL");
let devtoolsVal = localStorage.getItem("devtoolsval");
let proxyURLVal = localStorage.getItem("proxyurlval");
if (newLoader) {
  iframe.style.background = `url('${newLoader}}')`;
}
if (devtoolsVal === "true") {
  devtools.style.display = "";
}
if (devtoolsVal === "false") {
  devtools.style.display = "none";
}

if (proxyURLVal === "true") {
  proxyurl.style.visibility = "visible";
  proxybtn.innerHTML = "Hide encoded URL";
}
if (proxyURLVal === "false") {
  proxyurl.style.visibility = "hidden";
  proxybtn.innerHTML = "Show encoded URL";
}
if (hideNavbar == "false") {
  searchshow();
} else if (hideNavbar == "true") {
  document.getElementById("hideuibtn").innerHTML = "Show navbar";
}
if (!hideNavbar) {
  localStorage.setItem("hidenavbar", 'false');
}

////Functions////
//Tool functions

function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

function CopyLink(classorid) {
  let copything;
  if (classorid.includes(".")) {
    copything = document.querySelector(classorid);
  } else {
    copything = document.getElementById(classorid);
  }
  copything.select();
  document.execCommand("copy");
  copything.setSelectionRange(0, 0);
  notify("Link Copied!", "Your link has been copied to the clipboard!");
}

function notify(title, content) {
  let notifTitle = document.querySelector(".title");
  let notifContent = document.querySelector(".content");
  notification.style.visibility = "visible";
  notification.style.transition = "0.2s";
  notification.style.opacity = "1";
  notifTitle.innerHTML = title;
  notifContent.innerHTML = content;
  delay(2000).then(() => {
    notification.style.opacity = "0";
    notification.style.visibility = "hidden";
  });
}

function foreverloop() {
  setTimeout(function () {
    proxyurl.value = iframe.contentWindow.location.href;
    proxyurl.value = proxyurl.value.replace("/learning", "");
    localStorage.setItem("savedURL", iframe.contentWindow.location.href);
    foreverloop();
  }, 500);
}
foreverloop();


//UI functions
function togglenavbar() {
  if (hideNavbar == 'true') {
    localStorage.setItem("hidenavbar", "false");
    varhidenav = "false";
    showui();
    location.reload();
  } else {
    localStorage.setItem("hidenavbar", "true");
    varhidenav = "true";
    location.reload();
  }
}

function hideui() {
  let searchbar = document.querySelector(".searchbar");
  let searchinput = document.querySelector(".searchinput");
  if (hideNavbar == 'true') {
    if (searchbar.style.top !== "75px") {
      navigation_bar.style.top = "-65px";
      searchbar.style.top = "-65px";
      searchbar.style.transition = "0.5s";
      searchinput.style.width = "1em";
      isHidden = 1;
    }
  }
}

function buttonhideui() {
  let searchinput = document.querySelector(".searchinput");
  let searchbar = document.querySelector(".searchbar");
  navigation_bar.style.top = "-65px";
  searchbar.style.top = "-65px";
  searchbar.style.transition = "0.5s";
  searchinput.style.width = "1em";
  delay(500).then(() => {
    btnhidenav = "true";
  });
}

function detecthiddenui() {
  let searchbar = document.querySelector(".searchbar");
  if (isHidden == 1) {
    isHidden = 0;
    navigation_bar.style.top = "0px";
  }
  if (btnhidenav == "true") {
    navigation_bar.style.top = "7px";
    searchbar.style.top = "20px";
    btnhidenav = "false"
  }
}

function hideshowhiddenui() {
  showorhideui.style.opacity = "1";
  showorhideui.style.top = "-40px";
  showorhideui.style.visibility = "hidden";
}

function showui() {
  isHidden = 0;
  let searchbar = document.querySelector(".searchbar");
  navigation_bar.style.top = "7px";
  navigation_bar.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.5)";
  searchbar.style.top = "20px";
  searchbar.style.transition = "0.5s";
}

//Button functions

function searchshow() {
  let searchbar = document.querySelector(".searchbar");
  let searchinput = document.querySelector(".searchinput");
  if (hideNavbar == "true"){
    if (searchbar.style.top === "-65px") {
      searchbar.style.transition = "0.3s";
      searchbar.style.top = "75px";
      searchinput.style.width = "20em";
    } else {
      searchbar.style.transition = "0.3s";
      searchbar.style.top = "-65px";
      searchinput.style.width = "1em";
    }
  }
  if (hideNavbar == "false") {
    if (searchbar.style.top === "20px") {
      searchbar.style.transition = "0.3s";
      searchbar.style.top = "90px";
      searchinput.style.width = "20em";
    } else {
      searchbar.style.transition = "0.3s";
      searchbar.style.top = "20px";
      searchinput.style.width = "1em";
    }
  }
}


function reloadPX() {
  iframe.contentWindow.location.reload(true);
}

function backPX() {
  iframe.contentWindow.history.go(-1);
}

function forwardPX() {
  iframe.contentWindow.history.go(1);
}

function fullscreen() {
  var doc = iframe.ownerDocument;
  var docEl = doc.documentElement;

  if (docEl.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (docEl.mozRequestFullScreen) {
    iframe.mozRequestFullScreen();
  } else if (docEl.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (docEl.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  } else {
    alert("Your browser doesn't support fullscreening.");
  }
}

function showsettings() {
  let settingspanel = document.querySelector(".settingspanel");
  if (settingspanel.style.visibility === "visible") {
    settingspanel.style.transition = "0.3s";
    settingspanel.style.opacity = "0";
    settingspanel.style.visibility = "hidden";
  } else {
    settingspanel.style.transition = "0.3s";
    settingspanel.style.opacity = "1";
    settingspanel.style.visibility = "visible";
  }
}


function showorhidedevtools() {
  if (devtools.style.display === "") {
    devtools.style.display = "none";
    localStorage.setItem("devtoolsval", 'false');
  } else {
    devtools.style.display = "";
    localStorage.setItem("devtoolsval", 'true');
  }
}

function devTools() {
  if (!iframe) return
  let erudaWindow = iframe.contentWindow
  let erudaDocument = iframe.contentDocument

  if (!erudaWindow || !erudaDocument) return

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


function proxyURL() {
  if (proxyurl.style.visibility === "visible") {
    proxyurl.style.visibility = "hidden";
    proxybtn.innerHTML = "Show encoded URL";
    localStorage.setItem("proxyurlval", 'false');
  } else {
    proxyurl.style.visibility = "visible";
    proxybtn.innerHTML = "Hide encoded URL";
    localStorage.setItem("proxyurlval", 'true');
  }
}


function changeloader() {
  var iframe = document.getElementById("result");
  
  let input = document.getElementById("loaderinput");
  localStorage.getItem("loader");
  if (!input.value) {
    alert("Removed Background Image!");
    iframe.style.backgroundImage = "none";
    iframe.style.background = "#000";
    localStorage.setItem("loader", "");
  } else {
    if (!input.value.includes("https://")) {
      alert("Make sure you include https:// first!");
    } else {
      iframe.style.backgroundImage = `url('${input.value}')`;
      iframe.style.backgroundSize = "cover";
      iframe.style.backgroundRepeat = "no-repeat";
      localStorage.setItem("loader", input.value);
      alert("Changes have been saved!");
    }
  }
}

function aboutBlank() {
      let win = window.open();
      let url = window.location.href;
      let popoutIframe = win.document.createElement("iframe");
      let faviconLink = win.document.createElement('link');
      popoutIframe.style.position = "fixed";
      popoutIframe.style.width = "100%";
      popoutIframe.style.height = "100%";
      popoutIframe.style.border = "none";
      popoutIframe.style.top = "0";
      popoutIframe.style.bottom = "0";
      popoutIframe.style.left = "0";
      popoutIframe.style.right = "0";
      popoutIframe.style.margin = "0";
      popoutIframe.style.padding = "0";
      popoutIframe.style.overflow = "hidden";
      popoutIframe.style.backgroundColor = "#000";
      popoutIframe.src = url;
      if (!localStorage.getItem("tabName")) {
        win.document.title = "Mathematics";
      } else {
        win.document.title = localStorage.getItem("tabName");
      }
      faviconLink.rel = 'shortcut icon';
      if (localStorage.getItem("favicon")) {
        faviconLink.href = localStorage.getItem("favicon");
      } else {
        faviconLink.href = "";
      }
      win.document.head.appendChild(faviconLink);
      win.document.body.appendChild(popoutIframe);
      isCloaked = 1;
      if (aboutblankcloak == 1) {
        window.location.replace("https://classroom.google.com");
      }
    }

document.getElementById("aboutblank").addEventListener("click", function() {
  aboutblankcloak = 1;
  aboutBlank();
});

document.getElementById("aboutblankwithoutcloak").addEventListener("click", function() {
  aboutblankcloak = 0;
  aboutBlank();
});

function popoutRes() {
  let win = window.open();
  let url = iframe.src;
  let popoutIframe = win.document.createElement("iframe");
  let faviconLink = win.document.createElement('link');
  popoutIframe.style.position = "fixed";
  popoutIframe.style.width = "100%";
  popoutIframe.style.height = "100%";
  popoutIframe.style.border = "none";
  popoutIframe.style.top = "0";
  popoutIframe.style.bottom = "0";
  popoutIframe.style.left = "0";
  popoutIframe.style.right = "0";
  popoutIframe.style.margin = "0";
  popoutIframe.style.padding = "0";
  popoutIframe.style.overflow = "hidden";
  popoutIframe.style.backgroundColor = "#000";
  popoutIframe.src = url;
  if (!localStorage.getItem("tabName")) {
    win.document.title = "Mathematics";
  } else {
    win.document.title = localStorage.getItem("tabName");
  }
  faviconLink.rel = 'shortcut icon';
  if (localStorage.getItem("favicon")) {
    faviconLink.href = localStorage.getItem("favicon");
  } else {
    faviconLink.href = "";
  }
  win.document.head.appendChild(faviconLink);
  win.document.body.appendChild(popoutIframe);
}

hideui();
