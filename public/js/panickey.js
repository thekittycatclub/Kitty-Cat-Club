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

function recordKeystroke(ks) {
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
});

changeURL.addEventListener("click", function () {
    localStorage.setItem("savedLink", eduinput.value);
    window.location.reload();
});

function keyPressed(event) {
    if (event.key === savedKey) {
        if (savedLink.includes("https://")) {
            window.location.href = savedLink;
        } else {
            window.location.href = "https://" + savedLink;
        }
    }
}
document.addEventListener("keydown", keyPressed);