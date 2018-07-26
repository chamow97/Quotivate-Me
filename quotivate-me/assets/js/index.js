document.addEventListener('DOMContentLoaded', getRandomFile(141));
document.addEventListener('DOMContentLoaded', getWallpaper(50));
document.getElementById("myButton").addEventListener("click", notifyQuotes);


// document.getElementById("notify").addEventListener("click", function(){
//     if(Notification.permission !== "granted"){
//         Notification.requestPermission();
//     }
//     else{
//     }
// });

/*
Check whether the user has granted notification option.
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

var fileCounter = 0;
var quoteList = [];

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

function getRandomNumber(range)
{
    return Math.floor(Math.random() * range) + 1;
}

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

function cleanName(fileNumber) {
    var currentLength = fileNumber.toString().length;
    for(var i = 0; i < (3 - currentLength); i++)
    {
        fileNumber = "0" + fileNumber;
    }
    return fileNumber;
}

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

function getRandomFile(limit)
{
    var path = "/data/";
    var fileNumber = (Math.floor(Math.random() * limit));
    var fileName = cleanName(fileNumber);
    fileName += ".json";
    readFromFile(path, fileName);
}

function getWallpaper(limit){
    var imageName = getRandomNumber(limit);
    var imgUrl = chrome.extension.getURL("assets/images/background/" + imageName + ".jpg");
    document.body.style.backgroundImage = "url('" + imgUrl + "')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "top center !important";
    document.body.style.backgroundRepeat = "no-repeat !important";
    document.body.style.backgroundAttachment = "fixed";
}

document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
});

function notifyQuotes() {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {

        var notification = new Notification('Stay Motivated!', {
            icon: 'icons/icon.png',
            body: quoteList[0] + " - " + quoteList[1],
        });

        notification.onclick = function () {
            window.open("http://stackoverflow.com/a/13328397/1269037");
        };

    }

}