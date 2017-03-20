//using the API form openweathermap.org.

$(document).ready(function(){
    var elms = {
        backgroundImg : $(".backgroundImgContainer"),
        title: $("h1.title"),
        city: $("p.city"),
        currentWeather: $("p.currentWeather"),
        description: $("p.description"),
        temp: $("p.temp"),
        tempContainer : $("div.tempContainer"),
        tempBtn: $("button.tempBtn"),
        tempMin: $("p.tempMin"),
        tempMax: $("p.tempMax")

    };
    elms.tempContainer.hide();

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=a6962f458611362a2ba095476afa36fc', function(json){
                if(json){
                    elms.city.text("Current City: "+json.name);
                    elms.currentWeather.text("Current Weather: " + json.weather[0].main);
                    elms.description.text("Weather Description: " + json.weather[0].description);
                    var tempInCelsius = toCelsius(json.main.temp),
                        tempMinC = toCelsius(json.main.temp_min),
                        tempMaxC = toCelsius(json.main.temp_max),
                        tempInFahrenheit = toFahrenheit(json.main.temp),
                        tempMinF = toFahrenheit(json.main.temp_min),
                        tempMaxF = toFahrenheit(json.main.temp_max);

                    if (tempInCelsius) {
                        elms.tempContainer.show();
                    } else {
                        elms.tempContainer.hide();
                    }
                    elms.temp.text("Temperature in Celsius: " + tempInCelsius);
                    elms.tempMin.text("Min temperature in Celsius: " + tempMinC);
                    elms.tempMax.text("Max temperature in Celsius: " + tempMaxC);


                    console.log(json);
                    switch (json.weather[0].main){
                        case "Rain":
                            elms.backgroundImg.addClass("rain");
                            break;
                        case "Clear":
                            elms.backgroundImg.addClass("clear");
                            break;
                    }
                }
                elms.tempBtn.click(function(){
                    if (elms.tempBtn.hasClass("fahrenheit")){
                        elms.tempBtn.removeClass("fahrenheit");
                        elms.tempBtn.text("Show temperature in Celsius");
                        elms.temp.text("Temperature in Fahrenheit: " + tempInFahrenheit);
                        elms.tempMin.text("Min temperature in Fahrenheit: " + tempMinF);
                        elms.tempMax.text("Max temperature in Fahrenheit: " + tempMaxF);

                    } else {
                        elms.tempBtn.addClass("fahrenheit");
                        elms.tempBtn.text("Show temperature in Fahrenheit");
                        elms.temp.text("Temperature in Celsius: " + tempInCelsius);
                        elms.tempMin.text("Min temperature in Celsius: " + tempMinC);
                        elms.tempMax.text("Max temperature in Celsius: " + tempMaxC);

                    }
                });
            });
        });
    } else {
        elms.title.text("Location is not available");
    }


    function toFahrenheit(val) {
        //rounding to two decimels.
        return parseFloat(val * (9/5) - 459.67).toFixed(2);
    }

    function toCelsius(val){
        return parseFloat(val - 273.15).toFixed(2);
    }

});