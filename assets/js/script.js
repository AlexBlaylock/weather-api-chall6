// api
const apiKey = 'cebf4c348ad95753018920ce0c8b93f8';
const weatherApiUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn")
// jquery selectors
const recentContainer = $("#recent");
const inputValue = $("#input-value");
const clearBtn = $("#clear-history");
// pulls recent search
const recentSearchHistory = JSON.parse(localStorage.getItem("recentSearchHistory") || "[]");

function renderSearchHistory() {
    recentContainer.empty();
  
    recentSearches.forEach((city) => {
      const recentInput = $("<input>").attr({
        type: "text",
        readonly: true,
        class: "form-control-lg text-black",
        value: city,
      });
      recentInput.on("click", () => getWeather(city));
      recentContainer.append(recentInput);
    });
  }

// loads on page
renderSearchHistory