const errorText = document.querySelector('.error');
const loader = document.querySelector('.loader');
const weather = document.querySelector('.weather');
const form = document.querySelector(`form`);
const input = document.querySelector(`form input`);
const loc = document.querySelector('.location');
const country = document.querySelector('.country');
const city = document.querySelector('.city');
const deg = document.querySelector('.deg');
const icon = document.querySelector('.icon');
const condition = document.querySelector('.condition');
const currentTime = document.querySelector('.time');
const lastUpdated = document.querySelector('.last-updated');
let errorMessage = ``;
const getWeather = async (cityName) => {
  try {
    loader.style.display = 'block';
    weather.style.display = 'none';
    errorText.style.display = 'none';
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=ce0cffa066684e06a3b220410212509&q=${cityName}`
    );
    const data = await res.json();
    if (data.error) {
      errorMessage = data.error.message;
    }
    country.innerHTML = data.location.country;
    city.innerHTML = data.location.name;
    deg.innerHTML = data.current.temp_c;
    icon.src = data.current.condition.icon;
    condition.innerHTML = data.current.condition.text;
    currentTime.innerHTML = data.location.localtime;
    lastUpdated.innerHTML = data.current.last_updated;
    weather.style.display = `block`;
    loader.style.display = 'none';
  } catch (error) {
    loader.style.display = 'none';
    weather.style.display = 'none';
    errorText.style.display = 'block';
    errorText.innerHTML = errorMessage;
    setTimeout(() => {
      errorText.style.display = 'none';
    }, 4000);
  }
};
form.addEventListener(`submit`, function (e) {
  e.preventDefault();
  getWeather(input.value.trim());
  input.value = ``;
});
