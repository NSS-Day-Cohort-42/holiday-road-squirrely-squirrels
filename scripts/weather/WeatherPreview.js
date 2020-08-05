import { getWeather, useWeather } from "./WeatherProvider.js"
import { getParkCoordinates } from "../parks/ParkProvider.js"

const contentTarget = document.querySelector(".weatherContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("parkSelected", customEvent => {
  // get park ID
  const parkId = customEvent.detail.parkId

  // get latitude and longitude of park
  const [ parkLatitude, parkLongitude ]  = getParkCoordinates(parkId)
  // get weather for the park
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
  contentTarget.innerHTML = `The current temperature in the park is ${kelvinToFarenheit(weather.current.temp)} degrees F`
}