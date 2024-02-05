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

