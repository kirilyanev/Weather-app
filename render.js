import { html, render } from "./node_modules/lit-html/lit-html.js";


const weatherIcon = document.querySelector('.weather-info img');
const tempIcon = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const cityName = document.querySelector('#city-name');
const stateName = document.querySelector('#state-name');
const humidityElement = document.querySelector('#humidity');
const pressureElement = document.querySelector('#pressure');
const dateElement = document.querySelector('#today');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
let date;

// LIT-HTML
const tableElement = document.querySelector('.weather-forecast');

function dateInfo(weatherData) {
  const unixTimestamp = weatherData.dt;
  date = new Date(unixTimestamp * 1000);
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

  cityName.textContent = weatherData.name;
  stateName.textContent = 'State: ' + weatherData.sys.country;
  humidityElement.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
  pressureElement.textContent = 'Pressure: ' + weatherData.main.pressure + ' mb';

  dateElement.textContent = `${date[0]}  ${date[1]}`;
  // console.log(weatherData);
}

async function renderForecastData(forecastData) {
  const month = months[date.getMonth() + 1];
  const day = date.getDate();

  const template = (data) => html`
    <p id="month">${month}</p>
    <table>
    <tr>
        <th>${day}</th>
        <th>${day + 1}</th>
        <th>${day + 2}</th>
        <th>${day + 3}</th>
        <th>${day + 4}</th>
      </tr>
      <tr>
        <th>${weekDays[date.getDay()]}</th>
        <th>${weekDays[date.getDay() + 1]}</th>
        <th>${weekDays[date.getDay() + 2]}</th>
        <th>${weekDays[date.getDay() + 3]}</th>
        <th>${weekDays[date.getDay() + 4]}</th>
      </tr>
      <tr>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
      </tr>
      <tr>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
      </tr>
      <tr>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
      </tr>
      <tr>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
      </tr>
      <tr>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
      </tr>
      <tr>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
      </tr>
      <tr>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
      </tr>
      <tr>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
        <td>hh - temp - img</td>
      </tr>
    </table>
    `;

  render(template(forecastData), tableElement);
  console.log(forecastData);
}

export const renderCurrentWeather = renderWeatherData;
export const renderForecast = renderForecastData;