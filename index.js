//using the API form openweathermap.org.

$(document).ready(function(){
    var elms = {
        backgroundImg : $(".backgroundImgContainer"),
        title: $("h1.title"),
        city: $("p.city"),
        currentWeather: $("p.currentWeather")
    };


    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
            $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=a6962f458611362a2ba095476afa36fc', function(json){
                if(json){
                    elms.city.text("Current City: "+json.name);
                    elms.currentWeather.text("Current Weather: " + json.weather[0].main);
                    console.log(json);
                    console.log(json.weather);
                    switch (json.weather[0].main){
                        case "Rain":
                            console.log("rainy");
                            elms.backgroundImg.addClass("rain");
                            break;
                        case "Clear":
                            console.log("Clear");
                            elms.backgroundImg.addClass("clear");
                            break;
                    }
                }
            });
        });
    } else {
        elms.title.text("Location is not available");
    }


});