let recordButton = document.getElementById("recordbtn");
let displayKeystroke = document.getElementById("ksText");
let changeURL = document.getElementById("changeUrl");
let eduinput = document.getElementById("eduInput");

let savedLink = localStorage.getItem("savedLink");
let savedKey = localStorage.getItem("savedKey");

if (savedKey) {
    displayKeystroke.textContent = savedKey;
}
if (savedLink) {
    eduinput.value = savedLink;
}


if (localStorage.getItem("displaypanel") == 1) {
    document.querySelector(".curtain").style.visibility = "visible";
    document.querySelector(".curtain").style.opacity = "1";
    document.getElementById('recCard').removeAttribute('hidden');
}

if (localStorage.getItem("displaypanel") == 2) {
    notify("Panic Key System", "New changes has been saved!");
    localStorage.setItem("displaypanel", 0);
}
if (localStorage.getItem("displaypanel") == 3) {
    notify("Panic Key System", "New Changes has been canceled.");
    document.querySelector(".curtain").style.opacity = "0";
    delay(300).then(() => {
        document.querySelector(".curtain").style.visibility = "hidden";
        document.getElementById('recCard').setAttribute('hidden', true);
    });
    localStorage.setItem("displaypanel", 0);
}

function recordKeystroke(ks) {
    document.querySelector(".curtain").style.visibility = "visible";
    document.querySelector(".curtain").style.opacity = "1";
    displayKeystroke.textContent = ks.key;
    if (ks.key !== " ") {
        document.removeEventListener("keydown", recordKeystroke);
        localStorage.setItem("savedKey", displayKeystroke.textContent);
        window.location.reload();
    } else {
        displayKeystroke.textContent = "Invalid key!"
    }
}

recordButton.addEventListener("click", function () {
    displayKeystroke.textContent = "(Enter a key)";
    document.addEventListener("keydown", recordKeystroke);
    document.querySelector(".curtain").style.visibility = "visible";
    document.querySelector(".curtain").style.opacity = "1";
    localStorage.setItem("displaypanel", 1);
    document.getElementById('recCard').removeAttribute('hidden');
});

changeURL.addEventListener("click", function () {
    if (eduinput.value === "") {
        notify("Panic Key Error", "The input field can't be a blank value!");
    } else {
        window.location.reload();
        document.querySelector(".curtain").style.visibility = "0";
        document.querySelector(".curtain").style.opacity = "0";
        localStorage.setItem("displaypanel", 2);
        localStorage.setItem("savedLink", eduinput.value);
    }
});

function keyPressed(event) {
    if (event.key === savedKey) {
        if (savedLink.includes("https://")) {
            location.replace(savedLink);
        } else {
            location.replace("https://" + savedLink);
        }
    }
}
document.addEventListener("keydown", keyPressed);

document.getElementById("cancel").addEventListener("click", function() {
    notify("Panic Key System", "New Changes has been canceled.");
    document.querySelector(".curtain").style.opacity = "0";
    delay(300).then(() => {
        document.querySelector(".curtain").style.visibility = "hidden";
        document.getElementById('recCard').setAttribute('hidden', true);
    });
    localStorage.setItem("displaypanel", 0);
});