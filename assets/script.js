//Global Variables
let locations = [];
let lat = 36.162663;
let lon = -86.781601;

//Takes search input and gets Lat/Long to pass to getWeather fuction
function getLocation() {

};

//Gets weather info for specified Lat/Long
function getWeather() {
    let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=757976158322ce33a69d16ccf3339824";

    jQuery.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    });

};

