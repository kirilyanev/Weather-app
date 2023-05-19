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
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];
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

  const formatedDate = dateInfo(weatherData);


  weatherIcon.src = 'http://openweathermap.org/img/w/' + iconCode + '.png';
  tempIcon.textContent = temp + '°C';
  descriptionElement.textContent = weatherDescription;

  cityName.textContent = weatherData.name;
  stateName.textContent = 'State: ' + weatherData.sys.country;
  humidityElement.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
  pressureElement.textContent = 'Pressure: ' + weatherData.main.pressure + ' mb';

  dateElement.textContent = `${formatedDate[0]}  ${formatedDate[1]}`;
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
        <!-- SAMPLE TEMPLATE FOR HOURLY FORECAST -->
        ${trTemplate(data, 0)}
        ${trTemplate(data, 8)}
        ${trTemplate(data, 16)}
        ${trTemplate(data, 24)}
        ${trTemplate(data, 32)}
      </tr>
      <tr>
        ${trTemplate(data, 1)}
        ${trTemplate(data, 9)}
        ${trTemplate(data, 17)}
        ${trTemplate(data, 25)}
        ${trTemplate(data, 33)}
      </tr>
      <tr>
        ${trTemplate(data, 2)}
        ${trTemplate(data, 10)}
        ${trTemplate(data, 18)}
        ${trTemplate(data, 26)}
        ${trTemplate(data, 34)}
      </tr>
      <tr>
        ${trTemplate(data, 3)}
        ${trTemplate(data, 11)}
        ${trTemplate(data, 19)}
        ${trTemplate(data, 27)}
        ${trTemplate(data, 35)}
      </tr>
      <tr>
        ${trTemplate(data, 4)}
        ${trTemplate(data, 12)}
        ${trTemplate(data, 20)}
        ${trTemplate(data, 28)}
        ${trTemplate(data, 36)}
      </tr>
      <tr>
        ${trTemplate(data, 5)}
        ${trTemplate(data, 13)}
        ${trTemplate(data, 21)}
        ${trTemplate(data, 29)}
        ${trTemplate(data, 37)}
      </tr>
      <tr>
        ${trTemplate(data, 6)}
        ${trTemplate(data, 14)}
        ${trTemplate(data, 22)}
        ${trTemplate(data, 30)}
        ${trTemplate(data, 38)}
      </tr>
      <tr>
        ${trTemplate(data, 7)}
        ${trTemplate(data, 15)}
        ${trTemplate(data, 23)}
        ${trTemplate(data, 31)}
        ${trTemplate(data, 39)}
      </tr>
    </table>
    `;

  render(template(forecastData), tableElement);
  // console.log(forecastData);
}


// SAMPLE TEMPLATE
{/* <td>
<div>
  ${(data.list[0].dt_txt.split(' ')[1]).slice(0, 2) + ' h'}
</div>
<div>
  ${(data.list[0].main.temp - 273.15).toFixed(1) + 'C°'}
</div>
<img src="${'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png'}" alt="Rain icon"
  class="icon">
</td> */}

const hourTemplate = (data, n) => {
  return `${(data.list[n].dt_txt.split(' ')[1]).slice(0, 2) + ' h'}`;
}

const tempTemplate = (data, n) => {
  return `${(data.list[n].main.temp - 273.15).toFixed(1) + 'C°'}`;
}

const imgTemplate = (data, n) => {
  return `${'http://openweathermap.org/img/w/' + data.list[n].weather[0].icon + '.png'}`
}

const trTemplate = (data, n) => html`
<td>
  <div id="hours-forecast">
    ${hourTemplate(data, n)}
  </div>
  <div id="temp-forecast">
    ${tempTemplate(data, n)}
  </div>
  <img src="${imgTemplate(data, n)}" alt="Rain icon" class="icon">
</td>`



export const renderCurrentWeather = renderWeatherData;
export const renderForecast = renderForecastData;