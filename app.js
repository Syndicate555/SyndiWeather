window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );

    // Assigning Data retrieved from API to appropriate html spots

    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    let future = document.querySelector('.Information');
    let dewpoint = document.querySelector('#Dewpoint');
    let humidity1 = document.querySelector('#Humidity');
    let pressure1 = document.querySelector('#Pressure');
    let windspeed = document.querySelector('#Windspeed');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            // API call from darksky.net
            // then replacing the custom longitude and lattitude
            // a proxy is being used because darksky does not allow api calls from local hosts

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/82c1d77f0236b39365ab6263cf963081/${lat},${long}`;

            //Fetching data from the API

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data); //Displays the entire dataset retrieved from the API
                    const { temperature, icon, dewPoint, humidity, pressure, windSpeed } = data.currently;
                    const { summary } = data.hourly;
                    future.textContent = summary;
                    dewpoint.textContent = dewPoint;
                    humidity1.textContent = humidity;
                    pressure1.textContent = pressure;
                    windspeed.textContent = windSpeed;
                    temperatureDegree.textContent = temperature;
                    //temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;

                    //Formula for Celsius

                    let celsius = (temperature - 32) * (5 / 9);

                    //Setting Icon
                    setIcons(icon, document.querySelector(".icon")); // Fucntion Call 

                    // Change temperature to Celcius/Farenheit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

                });
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // Changing the format of the icon from the API, to match the format of the skycons.
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});