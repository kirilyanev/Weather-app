import { html, render } from "node_modules/lit-html/lit-html.js";
// import { html, render } from 'https://unpkg.com/lit-html?module';


const weatherIcon = document.querySelector('.weather-info img');
const tempIcon = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const cityName = document.querySelector('#city-name');
const stateName = document.querySelector('#state-name');
const humidityElement = document.querySelector('#humidity');
const pressureElement = document.querySelector('#pressure');
const windElement = document.querySelector('#wind');
const dateElement = document.querySelector('#today');

const additionalInfoElement = document.querySelector('.additional-info');
const currentDayElement = document.querySelector('.current-day');


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
  additionalInfoElement.style.display = 'block';
  currentDayElement.style.display = 'inline-block';

  const iconCode = weatherData.weather[0].icon;
  // Celsius = Kelvin – 273.15
  const temp = (Number(weatherData.main.temp) - 273.15).toFixed(1);
  const weatherDescription = weatherData.weather[0].description;
  const formatedDate = dateInfo(weatherData);

  weatherIcon.src = 'http://openweathermap.org/img/w/' + iconCode + '.png';
  tempIcon.textContent = temp + '°C';
  descriptionElement.textContent = weatherDescription;

  cityName.textContent = `${weatherData.name},`;
  stateName.textContent = `${weatherData.sys.country}`;
  humidityElement.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
  pressureElement.textContent = 'Pressure: ' + weatherData.main.pressure + ' mb';
  windElement.textContent = `Wind speed and course: ${weatherData.wind.speed} kn | ${weatherData.wind.deg}°`;

  dateElement.textContent = `${formatedDate[0]}  ${formatedDate[1]}`;
}

async function renderForecastData(forecastData) {
  const month = months[date.getMonth() + 1];
  const day = date.getDate();

  
  // Necessary for the calculation of the starting grid in forecast table according to the received data from the API
  const forecastStartHour = forecastData.list[0].dt_txt.split(' ')[1].slice(0, 2);
  // Hours and a number, used to skip first forecast hours data received by the server, if necessary
  const startTdPosition = {
    '00': 0,
    '03': -1,
    '06': -2,
    '09': -3,
    '12': -4,
    '15': -5,
    '18': -6,
    '21': -7
  }
  let n = startTdPosition[forecastStartHour];


  const template = (data) => html`
    <p id="month">${month}</p>
    <table>
      <tr>
        <th></th>
        <th>${day}</th>
        <th>${day + 1}</th>
        <th>${day + 2}</th>
        <th>${day + 3}</th>
        <th>${day + 4}</th>
      </tr>
      <tr>
        <th>HOURS</th>
        <th>${weekDays[date.getDay()]}</th>
        <th>${weekDays[date.getDay() + 1]}</th>
        <th>${weekDays[date.getDay() + 2]}</th>
        <th>${weekDays[date.getDay() + 3]}</th>
        <th>${weekDays[date.getDay() + 4]}</th>
      </tr>
      <tr>
        <!-- SAMPLE TEMPLATE FOR HOURLY FORECAST -->
        <th>
          <div id="hours-forecast">
            <!-- ${hourTemplate(data, 0)} -->
            00 h
          </div>
        </th>
        ${trTemplate(data, n)}
        ${trTemplate(data, n + 8)}
        ${trTemplate(data, n + 16)}
        ${trTemplate(data, n + 24)}
        ${trTemplate(data, n + 32)}
      </tr>
      <tr>
        <th>
          <div id="hours-forecast">
            03 h
          </div>
        </th>
        ${trTemplate(data, n + 1)}
        ${trTemplate(data, n + 9)}
        ${trTemplate(data, n + 17)}
        ${trTemplate(data, n + 25)}
        ${trTemplate(data, n + 33)}
      </tr>
      <tr>
        <th>
          <div id="hours-forecast">
            06 h
          </div>
        </th>
        ${trTemplate(data, n + 2)}
        ${trTemplate(data, n + 10)}
        ${trTemplate(data, n + 18)}
        ${trTemplate(data, n + 26)}
        ${trTemplate(data, n + 34)}
      </tr>
      <tr>
        <th>
          <div id="hours-forecast">
            09 h
          </div>
        </th>
        ${trTemplate(data, n + 3)}
        ${trTemplate(data, n + 11)}
        ${trTemplate(data, n + 19)}
        ${trTemplate(data, n + 27)}
        ${trTemplate(data, n + 35)}
      </tr>
      <tr>
        <th>
          <div id="hours-forecast">
            12 h
          </div>
        </th>
        ${trTemplate(data, n + 4)}
        ${trTemplate(data, n + 12)}
        ${trTemplate(data, n + 20)}
        ${trTemplate(data, n + 28)}
        ${trTemplate(data, n + 36)}
      </tr>
      <tr>
        <th>
          <div id="hours-forecast">
            15 h
          </div>
        </th>
        ${trTemplate(data, n + 5)}
        ${trTemplate(data, n + 13)}
        ${trTemplate(data, n + 21)}
        ${trTemplate(data, n + 29)}
        ${trTemplate(data, n + 37)}
      </tr>
      <tr>
        <th>
          <div id="hours-forecast">
            18 h
          </div>
        </th>
        ${trTemplate(data, n + 6)}
        ${trTemplate(data, n + 14)}
        ${trTemplate(data, n + 22)}
        ${trTemplate(data, n + 30)}
        ${trTemplate(data, n + 38)}
      </tr>
      <tr>
        <th>
          <div id="hours-forecast">
            21 h
          </div>
        </th>
        ${trTemplate(data, n + 7)}
        ${trTemplate(data, n + 15)}
        ${trTemplate(data, n + 23)}
        ${trTemplate(data, n + 31)}
        ${trTemplate(data, n + 39)}
      </tr>
    </table>
    `;

  render(template(forecastData), tableElement);
}

const hourTemplate = (data, n) => {
  return `${(data.list[n].dt_txt.split(' ')[1]).slice(0, 2) + ' h'}`;
}

const tempTemplate = (data, n) => {
  return `${(data.list[n].main.temp - 273.15).toFixed(1) + 'C°'}`;
}

const imgTemplate = (data, n) => {
  return `${'http://openweathermap.org/img/w/' + data.list[n].weather[0].icon + '.png'}`
}

const trTemplate = (data, n) => n >= 0 ? html`
  <td>
    <div id="temp-forecast">
      ${tempTemplate(data, n,)}
    </div>
    <img src="${imgTemplate(data, n)}" alt="Rain icon" class="icon">
  </td>` : html`<div id="no-data">N/A</div>`;


export const renderCurrentWeather = renderWeatherData;
export const renderForecast = renderForecastData;