import { getWeather, useWeather } from "./WeatherProvider.js"

const contentTarget = document.querySelector(".weatherContainer")
const eventHub = document.querySelector(".container")

let latitudeNashville = 36.16589
let longitudeNashville = -86.78444

eventHub.addEventListener("parkSelected", customEvent => {
  // get park ID

  // get latitude and longitude of park

  // get weather for the park

  // display weather for the park
})



export const NashvileWeatherPreview = () => {
  getWeather( latitudeNashville, longitudeNashville )
    .then( () => {
      const weather = useWeather()
      render(weather)
      }
    )
}


const kelvinToFarenheit = ( tempKelvin ) => {
  return Math.round((tempKelvin-273.15)*(9/5)+32)
}

const render = ( weather ) => {
  contentTarget.innerHTML = `The current temperature in Nashville is ${kelvinToFarenheit(weather.current.temp)} degrees F`
}