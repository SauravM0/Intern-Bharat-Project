const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const clearSound = new Audio('sounds/summer.mp3');
const rainSound = new Audio('sounds/rainy.mp3');
const snowSound = new Audio('sounds/snow.mp3');
const cloudSound = new Audio('sounds/cloud.mp3');
const hazeSound = new Audio('sounds/mist.mp3');

search.addEventListener('click', () => {

    const APIKey = 'YOUR API KEY';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&in&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                return;
            }

            error404.style.display = 'none';

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    clearSound.play();
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    rainSound.play();
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    snowSound.play();
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    cloudSound.play();
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    hazeSound.play();
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            container.style.height = '590px';

            weatherBox.addEventListener('transitionend', () => {
                clearSound.pause();
                rainSound.pause();
                snowSound.pause();
                cloudSound.pause();
                hazeSound.pause();
            });

            setTimeout(() => {
                clearSound.pause();
                clearSound.currentTime = 0;
                rainSound.pause();
                rainSound.currentTime = 0;
                snowSound.pause();
                snowSound.currentTime = 0;
                cloudSound.pause();
                cloudSound.currentTime = 0;
                hazeSound.pause();
                hazeSound.currentTime = 0;
            }, 10000);



        });


});
