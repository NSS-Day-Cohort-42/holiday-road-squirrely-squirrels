import  keys  from "../Settings.js";  

let weather = {}

export const useWeather = () => Object.assign( {}, weather)

export const getWeather = ( latitude , longitude ) => {
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${keys.weatherKey}`)
  .then(weatherData => weatherData.json())
  .then(weatherJson => {
    weather = weatherJson 
  })
}

