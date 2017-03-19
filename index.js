

//my api from the openweathermap.org, including API key.
//http://api.openweathermap.org/data/2.5/weather?q=aarhus,uk&appid=a6962f458611362a2ba095476afa36fc

$(document).ready(function(){

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
        });
    } else {

    }

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=aarhus,uk&appid=a6962f458611362a2ba095476afa36fc', function(json){
        if(json){
            console.log(json);
        }
    });

});