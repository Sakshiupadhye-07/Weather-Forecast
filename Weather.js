// Weather.js
const apiKey = "f4050d8896a9ffd0c1a266d5184811ef";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const videoElement = document.getElementById('bg-video');
const videoSource = document.getElementById('video-source');

const videoUrls = {
    Clouds: 'images/cloud.mp4',
    Clear: 'images/clear.mp4',
    Rain: 'images/rain.mp4',
    Drizzle: 'images/drizzle.mp4',
    Mist: 'images/mist.mp4',
    Snow: 'images/snow.mp4'
};

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").innerHTML = "City name is invalid";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        const weatherCondition = data.weather[0].main;
        if(weatherCondition in videoUrls){
            videoSource.src = videoUrls[weatherCondition];
            videoElement.load();
        }

        switch(weatherCondition) {
            case 'Clouds':
                weatherIcon.src = "images/clouds.png";
                break;
            case 'Clear':
                weatherIcon.src = "images/clear.png";
                break;
            case 'Rain':
                weatherIcon.src = "images/rain.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "images/drizzle.png";
                break;
            case 'Mist':
                weatherIcon.src = "images/mist.png";
                break;
            case 'Snow':
                weatherIcon.src = "images/snow.png";
                break;
            default:
                break;
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

function handleEvent(event) {
    if (event.type === 'click' || (event.type === 'keypress' && event.key === 'Enter')) {
        checkWeather(searchBox.value);
    }
}

searchBtn.addEventListener("click", handleEvent);
searchBox.addEventListener("keypress", handleEvent);
