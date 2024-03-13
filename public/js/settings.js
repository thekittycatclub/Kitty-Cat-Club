////vars////
let tab_Close = document.querySelector(".tabclosebtn");
let card = document.querySelector(".card");
let notification = document.querySelector(".notification");
let clock = document.getElementById("clock");
////load data////
let tabclosingval = localStorage.getItem("tabcloseval");
if (tabclosingval == "true") {
  tab_Close.innerHTML = "Disable Tab Closing Preventer";
  window.onbeforeunload = () => {
    return "Do you want to leave the current tab?";
  }
} else {
  tab_Close.innerHTML = "Enable Tab Closing Preventer";
}


////Functions////
document.addEventListener("DOMContentLoaded", function () {
  card.style.background = "rgba(26, 26, 26, 0.75)";
});

function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
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

function setTabTitle() {
  let input = document.getElementById("changetitle");
  let newTabName = input.value;

  if (newTabName === "") {
    document.title = "Kitty Cat Club | Settings";
    localStorage.setItem("tabName", "");
  } else {
    document.title = newTabName;
    localStorage.setItem("tabName", newTabName);
  }
}


function setFavicon() {
  let url = document.getElementById("changefavicon").value;
  if (url === "" || url === null || !url) {
    favicon.href = "./img/logo.png";
    localStorage.setItem("favicon", "./img/logo.png");
  } else {
    favicon.href = url;
    localStorage.setItem("favicon", url);
  }
}

function openAboutBlack() {
  var win = window.open();
  var url = window.location.href;
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
  iframe.style.backgroundColor = "#000";
  iframe.src = url;
  win.document.body.appendChild(iframe);
}


function changeBG() {
  let url = document.getElementById("changebg").value;
  if (url === "") {
    alert("You need to put a valid url! Changing background to default...");
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#1c1c1c";
    localStorage.setItem("BG", document.body.style.backgroundColor);
  } else {
    localStorage.setItem("BG", url);
    window.location.reload();
  }
}


function changeFaviconToGoogle() {
  document.title = "Google";
  localStorage.setItem("tabName", document.title);
  favicon.href = "./img/google.png";
  localStorage.setItem("favicon", "./img/google.png");
}

function changeFaviconToGoogleDrive() {
  document.title = "My Drive - Google Drive";
  localStorage.setItem("tabName", document.title);
  favicon.href = "./img/google_drive.png";
  localStorage.setItem("favicon", "./img/google_drive.png");
}

function changeFaviconToGoogleClassroom() {
  document.title = "Home";
  localStorage.setItem("tabName", document.title);
  favicon.href = "./img/Google_Classroom.png";
  localStorage.setItem("favicon", "./img/Google_Classroom.png");
}

function changeFaviconToGoogleDocs() {
  document.title = "Google Docs";
  localStorage.setItem("tabName", document.title);
  favicon.href = "./img/google_docs.ico";
  localStorage.setItem("favicon", "./img/google_docs.ico");
}
function changeFaviconToNormal() {
  document.title = "Kitty Cat Club | Settings";
  localStorage.setItem("tabName", "");
  favicon.href = "./img/logo.png";
  localStorage.setItem("favicon", "./img/logo.png");
}

function preventClosing() {
  if (tab_Close.innerHTML === "Enable Tab Closing Preventer") {
    tab_Close.innerHTML = "Disable Tab Cloaking Preventer";
    localStorage.setItem("tabcloseval", "true");
    notify("Changes saved", "New changes have been saved!");
    window.onbeforeunload = () => {
      return "Do you want to leave the current tab?";
    }
  } else {
    tab_Close.innerHTML = "Enable Tab Closing Preventer";
    localStorage.setItem("tabcloseval", "false");
    alert("Make sure you click on reload in the next alert!");
    location.reload();
  }
}

function toggleClockVisiblity() {
  if (clock.style.display == "none") {
    localStorage.setItem("clockvisibility", "false");
    clock.style.display = "";
  } else {
    clock.style.display = "none";
    localStorage.setItem("clockvisibility", "true");
  }
  notify("Changes Saved", "Changes has been saved!");
}
