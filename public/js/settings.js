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
  if (url === "") {
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
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.top = iframe.style.bottom = iframe.style.left = iframe.style.right = "0";
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

function pageCloaking() {
  var win = window.open();
  var url = document.getElementById("pagecloak");
  var iframe = win.document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.top = iframe.style.bottom = iframe.style.left = iframe.style.right = 0;

  if (url.value.includes("https://")) {
     iframe.src = url;   
  } else {
    url = "https://" + url;
  }
  win.document.body.appendChild(iframe);
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

const uvSearch = document.getElementById("uv-search-engine");
var inputbox = document.querySelector(".input-box");
const savedEngine = localStorage.getItem("savedengine");
if (savedEngine) {
  uvSearch.value = getSearchEngineURL(savedEngine);
  input.textContent = savedEngine;
}

inputbox.onclick = function () {
  this.classList.toggle("open");
  let list = this.nextElementSibling;
  if (list.style.maxHeight) {
    list.style.maxHeight = null;
    list.style.boxShadow = null;
  } else {
    list.style.maxHeight = list.scrollHeight + "px";
    list.style.boxShadow =
      "0 1px 2px 0 rgba(0, 0, 0, 0.15),0 1px 3px 1px rgba(0, 0, 0, 0.1)";
  }
};

var rad = document.querySelectorAll(".radio");
rad.forEach((item) => {
  item.addEventListener("change", () => {
    const selectedOption = item.nextElementSibling.querySelector("span").innerText;
    uvSearch.value = getSearchEngineURL(selectedOption);
    inputbox.textContent = selectedOption + " (Selected)";
    saveSelectedEngine(selectedOption);
    inputbox.click();
    if (selectedOption === "Custom URL") {
      uvSearch.removeAttribute("hidden");
    } else uvSearch.setAttribute('hidden', true);
  });
});

window.onload = function () {
  if (savedEngine) {
    rad.forEach((item) => {
      const label = item.nextElementSibling.querySelector("span").innerText;
      if (label === savedEngine) {
        item.checked = true;
        if (savedEngine === "Custom URL") uvSearch.removeAttribute("hidden");
      }
    });
  }
};

function saveSelectedEngine(selectedEngine) {
  localStorage.setItem("savedengine", selectedEngine);
}

function getSearchEngineURL(engineName) {

  switch (engineName.toLowerCase()) {
    case "google":
      return "https://www.google.com/search?q=%s";
    case "bing":
      return "https://www.bing.com/search?q=%s";
    case "yahoo":
      return "https://search.yahoo.com/search?q=%s";
    case "custom_url":
      return uvSearch.textContent = "";
    default:
      return "";
  }
}
var label = document.querySelectorAll("label");
function search(searchin) {
  let searchVal = searchin.value;
  searchVal = searchVal.toUpperCase();
  label.forEach((item) => {
    let checkVal = item.querySelector(".name").innerHTML;
    checkVal = checkVal.toUpperCase();
    if (checkVal.indexOf(searchVal) == -1) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
    }
    let list = inputbox.nextElementSibling;
    list.style.maxHeight = list.scrollHeight + "px";
  });
}