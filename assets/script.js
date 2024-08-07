//Global Variables
let locations = [];
let lat;
let lon;
let placeName;
let timestamp;
let convdataTime;
let image;

//retrieves location list from localstorage and display
//if no local storage exists default cities are assigned
getCities();
function getCities() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    locations = storedCities;
  } else {
    locations = ["Oklahoma City, OK", "Nashville, TN"];
  }
  displayCities();
}

//displays list of cities
function displayCities() {
  for (var i = 0; i < locations.length; i++) {
    let newCity = $("<li>");
    newCity.text(locations[i]);
    newCity.attr("class", "list-group-item");
    $("ul").prepend(newCity);
  }
}

//grabs frist city from list and calls funciton to display weather info
$("#cityName").text($("li")[0].innerHTML);
placeName = $("li")[0].innerHTML;
getLocation();

//Adds input box to list of cities - new items are currently not clickable
$("button").on("click", function () {
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
  }
});

// convert Unix Timecode to date
function convert(timestamp) {
  // Unixtimestamp
  var unixtimestamp = timestamp;

  // Convert timestamp to milliseconds
  var date = new Date(unixtimestamp * 1000);

  convdataTime =
    date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

  //console.log(convdataTime);
}

//Takes search input and gets Lat/Long to pass to getWeather fuction
function getLocation() {
  let queryURL =
    "https://api.opencagedata.com/geocode/v1/json?q=" +
    placeName +
    "&key=c8fc06cad34b41b28866980ffe8bd9fb";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //console.log(response);
    lat = response.results[0].geometry.lat;
    lon = response.results[0].geometry.lng;
    getWeather();
  });
}

//Gets and displayes weather info for specified Lat/Long
function getWeather() {
  let queryURL =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=33f1008b0d6651bc6ebbe0a72f84380c";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    //displays current forecast info
    timestamp = response.current.dt;
    convert(timestamp);
    $("#cityName").text(placeName + "   (" + convdataTime + ")");
    image = response.current.weather[0].icon;
    $("#currentImage").attr(
      "src",
      "http://openweathermap.org/img/wn/" + image + ".png"
    );
    $("#temp").text("Temperature: " + response.current.temp + " F");
    $("#humidity").text("Humidity: " + response.current.humidity + "%");
    $("#windSpeed").text("Wind Speed: " + response.current.wind_speed + " MPH");
    $("#uvIndex").text("UV Index: " + response.current.uvi);

    //displays 5-day forecast info
    for (var i = 1; i < 6; i++) {
      timestamp = response.daily[i].dt;
      convert(timestamp);
      $("#cardDate" + i).text(convdataTime);
      image = response.daily[i].weather[0].icon;
      console.log(image);
      $("#cardImage" + i).attr(
        "src",
        "http://openweathermap.org/img/wn/" + image + ".png"
      );
      $("#cardTemp" + i).text("Temp: " + response.daily[i].temp.max + " F");
      $("#cardHum" + i).text("Humidity: " + response.daily[i].humidity + "%");
    }
  });
}

//click listener for save cities list
$("li").on("click", function () {
  placeName = this.innerHTML;
  getLocation();
});
