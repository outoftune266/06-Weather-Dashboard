//Global Variables
let locations = [];
let lat;
let lon;
let placeName;
let day = moment().format("L");

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

//$("#currentDay").text(day);


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

// function saveTask() {
//     //event.preventDefault();
//     //taskTime = event.target.dataset.hour;
    
//     taskContent = $(event.target.previousElementSibling).val();
//     console.log(taskContent);

//      addEntry(taskTime, taskContent);
//      localStorage.setItem("tasks", JSON.stringify(tasks));
// };




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
        let icon = response.current.weather[0].icon;
        $("img").attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
        $("#temp").text(response.current.temp);
        $("#humidity").text(response.current.humidity);
        $("#windSpeed").text(response.current.wind_speed);
        $("#uvIndex").text(response.current.uvi);
    });

};

//click listener for save cities list
$("li").on("click", function() {
    placeName = this.innerHTML;
    getLocation();
});