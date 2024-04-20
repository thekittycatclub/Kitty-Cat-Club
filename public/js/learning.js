function delay(milliseconds) {
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}
let dontchangeurl = 0;
let inputlostfocus = 0;
let isShown = 0;
let isHidden = 0;
let keepuiopen = 2;
if (localStorage.getItem("autohideui") == 1) {
  document.querySelector(".main").style.top = "-50px";
  document.querySelector(".toggleuibtn").style.transition = "0.3s";
  document.querySelector(".toggleuibtn").style.top = "0";
  document.getElementById("result").style.height = "calc(100vh - 1.8em)";
  document.getElementById("result").style.top = "27px";
  document.querySelector(".toggleuibtn").style.display = "none";
  document.getElementById('navbarbtn').innerHTML = 'Show Navbar';
  isHidden = 1;
  keepuiopen = 0;
} else {
  isHidden = 2;
  document.getElementById('navbarbtn').innerHTML = 'Auto-hide Navbar';
}

if (!localStorage.getItem("autohideui")) {
  localStorage.setItem("autohideui", 0);
}

if (localStorage.getItem("hiddenClock") == 1) {
  document.querySelector(".clockdisplay").style.display = "none";
}

function togglesettings() {
  if (isShown == 0) {
      document.querySelector(".menu").style.visibility = "visible";
      document.querySelector(".menu").style.opacity = "1";
      document.querySelector(".menu").style.transition = "0.2s ease-out";
      isShown = 1;
      keepuiopen = 1;
  } else {
      document.querySelector(".menu").style.visibility = "hidden";
      document.querySelector(".menu").style.opacity = "0";
      isShown = 0;
      keepuiopen = 0;
  }
}
function toggleui() {
  document.querySelector(".main").style.transition = "0.3s ease-in";
  document.getElementById("result").style.transition = "0.23s ease-in";
  if (localStorage.getItem("hideui") == 1) {
      document.querySelector(".main").style.top = "0px";
      document.getElementById("result").style.height = "calc(100vh - 5em)";
      document.getElementById("result").style.top = "80px";
      localStorage.setItem("hideui", 0);
      document.querySelector(".toggleuibtn").style.transition = "0.3s";
      document.querySelector(".toggleuibtn").style.top = "-100px";
  } else {
      document.querySelector(".main").style.top = "-120px";
      document.getElementById("result").style.height = "calc(100vh)";
      document.getElementById("result").style.top = "0";
      localStorage.setItem("hideui", 1);
      document.querySelector(".menu").style.visibility = "hidden";
      document.querySelector(".menu").style.opacity = "0";
      delay(1000).then(() => {
          document.querySelector(".toggleuibtn").style.transition = "0.3s";
          document.querySelector(".toggleuibtn").style.top = "10px";
          document.querySelector(".main").style.transition = "none";
          document.getElementById("result").style.transition = "none";
      });
  }
}

function detecthiddenui() {
  document.querySelector(".main").style.transition = "0.2s ease-in";
  document.getElementById("result").style.transition = "0.23s ease-in";
  if (isHidden == 1) {
      isHidden = 0;
      document.querySelector(".main").style.top = "0px";
      document.getElementById("result").style.height = "calc(100vh - 5em)";
      document.getElementById("result").style.top = "80px";
      localStorage.setItem("hideui", 0);
      document.querySelector(".toggleuibtn").style.transition = "0.3s";
      document.querySelector(".toggleuibtn").style.top = "-100px";
  }
  delay(300).then(() => {
      document.querySelector(".main").style.transition = "none";
      document.getElementById("result").style.transition = "none";
  });
}

function hideui() {
  if (keepuiopen == 0) {
      if (isHidden == 0) {
          if (inputlostfocus == 0) {
              document.querySelector(".main").style.top = "-50px";
              document.querySelector(".toggleuibtn").style.transition = "0.3s";
              document.querySelector(".toggleuibtn").style.top = "0";
              document.getElementById("result").style.height = "calc(100vh - 1.8em)";
              document.getElementById("result").style.top = "27px";
              document.querySelector(".toggleuibtn").style.display = "none";
              isHidden = 1;
          }
      }
      delay(500).then(() => {
          document.querySelector(".main").style.transition = "none";
          document.getElementById("result").style.transition = "none";
      });
  }
}

function popoutWindow() {
  let popupWindow = window.open("", "Popup", "width=600,height=400");
  popupWindow.document.write(`<iframe src="${document.getElementById('result').contentWindow.location.href}" width="100%" height="100%" frameborder="0" style="top: 0; bottom: 0; left: 0; right: 0; position: fixed; margin: 0; border: none; padding: 0;"></iframe>`);
  if (!popupWindow || popupWindow.closed || typeof popupWindow.closed == 'undefined') {
      alert("The popup window has been blocked. Please allow popups for this page, or refresh the page to try again.");
  }
}
function fullscreen() {
  let doc = document.documentElement;
  if (doc.requestFullscreen) {
      doc.requestFullscreen();
  } else if (doc.mozRequestFullScreen) {
      doc.mozRequestFullScreen();
  } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
  } else if (docElm.msRequestFullscreen) {
      doc.msRequestFullscreen();
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
  location.replace("https://classroom.google.com");
}

function toggleClock() {
  var clockDisplay = document.querySelector(".clockdisplay");
  if (clockDisplay.style.display === "") {
      clockDisplay.style.display = "none";
      localStorage.setItem("hiddenClock", 1);
  } else {
      clockDisplay.style.display = "";
      localStorage.setItem("hiddenClock", 0);
  }
}

function devTools() {
  if (!document.getElementById("result")) return
  let erudaWindow = document.getElementById("result").contentWindow
  let erudaDocument = document.getElementById("result").contentDocument

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
function saveContentWindow() {
  setTimeout(function () {
      localStorage.setItem("savedURL", document.getElementById('result').contentWindow.location.href);
      if (dontchangeurl == 0) {
          let tempurl = document.getElementById('result').contentWindow.location.href;
          let parts = tempurl.split('/');
          let lastPart = parts[parts.length - 1];
          document.querySelector(".searchinput").value = __uv$config.decodeUrl(lastPart);
          if (document.querySelector(".searchinput").value == "a`owt8bnalk" || !document.querySelector(".searchinput").value) {
            document.querySelector(".searchinput").value = "Loading URL...";
          }
      }
      saveContentWindow();
  }, 10);
}
saveContentWindow();