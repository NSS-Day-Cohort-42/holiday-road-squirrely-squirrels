import { getWeather, useWeather } from "./WeatherProvider.js"

const contentTarget = document.querySelector(".weatherContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("parkSelected", customEvent => {
  // get park ID

  // get latitude and longitude of park

  // get weather for the park

  // display weather for the park
})

getWeather()
  .then( () => {
    const weather = useWeather()
    contentTarget.innerHTML = `The current temperature in Nashville is ${kelvinToFarenheit(weather.current.temp)} degrees F`
  }
)

const kelvinToFarenheit = ( tempKelvin ) => {
  return Math.round((tempKelvin-273.15)*(9/5)+32)
}