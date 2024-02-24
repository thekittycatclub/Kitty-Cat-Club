let iframe = document.getElementById("result");

function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

function searchshow() {
  let searchbar = document.querySelector(".searchbar");
  let searchinput = document.querySelector(".searchinput");
  let mainbtndiv = document.querySelector(".mainbtns");

  if (searchbar.style.top === "20px") {
    //bring buttons up
    searchbar.style.transition = "0.3s";
    searchbar.style.top = "90px";
    searchinput.style.width = "20em";
  } else {
    //bring buttons down
    searchbar.style.transition = "0.3s";
    searchbar.style.top = "20px";
    searchinput.style.width = "1em";
  }
}
document.addEventListener("DOMContentLoaded", searchshow);

function reloadPX() {
  iframe.contentWindow.location.reload(true);
}

function devTools() {
  alert("balls. (in development)");
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
    //bring buttons up
    settingspanel.style.transition = "0.5s";
    settingspanel.style.bottom = "10px";
  } else {
    //bring buttons down
    settingspanel.style.transition = "0.5s";
    settingspanel.style.bottom = "-1000px";
  }
}
document.addEventListener("DOMContentLoaded", showsettings);