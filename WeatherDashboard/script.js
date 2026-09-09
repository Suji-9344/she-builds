const API_KEY = "8b50f9b7d4fee974d31f47f5d6a5480d";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const message = document.getElementById("message");
    const weatherCard = document.getElementById("weatherCard");

    // Check empty input
    if (city === "") {
        message.textContent = "⚠️ Please enter a city name.";
        weatherCard.style.display = "none";
        return;
    }

    message.textContent = "⏳ Loading weather data...";

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        console.log("Request URL:", url);

        const response = await fetch(url);

        console.log("HTTP Status:", response.status);

        const data = await response.json();

        console.log("API Response:", data);

        // API key problem
        if (response.status === 401) {
            throw new Error(
                "Invalid API key or API key is not activated yet."
            );
        }

        // City not found
        if (response.status === 404) {
            throw new Error(
                "City not found. Please enter a valid city name."
            );
        }

        // Other API errors
        if (!response.ok) {
            throw new Error(
                data.message || "Unable to fetch weather data."
            );
        }

        // Display city
        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        // Display temperature
        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        // Display weather condition
        document.getElementById("condition").textContent =
            data.weather[0].description;

        // Display humidity
        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        // Display wind speed
        document.getElementById("windSpeed").textContent =
            `${data.wind.speed} m/s`;

        // Display icon
        document.getElementById("weatherIcon").textContent =
            getWeatherEmoji(data.weather[0].main);

        // Remove error message
        message.textContent = "";

        // Show weather card
        weatherCard.style.display = "block";

    }

    catch (error) {

        console.error("Weather Error:", error);

        message.textContent = "❌ " + error.message;

        weatherCard.style.display = "none";
    }
}


function getWeatherEmoji(condition) {

    switch (condition) {

        case "Clear":
            return "☀️";

        case "Clouds":
            return "☁️";

        case "Rain":
            return "🌧️";

        case "Drizzle":
            return "🌦️";

        case "Thunderstorm":
            return "⛈️";

        case "Snow":
            return "❄️";

        case "Mist":
        case "Fog":
        case "Haze":
            return "🌫️";

        default:
            return "🌤️";
    }
}