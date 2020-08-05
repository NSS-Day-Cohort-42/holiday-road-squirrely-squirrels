import { getWeather, useWeather } from "./WeatherProvider.js"

const contentTarget = document.querySelector(".weatherContainer")

getWeather()
  .then( () => {
    const weather = useWeather()
    contentTarget.innerHTML = `the current temperature in Nashville is ${kelvinToFarenheit(weather.current.temp)} degrees F`
  }
)

const kelvinToFarenheit = ( tempKelvin) => {
  return Math.round((tempKelvin-273.15)*(9/5)+32)
}