// TO ADD TRY CATCH IN API CALLS

const host = 'http://api.openweathermap.org/geo/1.0/direct?q=';

async function request(url) {
    const response = await fetch(host + url);
    const result = await response.json();
    return result;
}


async function currentWeather(data) {
    const lat = data.lat;
    const lon = data.lon;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4ac8da0dc9053f374e5e587c102978a9`);
    const currentWeather = await response.json();
        
    return currentWeather;
}

async function hourlyForecast(data) {
    const lat = data.lat;
    const lon = data.lon;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4ac8da0dc9053f374e5e587c102978a9`);
    const hourlyForecast = await response.json();

    return hourlyForecast;
}


export const getData = request;
export const getCurrentWeather = currentWeather;
export const getHourlyForecast = hourlyForecast;