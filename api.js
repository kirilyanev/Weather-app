// TO ADD TRY CATCH IN API CALLS - DONE
// TO TEST TRY CATCH IN API CALLS

const host = 'https://api.openweathermap.org/geo/1.0/direct?q=';

async function request(url) {
    try {
        const response = await fetch(host + url);
        const result = await response.json();

        return result;
    } catch (error) {
        alert(error);
    }
}

async function currentWeather(data) {
    try {
        if (data === undefined) {
            throw new Error('Enter a valid city');
        }
    
        const lat = data.lat;
        const lon = data.lon;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4ac8da0dc9053f374e5e587c102978a9`);
        const currentWeather = await response.json();

        return currentWeather;
    } catch (error) {
        alert (error);
        // location.reload();
        // throw error;
    }
}

async function hourlyForecast(data) {
    try {
        const lat = data.lat;
        const lon = data.lon;
    
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=4ac8da0dc9053f374e5e587c102978a9`);
        const hourlyForecast = await response.json();
    
        return hourlyForecast;
    } catch (error) {
        alert(error);
    }
}


export const getData = request;
export const getCurrentWeather = currentWeather;
export const getHourlyForecast = hourlyForecast;