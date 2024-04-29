let gamelist = document.querySelectorAll(".card");
let gamecount = document.getElementById("gamecount");

gamecount.innerHTML = `Total Games: ${gamelist.length}`;
//wjat are you doing
function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}
function notify(title, content) {
  let notifTitle = document.querySelector(".title");
  let notifContent = document.querySelector(".content");
  let notification = document.querySelector(".notification");
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


function addGame() {
  let name = document.getElementById("customGameName").value;
  let url = document.getElementById("customGameUrl").value;
  let img = document.getElementById("customImgUrl").value;

  if (!name || !url || !img) {
    notify("Game Error", "Please fill out all of the input fields.");
  } else if (!(img.startsWith("https://") || img.startsWith("http://"))) {
    notify("Game Error", "Please input a valid image URL starting with https:// or http://");
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    notify("Game Error", "Please input a valid game URL starting with https:// or http://");
  } else {
    let newGame = {
      name: name,
      url: url,
      img: img
    };
    let games = JSON.parse(localStorage.getItem("games")) || [];
    games.push(newGame);
    localStorage.setItem("games", JSON.stringify(games));
    addGameToDOM(newGame);
    notify("Game Added", `${name} has been added successfully.`);
    cancelchanges();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(games);
      }, 10);
    });
  }
}

function addGameToDOM(game) {
  let newGame = document.createElement('button');
  newGame.className = "card";
  newGame.setAttribute('onclick', `openApp('${game.url}')`);
  let gameImg = document.createElement('img');
  gameImg.src = game.img;
  newGame.appendChild(gameImg);
  let gameTitle = document.createElement('p');
  gameTitle.className = "title";
  gameTitle.textContent = game.name;
  newGame.appendChild(gameTitle);
  document.querySelector('.gxmes').appendChild(newGame);
  gamecount.innerHTML = `Total Games: ${document.querySelectorAll(".card").length}`;
}

function loadGamesFromStorage() {
  let games = JSON.parse(localStorage.getItem("games")) || [];
  games.forEach(game => {
    addGameToDOM(game);
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(games);
    }, 250);
  });
}

window.addEventListener('load', function () {
  loadGamesFromStorage().then(() => {
    let customGameButton = document.createElement('button');
    customGameButton.className = "card custom-card";
    customGameButton.setAttribute('onclick', `customuishow();`);
    let customimage = document.createElement('img');
    customimage.src = "./img/gxmes/plus.png";
    customGameButton.appendChild(customimage);
    let customtitle = document.createElement('p');
    customtitle.className = "title";
    customtitle.textContent = "Custom Game";
    customGameButton.appendChild(customtitle);
    document.querySelector('.gxmes').appendChild(customGameButton);
  });
});

function customuishow() {
  let curtain = document.querySelector(".curtain");
  let gamepanel = document.getElementById("customgamepanel");

  curtain.style.visibility = "visible";
  curtain.style.opacity = "1";
  gamepanel.removeAttribute("hidden");
  gamepanel.style.opacity = "1";
}

function cancelchanges() {
  let curtain = document.querySelector(".curtain");
  let gamepanel = document.getElementById("customgamepanel");
  curtain.style.opacity = "0";
  gamepanel.style.opacity = "0";
  delay(300).then(() => {
    curtain.style.visibility = "hidden";
    gamepanel.setAttribute("hidden", true);
  });
}

function search() {
  var input, list, btn, p, i;
  input = document.getElementById("searchbar").value.toUpperCase();
  list = document.querySelector(".gxmes");
  btn = list.getElementsByTagName("button");

  for (i = 0; i < btn.length; i++) {
    p = btn[i].getElementsByTagName("p")[0];
    if (p.innerHTML.toUpperCase().indexOf(input) > -1) {
      btn[i].style.display = "";
    } else {
      btn[i].style.display = "none";
    }
  }
}


/*function search() {
var input, list, btn, p, i;
input = document.getElementById("searchbar").value;
list = document.querySelector(".gxmes");
btn = list.getElementsByClassName("card");

var filter = document.getElementById("filter").value;

for (i = 0; i < btn.length; i++) {
  p = btn[i].getElementsByTagName("p")[0];
  if ((p.innerHTML.toUpperCase().indexOf(input.toUpperCase()) > -1) && (filter === "all" || btn[i].classList.contains(filter))) {
    btn[i].style.display = "";
  } else {
    btn[i].style.display = "none";
  }
}
}

function filterGames() {
var filter = document.getElementById("filter").value;
var cards = document.getElementsByClassName("card");

var input = document.getElementById("searchbar").value.toUpperCase();

for (var i = 0; i < cards.length; i++) {
  var p = cards[i].getElementsByTagName("p")[0];
  if ((p.innerHTML.toUpperCase().indexOf(input) > -1) && (filter === "all" || cards[i].classList.contains(filter))) {
    cards[i].style.display = "";
  } else {
    cards[i].style.display = "none";
  }
}
}*/
  function showLoading() {
    document.getElementById("loading-message").style.display = "block";
  }
  function hideLoading() {
    document.getElementById("loading-message").style.display = "none";
  }
  window.addEventListener("load", function() {
    hideLoading();
  });
  showLoading();