document.addEventListener('DOMContentLoaded', loadSettings());
document.getElementById("basic-mode-box").addEventListener("change", basicMode);
document.getElementById("pro-mode-box").addEventListener("change", proMode);
document.getElementById("save-settings").addEventListener("click", saveSettings);

function loadSettings() {
    var basicMode = document.getElementById("basic-mode-box");
    var proMode = document.getElementById("pro-mode-box");
    chrome.storage.local.get(["basicMode"], function(result) {
        if(result.basicMode >= 20) {
            basicMode.checked = true;
            console.log(result.basicMode);
            document.getElementById("basic-mode-duration").value = result.basicMode;
        }
        else {
            basicMode.checked = false;
            $("#basic-mode").hide();
        }
    });
    chrome.storage.local.get(["proMode"], function(result) {
        if(result.proMode >= 20) {
            proMode.checked = true;
            document.getElementById("pro-mode-duration").value = result.proMode;
        }
        else {
            proMode.checked = false;
            $("#pro-mode").hide();
        }
    });
}

function basicMode() {
    document.getElementById("basic-mode-box").checked ? $("#basic-mode").show() : $("#basic-mode").hide();
}

function proMode() {
    document.getElementById("pro-mode-box").checked ? $("#pro-mode").show() : $("#pro-mode").hide();
}

function saveSettings() {
    var basicModeStatus = document.getElementById("basic-mode-box").checked ? true : false;
    var basicModeDuration = basicModeStatus ? document.getElementById("basic-mode-duration").value : 0;
    var proModeStatus = document.getElementById("pro-mode-box").checked ? true : false;
    var proModeDuration = proModeStatus ? document.getElementById("pro-mode-duration").value : 0;
    var settingsStatus = document.getElementById("settings-status");
    if(basicModeStatus && basicModeDuration < 20) {
        settingsStatus.innerText = "Basic mode duration should be minimum 20 minutes.";
        return;
    }
    if(proModeStatus && proModeDuration < 40) {
        settingsStatus.innerText = "Pro mode duration should be minimum 40 minutes.";
        return;
    }
    chrome.storage.local.set({"basicMode": basicModeDuration}, function() {
    });
    chrome.storage.local.set({"proMode": proModeDuration}, function() {
    });
    settingsStatus.innerText = "Save successful.";
}