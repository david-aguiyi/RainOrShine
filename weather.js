let weather = {
	forecastApiKey: "npn0ofydsxc70vmz60bg10uxosy5arpar03ami77",
	currentApiKey: "420e99cc4adf023e23735dcf8cb3512c",

	fetchCurrentWeather: async function (city) {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.currentApiKey}`
		);
		if (!response.ok) {
			throw new Error("City not found or weather data unavailable.");
		}
		const data = await response.json();
		this.displayCurrentWeather(data);
	},
	fetchForecastWeather: async function (city) {
		const response = await fetch(
			`https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=all&timezone=UTC&language=en&units=metric&key=${this.forecastApiKey}`
		);
		if (!response.ok) {
			throw new Error("City not found or weather forecast data unavailable.");
		}
		const data2 = await response.json();
		this.displayForecastWeather(data2);
	},

	displayCurrentWeather: function (data) {
		//custom-icon mapping
		const iconMapping = {
			"01d": "Clear.png",
			"01n": "Clear.png",
			"02d": "HeavyCloud.png",
			"02n": "HeavyCloud.png",
			"03d": "LightCloud.png",
			"03n": "LightCloud.png",
			"04d": "overcast3.png",
			"04n": "overcast3.png",
			"09d": "HeavyRain.png",
			"09n": "HeavyRain.png",
			"10d": "LightRain.png",
			"10n": "LightRain.png",
			"11d": "Thunderstorm.png",
			"11n": "Thunderstorm.png",
			"13d": "Snow.png",
			"13n": "Sleet.png",
		};

		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity, pressure } = data.main;
		const { speed } = data.wind;
		const { visibility } = data;

		var miles = Math.round((visibility / 1609.344) * 10) / 10;
		var ctemp = Math.floor(temp);

		document.querySelector(".weather-location span").innerText = name;
		document.querySelector(".weather-info__temp p").innerText = description;
		document.querySelector(".weather-info__temp h1").innerText = ctemp;
		document.querySelector(".humidity").innerText = humidity;
		document.querySelector(".progress-yellow").style.width = humidity + "%";
		document.querySelector(".wind").innerText = speed;
		document.querySelector(".pressure").innerText = pressure;
		document.querySelector(".visibility").innerText = miles;
		console.log(temp);
		//custom icon
		const iconElement = document.querySelector("#weather-icon");
		iconElement.src = `images/${iconMapping[icon]}`;

		const date = new Date();
		const options = {
			weekday: "short",
			day: "numeric",
			month: "short",
		};
		const formattedDate = date.toLocaleDateString(undefined, options);

		document.querySelector(".date").innerText = formattedDate;
		console.log(formattedDate);
	},

	displayForecastWeather: function (data2) {
		const forecastList = data2.daily.data;
		const weatherForecastContainer =
			document.querySelector(".weather-forecast");

		weatherForecastContainer.innerHTML = "";
		const maxRenderCount = 5;
		let renderCount = 0;
		let firstDateIndex = -1;
		forecastList.forEach((forecast, index) => {
			if (renderCount >= maxRenderCount) {
				return;
			}
			renderCount++;
			const nextDate = new Date();
			nextDate.setDate(nextDate.getDate() + index + 1);
			const options = {
				weekday: "short",
				day: "numeric",
				month: "short",
			};
			var formattedDate = nextDate.toLocaleDateString(undefined, options);

			if (firstDateIndex === -1) {
				firstDateIndex = index; // Store the index of the first date rendered
				formattedDate = "Tomorrow";
			}

			const { weather } = forecast;
			const { icon, temperature } = forecast.all_day;
			const { speed } = forecast.all_day.wind;

			//icon mapping
			const ForecastIconMapping = {
				1: "Clear.png",
				2: "Clear.png",
				3: "LightCloud.png",
				4: "LightCloud.png",
				5: "HeavyCloud.png",
				6: "HeavyCloud.png",
				7: "overcast3.png",
				10: "LightRain.png",
				11: "moderate_rain",
				12: "HeavyRain.png",
				13: "Thunderstorm.png",
				14: "Sleet.png",
				16: "Snow.png",
				17: "Hail.png",
				18: "Sleet.png",
				28: "overcast3.png",
				29: "HeavyCloud.png",
				30: "overcast3.png",
			};

			const weatherForecastItem = `<div class="weather-forecast__item">
						<div class="weather-forecast__item__day">
						<span>${formattedDate}</span>
						</div>
						<div class="weather-forecast__item__icon">
							<img
								src="images/${ForecastIconMapping[icon]}"
								alt="" />
						</div>
						<div class="weather-forecast__item__temp">
							<span>${temperature}°C</span>
							<div class='forecast-name'>${weather}</div>
						</div>
					</div>`;



			weatherForecastContainer.innerHTML +=  weatherForecastItem;

			console.log(formattedDate, weather, icon, temperature, speed);
		});
		// console.log("Index of the first date rendered:", formattedDate );
	},

	search: function () {
		const self = this;
		document
			.querySelector(".search-bar")
			.addEventListener("keypress", function (event) {
				if (event.key == "Enter") {
					const city = document.querySelector(".search-bar").value;
					self.fetchForecastWeather(city);
					self.fetchCurrentWeather(city);
					document.querySelector(".search-bar").value = "";
				} else if (document.querySelector(".search-bar").value === "") {
					alert("Enter a city name first");
				}
			});
	},
};

document.querySelector(".search-bar").addEventListener("keypress", function () {
	weather.search();
});
weather.fetchForecastWeather("Ibadan");
weather.fetchCurrentWeather("Ibadan");
