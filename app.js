import { getData } from "./api.js";

const weatherIcon = document.querySelector('.weather-info img');
const tempIcon = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const cityName = document.querySelector('#city-name');
const stateName = document.querySelector('#state-name');
const humidityElement = document.querySelector('#humidity');
const pressureElement = document.querySelector('#pressure');

const selectElement = document.querySelector('select');
const nextButton = document.querySelector('button');
nextButton.addEventListener('click', getCountryes);

// TO ADD EVENTLISTENER ONCHANGE TO selectElement;

async function getCountryes() {
    let countryesData = {};
    
    const input = document.querySelector('input');
    const cityName = input.value;

    // If no input return
    if (cityName === '') {
        return;
    }
    const url = `${cityName}&limit=10&appid=4ac8da0dc9053f374e5e587c102978a9`;
    const data = await getData(url);

    selectElement.innerHTML = '';

    data.forEach(cityData => {
        if (!countryesData.hasOwnProperty(cityData.country)) {

            countryesData[cityData.country] = {
                name: cityData.name,
                lat: cityData.lat,
                lon: cityData.lon
            }
            const option = document.createElement('option');
            option.textContent = cityData.country;
            selectElement.appendChild(option);
        }
    });

    const weatherData = await getForecastData(data[0]);
    renderWeatherData(weatherData)
}

async function getForecastData(data) {
    
    const lat = data.lat;
    const lon = data.lon;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4ac8da0dc9053f374e5e587c102978a9`);
    const forecastData = await response.json();
    
    return forecastData;
}

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

    console.log(weatherData);
}
