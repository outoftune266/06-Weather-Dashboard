//Global Variables
let locations = [];
let lat;
let lon;
let placeName;

//Adds input box to list of cities - new items are currently not clickable
$("button").on("click", function() {
    if ($("#searchInput").val() !== "") {
    let newCity = $("#searchInput").val();
    let list = $("<li>");
    list.attr("class", "list-group-item");
    list.text(newCity);
    $("ul").prepend(list);
    };
})

//click listener for save cities list
$("li").on("click", function() {
    placeName = this.innerHTML;
    getLocation();
});

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
    let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=757976158322ce33a69d16ccf3339824";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });

};

