import request from "request";
import dotenv from "dotenv";

dotenv.config();

const openWeatherMapApi = {
    BASE_URL: "http://api.openweathermap.org/data/2.5/weather",
    API_KEY: process.env.WEATHER_API_KEY 
};

const weatherData = (address, callback) => {
    const url = `${openWeatherMapApi.BASE_URL}?q=${encodeURIComponent(address)}&appid=${openWeatherMapApi.API_KEY}`;
    console.log(url);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to fetch weather data. Please try again! " + error);
        } else {
            callback(false, body);
        }
    });
};

export default weatherData;
