// For temperature in Fahrenheit use units=imperial
// For temperature in Celsius use units=metric

// const API_KEY = config.API_KEY;

let API_KEY;
const btn = document.querySelector('button');
const cityInput = document.querySelector('#city');
const main = document.querySelector('main');
const unitSelect = document.querySelector('.unit');


async function getWeather() {
  try {
    city = cityInput.value;
    console.log(city)
    console.log(API_KEY)
    units = unitSelected();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`)

    const cityData = await response.json();
    displayWeatherData(cityData);
  } catch (error) {
    console.error(error);
  }
}

function displayWeatherData(cityData) {
  cityInput.value = "";
  main.innerText = "";
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const cityDate = new Date(cityData.dt * 1000);
  const datePara = document.createElement('p');
  datePara.innerText = cityDate.toUTCString();
  datePara.classList.add('date');
  cardDiv.appendChild(datePara);
	const cityName = document.createElement("h3");
  cityName.classList.add('name');
	cityName.textContent = `${cityData.name}, ${cityData.sys.country}`
	cardDiv.appendChild(cityName);
  const icon = document.createElement('img');
  icon.classList.add('icon');
  icon.src = `https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`;
  cardDiv.appendChild(icon);
  const temp = document.createElement('span');
  temp.classList.add('temp');
  temp.innerText = `${Math.round(cityData.main.temp)}${units === 'imperial' ? '℉' : '℃'}`;
  const para = document.createElement('p');
  para.classList.add('description');
  para.innerText = `Feels like ${Math.round(cityData.main.feels_like)} ${units === 'imperial' ? '℉' : '℃'}.| ${cityData.weather[0].main}.| ${cityData.weather[0].description}`;
  cardDiv.appendChild(temp);
  cardDiv.appendChild(para);
  const humDew = document.createElement('p');
  humDew.innerText = `Humidity: ${cityData.main.humidity}% | Visibility: ${cityData.visibility} `
  cardDiv.appendChild(humDew);
  const hr = document.createElement('hr');
  cardDiv.appendChild(hr);
  const rise = document.createElement('p');
  const sunrise = new Date(cityData.sys.sunrise * 1000);
  rise.innerHTML = `<strong>Sunrise:</strong> ${sunrise.getHours()}:${sunrise.getMinutes()} `;
  cardDiv.appendChild(rise);
  const set = document.createElement('p');
  const sunset = new Date(cityData.sys.sunset * 1000);
  set.innerHTML = `<strong>Sunset:</strong> ${sunset.getHours()}:${sunset.getMinutes()}`;
  cardDiv.appendChild(set);
  main.appendChild(cardDiv);
}

function unitSelected() {
  if (unitSelect.checked) {
    units = 'imperial'
  } else {
    units = 'metric'
  }
  return units
};

// Event Listeners
btn.addEventListener('click', getWeather);
unitSelect.addEventListener('click', unitSelected);
