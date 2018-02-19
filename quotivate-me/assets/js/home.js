//Event Listeners
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:

readTextFile("/data/001.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
    document.getElementById("quote").innerText = data["data"][0]["quote"];
});