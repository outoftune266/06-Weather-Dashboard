//Global Variables
let locations = [];
let lat = 36.162663;
let lon = -86.781601;
let placeName = "Oklahoma City, OK";

//Takes search input and gets Lat/Long to pass to getWeather fuction
function getLocation() {
    let queryURL = "https://api.opencagedata.com/geocode/v1/json?q=" + placeName + "&key=d0ec5acfd95d41b2b3da1850a8ae6d1a";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        lat = response.results[0].geometry.lat;
        lon = response.results[0].geometry.lng;
    });
};

//Gets weather info for specified Lat/Long
function getWeather() {
    let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=757976158322ce33a69d16ccf3339824";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

};

