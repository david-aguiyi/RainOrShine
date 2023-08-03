let weather = {
	forecastApiKey: "npn0ofydsxc70vmz60bg10uxosy5arpar03ami77",
	currentApiKey: "420e99cc4adf023e23735dcf8cb3512c",

	fetchCurrentWeather: async function (city) {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}& units=metric&appid=${this.currentApiKey}`
		);
		const data = await response.json();
		this.displayCurrentWeather(data);
	},

	fetchForecastWeather: async function (city) {
		const response = await fetch(
			`https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=all&timezone=UTC&language=en&units=metric&key=${this.forecastApiKey}`
		);
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
			"04d": "overcast.png",
			"04n": "overcast.png",
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
		var ctemp = Math.floor(temp - 273.15);
		console.log(
			name,
			icon,
			description,
			ctemp,
			humidity,
			speed,
			pressure,
			miles
		);

		document.querySelector(".weather-location span").innerText = name;
		document.querySelector(".weather-info__temp p").innerText = description;
		document.querySelector(".weather-info__temp h1").innerText = ctemp;
		document.querySelector(".humidity").innerText = humidity;
		document.querySelector(".progress-yellow").style.width = humidity + "%";
		document.querySelector(".wind").innerText = speed;
		document.querySelector(".pressure").innerText = pressure;
		document.querySelector(".visibility").innerText = miles;
		
		//custom icon
		const iconElement = document.querySelector("#weather-icon");
		iconElement.src = `images/${iconMapping[icon]}`;
	},

	displayForecastWeather: function (data2) {
		const forecastList = data2.daily.data;
		// const forecastDiv = document.getElementById("forecast");
		// forecastDiv.innerHTML = "";
		forecastList.forEach((forecast) => {
			const date = new Date(forecast.day);
			const options = {
				weekday: "short",
				year: "numeric",
				month: "long",
				day: "numeric",
			};
			const formattedDate = date.toLocaleDateString(undefined, options);
			const weather = forecast.weather;
			// const temperatureMin = forecast.all_day.temperature_min;
			// const temperatureMax = forecast.all_day.temperature_max;
			const windSpeed = forecast.all_day.wind.speed;
			// const windDirection = forecast.all_day.wind.dir;
			// const cloudCover = forecast.all_day.cloud_cover.total;
			// const precipitation = forecast.all_day.precipitation.total;
			// const forecastItem = document.createElement("div");
			// forecastItem.textContent = `Date: ${formattedDate}, Weather: ${weather}, Min Temperature: ${temperatureMin}°C, Max Temperature: ${temperatureMax}°C, Wind Speed: ${windSpeed} km/h, Wind Direction: ${windDirection}, Precipitation: ${precipitation} mm`;
			// forecastDiv.appendChild(forecastItem);

			console.log(formattedDate, weather, windSpeed);
		});
	},
};
