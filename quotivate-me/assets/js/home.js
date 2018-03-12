//Event Listeners
document.addEventListener('DOMContentLoaded', getRandomFile());

document.getElementById("notify").addEventListener("click", function(){
    if(Notification.permission !== "granted"){
        Notification.requestPermission();
    }
    else{
    }
});

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

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
            ++fileCounter;
            // console.log(fileCounter);
        }
    }
    rawFile.send(null);
}

function getRandomQuote(range)
{
    return Math.floor(Math.random() * range) + 1;
}

function readFromFile(path, fileNumber)
{
    readTextFile(path + fileNumber, function(text){
        var data = JSON.parse(text);
        var randomQuoteNumber = getRandomQuote(Object.keys(data).length);
        document.getElementById("quote").innerText = data["data"][randomQuoteNumber]["quote"];
        document.getElementById("author").innerText = "- " + data["data"][randomQuoteNumber]["author"];
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
    for(var i = 1; i < 500 ; i++)
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
    console.log(fileCounter);
}

function getRandomFile()
{
    var path = "/data/";
    var totalFiles = getFileCount();
    var fileNumber = (Math.floor(Math.random() * 141));
    var fileName = cleanName(fileNumber);
    fileName += ".json";
    console.log(fileName);
    readFromFile(path, fileName);
}
