////Variables////
let iframe = document.getElementById("result");
let tabclosing = document.getElementById("tabclosebtn");
let devtools = document.getElementById("devtools");
let proxyurl = document.getElementById("proxyurl");
let proxybtn = document.getElementById("proxybtn");
let mainbuttons = document.querySelector('.mainbtns');
let searchbarClass = document.querySelector('.searchbar');
let pageSrc = iframe.src;
////Load saved data////
let newLoader = localStorage.getItem("loader");
let tabclosingval = localStorage.getItem("tabcloseval");
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
  proxybtn.innerHTML = "Hide proxy URL";
}
if (proxyURLVal === "false") {
  proxyurl.style.visibility = "hidden";
  proxybtn.innerHTML = "Show proxy URL";
}

if (tabclosingval === "true") {
  tabclosing.innerHTML = "Disable Tab Closing Preventer";
  window.onbeforeunload = () => {
    return "Do you want to leave the current tab?";
  }
} else {
  tabclosing.innerHTML = "Enable Tab Closing Preventer";
}

////Functions////
proxyurl.value = pageSrc + savedlinkurl;
proxyurl.value = proxyurl.value.replace("/learning", "");

function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

function searchshow() {
  let searchbar = document.querySelector(".searchbar");

  if (searchbar.style.top === "-100px") {
    searchbar.style.transition = "0.3s";
    searchbar.style.top = "90px";
  } else {
    searchbar.style.transition = "0.3s";
    searchbar.style.top = "-100px";
  }
}

function reloadPX() {
  iframe.contentWindow.location.reload(true);
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

  if (settingspanel.style.bottom === "-1000px") {
    settingspanel.style.transition = "0.5s";
    settingspanel.style.bottom = "10px";
  } else {
    settingspanel.style.transition = "0.5s";
    settingspanel.style.bottom = "-1000px";
  }
}
document.addEventListener("DOMContentLoaded", showsettings);

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
    proxybtn.innerHTML = "Show proxy URL";
    localStorage.setItem("proxyurlval", 'false');
  } else {
    proxyurl.style.visibility = "visible";
    proxybtn.innerHTML = "Hide proxy URL";
    localStorage.setItem("proxyurlval", 'true');
  }
}

function hover_event() {
  mainbuttons.style.transition = '0.5s';
  mainbuttons.style.top = '5px';
}

function hover_event_search() {
  mainbuttons.style.transition = '0.5s';
  mainbuttons.style.top = '5px';
  searchbarClass.style.top = '90px';
}

function hover_stop() {
  mainbuttons.style.transition = '0.5s';
  mainbuttons.style.top = '-65px';
  searchbarClass.style.top = '-100px';
}

function changeloader() {
  let input = document.getElementById("loaderinput");
  let newLoader = localStorage.getItem("loader");
  iframe.style.background = `url('${input.value}}')`;
  localStorage.setItem("loader", input);
}

function preventClosing() {
  if (tabclosing.innerHTML === "Enable Tab Closing Preventer") {
    tabclosing.innerHTML = "Disable Tab Closing Preventer";
    localStorage.setItem("tabcloseval", "true");
    window.onbeforeunload = () => {
      return "Do you want to leave the current tab?";
    }
  } else {
    tabclosing.innerHTML = "Enable Tab Closing Preventer";
    localStorage.setItem("tabcloseval", "false");
  }
}