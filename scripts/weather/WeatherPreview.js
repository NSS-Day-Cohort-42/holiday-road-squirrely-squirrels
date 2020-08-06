import { getWeather, useWeather } from "./WeatherProvider.js"
import { getParkCoordinates } from "../parks/ParkProvider.js"

const contentTarget = document.querySelector(".weatherContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("parkSelected", customEvent => {
  const parkId = customEvent.detail.parkId
  const [ parkLatitude, parkLongitude ]  = getParkCoordinates(parkId)
  
  getWeather( parkLatitude, parkLongitude )
    .then( () => {
      const weather = useWeather()
      render(weather)
    })
})

const kelvinToFarenheit = ( tempKelvin ) => {
  return Math.round((tempKelvin-273.15)*(9/5)+32)
}

const render = ( weather ) => {
  contentTarget.innerHTML = `The current temperature in the park is ${kelvinToFarenheit(weather.current.temp)} degrees F
    ${dailyWeather(0, weather)}
    `
}

const dailyWeather = (day, weather) => {
  const dayString = day.toString()
  return `
    <div class="weather-day--${dayString}">
      <div>Today</div>
      <div class="weather-day--${dayString}--max">${kelvinToFarenheit(weather.daily[dayString].temp.max)}</div>
      <div class="weather-day--${dayString}--min">${kelvinToFarenheit(weather.daily[dayString].temp.min)}</div>
      <div class="weather-day--${day}--description">${weather.daily[dayString].weather[dayString].description}</div>
      <img src="../../weatherImages/${weather.daily[dayString].weather[dayString].icon}.png" alt="weather icon">
    </div>
  `
}