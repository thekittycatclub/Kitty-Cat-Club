let gamelist = document.querySelectorAll(".card");
let gamecount = document.getElementById("gamecount");

gamecount.innerHTML = `Total Games: ${gamelist.length}`;
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


/// Custom Game System ///

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
    refreshCustomGames();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(games);
      }, 10);
    });
  }
}

function addGameToDOM(game) {
  let newGame = document.createElement('button');
  newGame.className = "card custom";
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

function addGameToPanel(game) {
  let newGame = document.createElement('button');
  newGame.className = "card custom";
  let gameImg = document.createElement('img');
  gameImg.src = game.img;
  newGame.appendChild(gameImg);
  let gameTitle = document.createElement('p');
  gameTitle.className = "title";
  gameTitle.textContent = game.name;
  newGame.appendChild(gameTitle);
  document.querySelector('.editgames').appendChild(newGame);
  gamecount.innerHTML = `Total Games: ${document.querySelectorAll(".card").length}`;
  newGame.setAttribute('onclick', `editgame("${game.name}", "${game.img}", "${game.url}")`);
}

function editgame(gn, is, gl) {
  document.getElementById("paneltitle").innerHTML = `Now editing: "${gn}"`;
  document.querySelector(".editgamesdiv").style.display = "none";
  document.querySelector(".editgamebuttons").style.display = "";
  document.getElementById("editgamediv").style.display = "";
  document.querySelector(".panel").style.width = "30em";
  document.getElementById("editGameName").value = gn;
  document.getElementById("editGameName2").value = gn;
  document.getElementById("editGameUrl").value = gl;
  document.getElementById("editImgUrl").value = is;
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

function loadGamesintoPanel() {
  let games = JSON.parse(localStorage.getItem("games")) || [];
  games.forEach(game => {
    addGameToPanel(game);
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(games);
    }, 250);
  });
}

function refreshCustomGames() {
  let customCards = document.querySelectorAll(".custom");
  customCards.forEach((card) => {
    card.parentNode.removeChild(card);
  });
  let customCard = document.querySelectorAll(".custom-card");
  customCard.forEach((cards) => {
    cards.parentNode.removeChild(cards);
  });
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
  loadGamesintoPanel();
}

function saveGameEdits() {
  let editedName = document.getElementById("editGameName").value.trim();
  let editedName2 = document.getElementById("editGameName2").value.trim();
  let editedUrl = document.getElementById("editGameUrl").value;
  let editedImg = document.getElementById("editImgUrl").value;
  if (!editedName || !editedUrl || !editedImg) {
    notify("Game Error", "Please fill out all of the input fields.");
  } else if (!(editedImg.startsWith("https://") || editedImg.startsWith("http://"))) {
    notify("Game Error", "Please input a valid image URL starting with https:// or http://");
  } else if (!(editedUrl.startsWith("https://") || editedUrl.startsWith("http://"))) {
    notify("Game Error", "Please input a valid game URL starting with https:// or http://");
  } else {
    let games = JSON.parse(localStorage.getItem("games")) || [];
    let gameIndex = games.findIndex(game => game.name.trim().toLowerCase() === editedName2.trim().toLowerCase());

    if (gameIndex !== -1) {
      
      games[gameIndex].name = editedName;
      games[gameIndex].url = editedUrl;
      games[gameIndex].img = editedImg;
      localStorage.setItem("games", JSON.stringify(games));
      let editedGameCard = document.querySelector(`.editgames .card:nth-child(${gameIndex + 1})`);
      editedGameCard.querySelector("img").src = editedImg;
      editedGameCard.querySelector(".title").textContent = editedName2;
      exit_editing();
      refreshCustomGames();
    } else {
      notify("Game Error", "The game to be edited was not found.");
    }
  }
}

function deleteGame() {
  let editedName = document.getElementById("editGameName2").value;

  let games = JSON.parse(localStorage.getItem("games")) || [];
  let gameIndex = games.findIndex(game => game.name === editedName);

  if (gameIndex !== -1) {
    games.splice(gameIndex, 1);
    localStorage.setItem("games", JSON.stringify(games));
    let deletedGameCard = document.querySelector(`.editgames .card:nth-child(${gameIndex + 1})`);
    deletedGameCard.remove();

    notify("Game Deleted", `${editedName} has been deleted successfully.`);
    exit_editing();
    refreshCustomGames();
    gamecount.innerHTML = `Total Games: ${gamelist.length}`;
  }
}


///UI stuff///
function exit_editing() {
  let curtain = document.querySelector(".curtain");
  let gamepanel = document.getElementById("customgamepanel");
  curtain.style.opacity = "0";
  gamepanel.style.opacity = "0";
  document.querySelector(".editgamebuttons").style.display = "none";
  document.getElementById("editgamediv").style.display = "none";
  document.getElementById("addgamediv").style.display = "";
  document.querySelector(".addgamebtns").style.display = "";
  document.getElementById("paneltitle").innerHTML = "Add Custom Game";
  
  delay(300).then(() => {
    curtain.style.visibility = "hidden";
    gamepanel.setAttribute("hidden", true);
    gamepanel.style.display = "none";
  });
}

function customuishow() {
  let curtain = document.querySelector(".curtain");
  let gamepanel = document.getElementById("customgamepanel");

  curtain.style.visibility = "visible";
  curtain.style.opacity = "1";
  gamepanel.removeAttribute("hidden");
  gamepanel.style.display = "";
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
///Search///
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

function switchpanel() {
  document.querySelectorAll(".custom").forEach((card) => {
    if (!card) {
      notify("Editing Error", "You currently have no custom games. To edit a game, first make one.")
    } else {
      document.getElementById("addgamediv").style.display = "none";
      document.querySelector(".addgamebtns").style.display = "none";
      document.querySelector(".editgamesdiv").style.display = "";
      document.getElementById("paneltitle").innerHTML = "Select a game";
      document.querySelector(".panel").style.width = "35em";
    }
  });
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

function areAllImagesLoaded() {
  const images = document.querySelectorAll(".card .image");
  for (const image of images) {
      if (!image.complete) {
          return false;
      }
  }
  return true;
}
function handleTransition() {
  document.getElementById("loadgame").style.transition = "0.3s";
  document.getElementById("loadgame").style.opacity = "0";
  document.getElementById("loadinggames").style.transition = "1s";
  document.getElementById("loadinggames").style.visibility = "visible";
  document.getElementById("loadinggames").style.opacity = "1";
}
if (areAllImagesLoaded()) {
  handleTransition();
} else {
  document.querySelectorAll(".card .image").forEach(image => {
      image.addEventListener("load", function() {
          setTimeout(handleTransition, 500);
      });
  });
}

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
  loadGamesintoPanel();