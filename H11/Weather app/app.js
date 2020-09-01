
// Используемый ключ API
const key = "ccb46444921a3b1355449a8ca723eb55";

// Получаем нужные элементы в HTML файле
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// Данные приложения
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// КЕЛВИН
const KELVIN = 273;


// Запрос данных геолокации в браузере

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// Установление геопозиции пользователя

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// Вывод сообщения об ошибке на экран

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Запрашиваем погоду с сервера и обрабатываем запрос

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;  //`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ccb46444921a3b1355449a8ca723eb55` - тестовая строка с сайта. 100% рабочая. Погода в Лондоне
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.round(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;                                //data.weather[0]['description']
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// Выводим данные на экран
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Перевводим C в F (*)
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// (*) - Переход между с-мами измерений, реакция на клик пользователя
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

