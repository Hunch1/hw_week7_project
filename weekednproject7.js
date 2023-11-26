const getData = async (cityName) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=317e310a9ae952e16f921806e49a4c44&units=imperial
    `)
    const data = await response.json();
    return data;
}

const weatherList = (country, highTemp, lowTemp, description, humidity) => {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<div class="weatherBox">
                            <p>Country: ${country}</p>
                            </div>
                            <div class="weatherBox">
                            <p>High Temperature: ${highTemp} °F</p>
                            </div>
                            <div class="weatherBox">
                            <p>Low Temperature: ${lowTemp} °F</p>
                            </div>
                            <div class="weatherBox">
                            <p>Forecast: ${description}</p>
                            </div>
                            <div class="weatherBox">
                            <p>Humidity: ${humidity}%</p>
                            </div>`;
};


const loadData = async (event) => {
    event.preventDefault();
    let queryCity = document.querySelector("#cityName").value;
    try {
        const weatherData = await getData(queryCity);
        const highTemp = weatherData.main.temp_max;
        const lowTemp = weatherData.main.temp_min;
        const description = weatherData.weather[0].description;
        const humidity = weatherData.main.humidity;

        weatherList(weatherData.sys.country, highTemp, lowTemp, description, humidity);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const getWeatherButton = document.getElementById('getWeatherButton');
        getWeatherButton.addEventListener('click', loadData);