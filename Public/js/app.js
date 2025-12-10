var WEATHER_API_KEY = "/weather";
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

const currentDate = new Date();
const options = { month: 'long'};
const monthName = currentDate.toLocaleDateString('en-US', options);


dateElement.textContent = currentDate.getDate() + " " + monthName;

// Function to fetch and display weather data
const showData = (city) => {
    fetch(`${WEATHER_API_KEY}?address=${encodeURIComponent(city)}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Weather data:', data);
            // Check if API returned an error (cod: '404')
            if (data.cod === '404' || data.error) {
                throw new Error('City not found');
            }
            // Update temperature
            tempElement.textContent = Math.round(data.main.temp - 273.15) + '°C';
            // Update weather condition
            weatherCondition.textContent = data.weather[0].main;
            // Update location
            locationElement.textContent = data.name + ', ' + data.sys.country;
            // Update weather icon (using weather icon classes)
            weatherIcon.className = 'wi wi-owm-' + data.weather[0].id;
        })
        .catch((error) => {
            console.error('Error:', error);
            weatherCondition.textContent = 'City Not Found';
            tempElement.textContent = '';
            locationElement.textContent = '';
        });
};

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        showData(city);
    }
});
