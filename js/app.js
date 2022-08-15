const searchForm = document.getElementById("weather-form"); //Weather form
const cityInput = document.getElementById("city-input"); // Get query from user
const searchBtn = document.getElementById("search-city"); // Button to trigger search
const cityDisplay = document.getElementById("city-display"); // Display name of queried city
const regionDisplay = document.getElementById("region-display"); // Display name of queried region
const iconDisplay = document.getElementById("icon"); // Display queried weather condition icon
const condtionDisplay = document.getElementById("weather-condition"); // Display queried condition
const cityList = document.getElementById("cities");
const mainContent = document.querySelector(".container .main-content");
const errorMsgContainer = document.getElementById("error-msg-cont");
const errorMsg = document.getElementById("error-msg");
const tempDispay = document.getElementById('temperature')
const degreeDisplay = document.getElementById('degree') 
const dateDisplay = document.getElementById('date')

console.log(errorMsg);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3185d116b4mshb1f5482c4d12a0dp1a3127jsn36e6ff0149d0",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

 async function fetchWeather(city) {
  let result;

  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1`;
  await fetch(url, options)
    .then(  (response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error! ${response.status}`);
      } else return response.json();
    })
    .then((data) => populateUi(data))
    .catch((error) => loadeErrorHandler(error));
}

//console.log(fetchWeather('Accra'))

function populateUi(data) {
  const loadError = document.querySelector(".load-error-container");

  loadError.style.display = "none";
  cityDisplay.innerHTML = data.location.name;
  regionDisplay.innerHTML = data.location.region;
  condtionDisplay.innerHTML = data.current.condition.text;
  tempDispay.innerHTML = data.current.temp_c;
  dateDisplay.innerHTML = data.current.last_updated;
  iconDisplay.src = data.current.condition.icon;
}

function shake(element) {
  element.style.animation = "wobble-hor-top 0.8s both";
}

function loadeErrorHandler(msg) {
  const loadError = document.querySelector(".load-error-container");
  loadError.style.display = "grid";

  const errorMessageDisplay = document.getElementById("load-error");

  errorMessageDisplay.innerHTML = msg;
}

/*********************************
 * Eventlisteners
 **********************************/
cityInput.addEventListener("keyup", async () => {
  cityInput.classList.remove("invalid");
  errorMsgContainer.style.display = "none";

  let names;
  let input = cityInput.value;
  let url = `https://weatherapi-com.p.rapidapi.com/search.json?q=${cityInput.value}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      [...data].forEach((element) => {
        let name = element.name;
        if (input.search(name)) {
          let cityOption = document.createElement("option");
          cityOption.setAttribute("value", name);
          cityOption.innerHTML = name;
          cityList.appendChild(cityOption);
          //console.log(name);
        }
      });
    })
    .catch((err) => loadeErrorHandler(err));
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cityInput.classList.remove("invalid");

  if (cityInput.value == "") {
    cityInput.classList.add("invalid");
    errorMsgContainer.style.display = "block";
    errorMsg.innerHTML = "Field should not be empty";
    return;
  }
  errorMsgContainer.style.display = "none";
  let city = cityInput.value;
  mainContent.classList.add("open");
  fetchWeather(city);
  iconDisplay.style.display = 'block'




  cityInput.value = "";
});
