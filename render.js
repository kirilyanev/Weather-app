
const weatherIcon = document.querySelector('.weather-info img');
const tempIcon = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const cityName = document.querySelector('#city-name');
const stateName = document.querySelector('#state-name');
const humidityElement = document.querySelector('#humidity');
const pressureElement = document.querySelector('#pressure');


async function renderWeatherData(weatherData) {
    const iconCode = weatherData.weather[0].icon;
    // Celsius = Kelvin – 273.15
    const temp = (Number(weatherData.main.temp) - 273.15).toFixed(1);
    const weatherDescription = weatherData.weather[0].description;

    weatherIcon.src = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    tempIcon.textContent = temp + '°C';
    descriptionElement.textContent = weatherDescription;
    
    cityName.textContent = 'City: ' + weatherData.name; 
    stateName.textContent = 'State: ' + weatherData.sys.country;
    humidityElement.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
    pressureElement.textContent = 'Pressure: ' + weatherData.main.pressure + ' mb';

    // console.log(weatherData);
}

async function renderForecastData(forecastData) {
    console.log(forecastData);
}

export const renderCurrentWeather = renderWeatherData;
export const renderForecast = renderForecastData;