//Global Variables
let locations = [];
let lat;
let lon;
let placeName;
let convdataTime;

//functions retrieve location list from localstorage and display
//if no local storage exists default cities are assigned
getCities();
function getCities() {
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        locations = storedCities;
    } else {
        locations = ["Okalhoma City, OK", "Nashville, TN"];
    }
    displayCities();
};

function displayCities() {
    for (var i = 0; i < locations.length; i++) {
        let newCity = $("<li>");
        newCity.text(locations[i]);
        newCity.attr("class", "list-group-item");
        $("ul").prepend(newCity);
    }
};


$("#cityName").text($("li")[0].innerHTML);
placeName = $("li")[0].innerHTML;
getLocation();

//Adds input box to list of cities - new items are currently not clickable
$("button").on("click", function() {
    if ($("#searchInput").val() !== "") {

    let newCity = $("#searchInput").val();
    let list = $("<li>");
    list.attr("class", "list-group-item");
    list.text(newCity);
    $("ul").prepend(list);
    placeName = $("#searchInput").val();
    getLocation();
    locations = locations.concat(placeName);
    localStorage.setItem("cities", JSON.stringify(locations));
    };
    
});

// convert Unix Timecode to date
function convert(timestamp){

    // Unixtimestamp
    var unixtimestamp = timestamp;
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);
   
    convdataTime = date.getMonth() +'/'+ date.getDate() +'/'+ date.getFullYear();
    
    console.log(convdataTime);
   }



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
        getWeather();
    });
};

//Gets weather info for specified Lat/Long
function getWeather() {
    let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=757976158322ce33a69d16ccf3339824";
    $("#cityName").text(placeName);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        //displays current forecast info
        let timestamp = response.current.dt;
        convert(timestamp);
        $("#currentDay").text(convdataTime);
        let icon = response.current.weather[0].icon;
        $("img").attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
        $("#temp").text(response.current.temp);
        $("#humidity").text(response.current.humidity);
        $("#windSpeed").text(response.current.wind_speed);
        $("#uvIndex").text(response.current.uvi);

        //displays 5-day forecast info

        
    });

};

//click listener for save cities list
$("li").on("click", function() {
    placeName = this.innerHTML;
    getLocation();
});