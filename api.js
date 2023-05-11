

const host = 'http://api.openweathermap.org/geo/1.0/direct?q=';

async function request(url) {
    const response = await fetch(host + url);
    const result = await response.json();
    return result;
}

export const getData = request;