import { getData } from "./api.js";
import { getCurrentWeather } from "./api.js";
import { getHourlyForecast } from "./api.js";
import { renderCurrentWeather } from "./render.js";
import { renderForecast } from "./render.js";

const selectElement = document.querySelector('select');
const nextButton = document.querySelector('button');
nextButton.addEventListener('click', initialRender);


async function addOptions() {
    let countryesData = {};

    const input = document.querySelector('input');
    const cityName = input.value;

    // If no input return
    if (cityName === '') {
        return;
    }
    const url = `${cityName}&limit=10&appid=4ac8da0dc9053f374e5e587c102978a9`;
    const citiesData = await getData(url);

    selectElement.innerHTML = '';

    citiesData.forEach(cityData => {
        if (!countryesData.hasOwnProperty(cityData.country)) {

            countryesData[cityData.country] = {
                name: cityData.name,
                lat: cityData.lat,
                lon: cityData.lon
            }
            const option = document.createElement('option');
            option.textContent = cityData.country;
            selectElement.appendChild(option);

            selectElement.addEventListener('change', async function handleChange(event) {
                const country = event.target.value // 👉️ get selected VALUE

                const currentWeatherData = await getCurrentWeather(countryesData[country]);
                const forecastData = await getHourlyForecast(countryesData[country]);

                renderCurrentWeather(currentWeatherData);
                renderForecast(forecastData);
            });
        }
    });

    return citiesData;
}


async function initialRender() {

    const citiesData = await addOptions();

    const currentWeatherData = await getCurrentWeather(citiesData[0]);
    const forecastData = await getHourlyForecast(citiesData[0]);

    renderCurrentWeather(currentWeatherData);
    renderForecast(forecastData);
}
