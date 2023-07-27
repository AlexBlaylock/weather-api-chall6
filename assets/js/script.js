// api
const apiKey = 'cebf4c348ad95753018920ce0c8b93f8';
// html selectors
var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn")
// jquery
const recentContainer = $("#recent");
const inputValue = $("#input-value");
const clearBtn = $("#clear-history");
// pulls recent search
const recentSearchHistory = JSON.parse(localStorage.getItem("recentSearchHistory") || "[]");

function renderSearchHistory() {
  recentContainer.empty();

  recentSearchHistory.forEach((city) => {
    const recentInput = $("<input>").attr({
      type: "text",
      readonly: true,
      class: "form-control-lg text-black",
      value: city,
    });
    recentInput.on("click", () => fetchWeather(city)); 
    recentContainer.append(recentInput);
  });
};
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch source fopr try and catch function
async function fetchWeather(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      const nameValue = data.name;
      const tempValue = data.main.temp;
      const humidityValue = data.main.humidity;
      const windValue = data.wind.speed;
      const icon = data.weather[0].icon;
      const weatherURL = `https://openweathermap.org/img/wn/${icon}.png`;

      const currentDate = new Date();
      const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

      const cityDateIcon = $(".city-date-icon");
      cityDateIcon.html(
        `${nameValue} (${formattedDate}) <img src="${weatherURL}"/>`
      );

      $(".temp").html(`Temperature: ${tempValue} °F`);
      $(".humidity").html(`Humidity: ${humidityValue}%`);
      $(".wind").html(`Wind Speed: ${windValue} MPH`);

      $(".current-weather").removeClass("hide");
    } else {
      alert("Error: " + response.statusText);
    }
    if (!recentSearchHistory.includes(city)) {
      recentSearchHistory.push(city);
      localStorage.setItem("recentSearchHistory", JSON.stringify(recentSearchHistory));
      renderSearchHistory();
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
  // event listener for search
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();
    console.log("search btn clicked");
    if (city !== "") {
      fetchWeather(city);
      searchInput.value = "";
    }
  });

  // event listener to click on recents
  recentContainer.on("click", "input", function () {
    const city = $(this).val();
    fetchWeather(city);
  });
  
  // event listener to clear search history
  clearBtn.on("click", function () {
    localStorage.removeItem("recentSearchHistory");
    recentSearchHistory.length = 0;
    renderSearchHistory();
  });

  console.log("Recent Search History:", recentSearchHistory);
  console.log("Stored Search History:", JSON.parse(localStorage.getItem("recentSearchHistory")));
// loads on page
renderSearchHistory();

