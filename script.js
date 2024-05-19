document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (city) {
        const apiKey = 'a6b3ef1a7beee093f0ae56d83f12390c';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    const weatherDescription = data.weather[0].description.toLowerCase();
                    const weatherImage = document.getElementById('weatherImage');
                    let imagePath = '';

                    if (weatherDescription.includes('clear')) {
                        imagePath = '/images/clear.png';
                    } else if (weatherDescription.includes('clouds')) {
                        imagePath = '/images/clouds.png';
                    } else if (weatherDescription.includes('drizzle')) {
                        imagePath = '/images/drizzle.png';
                    } else if (weatherDescription.includes('rain')) {
                        imagePath = '/images/rain.png';
                    } else if (weatherDescription.includes('snow')) {
                        imagePath = '/images/snow.png';
                    } else if (weatherDescription.includes('mist') || weatherDescription.includes('fog')) {
                        imagePath = '/images/mist.png';
                    } else if (weatherDescription.includes('wind')) {
                        imagePath = '/images/wind.png';
                    } else if (weatherDescription.includes('humidity')) {
                        imagePath = '/images/humidity.png';
                    } else {
                        imagePath = '/images/default.png'; // Fallback image
                    }

                    weatherImage.src = imagePath;

                    const weatherData = `
                        <h2>${data.name}</h2>
                        <p>Temperature: ${data.main.temp} °C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                    `;
                    document.getElementById('weatherResult').innerHTML = weatherData;
                } else {
                    document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
                }
            })
            .catch(error => {
                document.getElementById('weatherResult').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
                console.error('Error:', error);
            });
    } else {
        document.getElementById('weatherResult').innerHTML = '<p>Please enter a city name</p>';
    }
    var weatherResult=document.getElementById("weatherResult")
     weatherResult.style.display="block"

    
});
