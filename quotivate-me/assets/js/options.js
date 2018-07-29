/*
* Event Listeners
*/

document.addEventListener('DOMContentLoaded', loadSettings());
document.getElementById("basic-mode-box").addEventListener("change", basicMode);
document.getElementById("pro-mode-box").addEventListener("change", proMode);
document.getElementById("save-settings").addEventListener("click", saveSettings);

/*
* loadSettings()
* Things to load before starting the settings page
* Get the duration of basic/pro mode from local storage and generate
*/

function loadSettings() {
    var basicMode = document.getElementById("basic-mode-box");
    var proMode = document.getElementById("pro-mode-box");

    //get the stored basic mode duration

    chrome.storage.local.get(["basicMode"], function(result) {
        if(result.basicMode >= 20) {
            basicMode.checked = true;
            document.getElementById("basic-mode-duration").value = result.basicMode;
        }
        else {
            basicMode.checked = false;
            // show the node only if it was enabled earlier
            $("#basic-mode").hide();
        }
    });

    //get the stored pro mode duration

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

/*
* basicMode()
* Show / Hide the duration description of basic mode based on whether it is checked or not
*/

function basicMode() {
    document.getElementById("basic-mode-box").checked ? $("#basic-mode").show() : $("#basic-mode").hide();
}

/*
* proMode()
* Show / Hide the duration description of pro mode based on whether it is checked or not
*/

function proMode() {
    document.getElementById("pro-mode-box").checked ? $("#pro-mode").show() : $("#pro-mode").hide();
}

/*
* addClass()
* Adds a class name to the given node
*/

function addClass(node, className) {
    $(node).hasClass(className) ? null : $(node).addClass(className);
}

/*
* removeClass()
* Removes a class name to the given node
*/

function removeClass(node, className) {
    $(node).hasClass(className) ? $(node).removeClass(className) : "";
}

/*
* saveSettings()
* Check whether basic mode has minimum of 20 minutes periodicity and pro mode, 40 minutes
* If every condition matches, save the duration entered.
*/

function saveSettings() {
    var basicModeStatus = document.getElementById("basic-mode-box").checked ? true : false;
    var basicModeDuration = basicModeStatus ? document.getElementById("basic-mode-duration").value : 0;
    var proModeStatus = document.getElementById("pro-mode-box").checked ? true : false;
    var proModeDuration = proModeStatus ? document.getElementById("pro-mode-duration").value : 0;
    var settingsStatus = document.getElementById("settings-status");
    removeClass("#settings-status", "success");
    addClass("#settings-status", "warning");
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
    removeClass("#settings-status", "warning");
    addClass("#settings-status", "success");
    settingsStatus.innerText = "Save successful.";
}