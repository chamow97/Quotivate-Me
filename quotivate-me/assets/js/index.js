/*
* Event Listeners
*/

document.addEventListener('DOMContentLoaded', getRandomFile(141));
document.addEventListener('DOMContentLoaded', getWallpaper(50));
document.getElementById("myButton").addEventListener("click", notifyQuotes);
document.getElementById('system-icon').addEventListener("click", openSettings);

/*
* Check whether the user has granted notification option.
*/

document.addEventListener('DOMContentLoaded', function(){
    if(!Notification){
        alert("Notification not available");
        return;
    }
    if(Notification.permission !== "granted"){
        Notification.requestPermission();
    }
});

//global variables

var fileCounter = 0;
var quoteList = [];

/*
* readTextFile()
* Open a file and check for its status ie. 200 (success)
*/

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
            ++fileCounter;
        }
    };
    rawFile.send(null);
}

/*
* getRandomNumber()
* To get a random number for selecting a quote / background
*/

function getRandomNumber(range)
{
    return Math.floor(Math.random() * range) + 1;
}

/*
* readFromFile()
* Get the contents of a file and append it to nodes ie. quote and author
*/

function readFromFile(path, fileNumber)
{
    readTextFile(path + fileNumber, function(text){
        var data = JSON.parse(text);
        var randomQuoteNumber = (Object.keys(data).length);
        document.getElementById("quote").innerText = data["data"][randomQuoteNumber]["quote"];
        document.getElementById("author").innerText = "- " + data["data"][randomQuoteNumber]["author"];
        quoteList.push(data["data"][randomQuoteNumber]["quote"]);
        quoteList.push(data["data"][randomQuoteNumber]["author"]);
    });
}

/*
* cleanName()
* To clean the name for e.g. 1 to 001 , 11 to 011 as file names are 3 digit numbers
*/

function cleanName(fileNumber) {
    var currentLength = fileNumber.toString().length;
    for(var i = 0; i < (3 - currentLength); i++)
    {
        fileNumber = "0" + fileNumber;
    }
    return fileNumber;
}

/*
* getFileCount()
* Get the count of files
*/

function getFileCount() {
    var path = "/data/";
    for(var i = 1; i < 141 ; i++)
    {
        var fileName = cleanName(i);
        fileName += ".json";
        try{
            readTextFile(path + fileName, function(text){
            });
        }
        catch(e) {
            console.log(e);
        }
    }
}

/*
* getRandomeFile
* Get a random .json quote file for generating the quote
*/

function getRandomFile(limit)
{
    var path = "/data/";
    var fileNumber = (Math.floor(Math.random() * limit));
    var fileName = cleanName(fileNumber);
    fileName += ".json";
    readFromFile(path, fileName);
}

/*
* getWallpaper()
* Get Random Wallpaper for the Extension
*/

function getWallpaper(limit){
    var imageName = getRandomNumber(limit);
    var imgUrl = chrome.extension.getURL("assets/images/background/" + imageName + ".jpg");
    document.body.style.backgroundImage = "url('" + imgUrl + "')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top center !important";
    document.body.style.backgroundRepeat = "no-repeat !important";
    document.body.style.backgroundAttachment = "fixed";
}

/*
* See whether the user has enabled notification
*/

document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
});


/*
* notifyQuotes()
* Method to generate quote as a notification
*/

function notifyQuotes() {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {

        var notification = new Notification('Stay Motivated!', {
            icon: 'icons/icon.png',
            body: quoteList[0] + " - " + quoteList[1],
        });

        notification.onclick = function () {
            window.open("chrome://extensions");
        };

    }

}

/*
* openSetting()
* A function to open Notification's settings page on demand
*/

function openSettings() {
    window.open("chrome://extensions/?options=iidpmelpaaoebcifegmkdafnbhfhefei");
}