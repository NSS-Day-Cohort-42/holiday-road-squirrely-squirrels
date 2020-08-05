import  keys  from "../Settings.js";  

let weather = {}

let latitudeNashville = 36.16589
let longitudeNashville = -86.78444

export const useWeather = () => Object.assign( {}, weather)

export const getWeather = ( latitude = latitudeNashville , longitude = longitudeNashville) => {
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${keys.weatherKey}`)
  .then(weatherData => weatherData.json())
  .then(weatherJson => {
    weather = weatherJson 
  })
}

