let savedKey = localStorage.getItem("savedKey");
let savedLink = localStorage.getItem("savedLink");

let ksDisplay = document.getElementById("keystroke-display");
let pks_panel = document.getElementById("panic-key-system");
let recPanel = document.querySelector(".pks-recPanel");
let isRecording = 2;

let bypassPrevention = 0;

function initPK() {
    console.log("Initializing PK");
    console.log("savedKey:", localStorage.getItem("savedKey"));
    console.log("savedLink:", localStorage.getItem("savedLink"));
    
    if (localStorage.getItem("savedKey") && localStorage.getItem("savedLink")) {
        ksDisplay.innerHTML = localStorage.getItem("savedKey");
        document.getElementById("pks_input").value = localStorage.getItem("savedLink");
    } else {
        ksDisplay.innerHTML = "Record A Keystroke!";
        document.getElementById("pks_input").value = "";
    }
    document.getElementById("panic-key-system").style.display = "";
    document.getElementById("custom-game-panel").style.display = "none";
    document.getElementById("custom-tab-cloaking").style.display = "none";
    document.querySelector(".curtain").style.visibility = "visible";
    document.querySelector(".curtain").style.opacity = 1;
    document.getElementById("panic-key-system").style.transform = "scale(1)";
    console.log("Panic key system panel:", document.getElementById("panic-key-system").style.transform);
    document.removeEventListener("keydown", keydownHandler);
}


function recordPK() {
    ksDisplay.style.color = "#454545";
    ksDisplay.innerHTML = "Press any key. . .";
    isRecording = 1;
    document.addEventListener("keydown", keydownHandler);
}

function savePK() {
    if (isRecording === 2) {
        notify("warn", "You must record a keystroke first.")
    } else {
        if (isRecording === 1) {
            notify("warn", "You are still recording a keystroke!")
        } else {
            if (!document.getElementById("pks_input").value) {
                notify("warn", "Panic URL input is blank.")
            } else {
                if (!isValidURL(document.getElementById("pks_input").value)) {
                    notify("error", "The panic URL is not a valid URL.")
                } else {
                    localStorage.setItem("savedKey", ksDisplay.innerHTML);
                    localStorage.setItem("savedLink", document.getElementById("pks_input").value);
                    ksDisplay.innerHTML = "Saving. . .";
                    pks_panel.style.transform = "scale(0.1)";
                    document.querySelector(".curtain").style.opacity = 0;
                    setTimeout(() => {
                        document.querySelector(".curtain").style.visibility = "hidden";
                    }, 250);
                }
            }
        }

    }
}
/*document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("keyup", (e) => {
        console.log(e.key);
    });    
});*/

function cancelPK() {
    ksDisplay.innerHTML = "Cancelling. . .";
    pks_panel.style.transform = "scale(0.1)";
    document.querySelector(".curtain").style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".curtain").style.visibility = "hidden";
    }, 250);
}

function resetPK() {
    localStorage.setItem("savedKey", "");
    localStorage.setItem("savedLink", "");
}

function keydownHandler(e) {
    ksDisplay.style.color = "#FFF";
    if (e.key === " ") {
        ksDisplay.innerHTML = "Invalid Key!";
    } else {
        ksDisplay.innerHTML = e.key;
        isRecording = 0;
    }
    document.removeEventListener("keydown", keydownHandler);
};

document.addEventListener("keyup", (e) => {
    let SK = localStorage.getItem("savedKey");
    let SL = localStorage.getItem("savedLink");
    if (!SK && SL) {
        return
    }
    if (e.key === SK) {
        if (!(SL.startsWith("https://") || SL.startsWith("http://"))) {
            location.replace("http://" + SL);
        } else {
            location.replace(SL);
        }
    }
})