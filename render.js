
const weatherIcon = document.querySelector('.weather-info img');
const tempIcon = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const cityName = document.querySelector('#city-name');
const stateName = document.querySelector('#state-name');
const humidityElement = document.querySelector('#humidity');
const pressureElement = document.querySelector('#pressure');
const dateElement = document.querySelector('#today');

function dateInfo(weatherData) {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const unixTimestamp = weatherData.dt;
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayOfWeek = weekDays[date.getDay()];
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    const formattedDate = `${dayOfWeek} ${day} - ${months[month]} - ${year}`;
    console.log(formattedTime);
    const result = [formattedTime, formattedDate];

    return result;
}

async function renderWeatherData(weatherData) {
    const iconCode = weatherData.weather[0].icon;
    // Celsius = Kelvin – 273.15
    const temp = (Number(weatherData.main.temp) - 273.15).toFixed(1);
    const weatherDescription = weatherData.weather[0].description;

    const date = dateInfo(weatherData);


    weatherIcon.src = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    tempIcon.textContent = temp + '°C';
    descriptionElement.textContent = weatherDescription;

    cityName.textContent = 'City: ' + weatherData.name;
    stateName.textContent = 'State: ' + weatherData.sys.country;
    humidityElement.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
    pressureElement.textContent = 'Pressure: ' + weatherData.main.pressure + ' mb';

    dateElement.textContent = `${date[0]}  ${date[1]}`;
    // console.log(weatherData);
}

async function renderForecastData(forecastData) {
    console.log(forecastData);
}

export const renderCurrentWeather = renderWeatherData;
export const renderForecast = renderForecastData;