import { getData } from "./api.js";

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

    renderForecastData(data[0]);
}

async function renderForecastData(data) {
    
    const lat = data.lat;
    const lon = data.lon;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4ac8da0dc9053f374e5e587c102978a9`);
    const forecastData = await response.json();
    console.log(forecastData);
}
