import { getWeather, useWeather } from "./WeatherProvider.js"
import { useParkCoordinates } from "../parks/ParkProvider.js"

const contentTarget = document.querySelector(".weatherContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("parkSelected", customEvent => {
  const parkId = customEvent.detail.parkId

  if(parkId !== "0") {
    const [ parkLatitude, parkLongitude ]  = useParkCoordinates(parkId)
    
    getWeather( parkLatitude, parkLongitude )
      .then( () => {
        const weather = useWeather()
        render(weather)
      })
  }

  else {
    derender()
  }
})

eventHub.addEventListener("itineraryChange", () => {
  derender()
})

const kelvinToFarenheit = ( tempKelvin ) => {
  return Math.round((tempKelvin-273.15)*(9/5)+32)
}


const render = ( weather ) => {
  console.log(new Date(1597065838*1000).getDay())

  contentTarget.innerHTML = `
    <div class="weather-component">
      <div>The current temperature in the park is ${kelvinToFarenheit(weather.current.temp)} degrees F
      </div>
      <div class="weather-five-day">
        ${fiveDayWeather(weather)}
      </div>
    </div>
    `
}

const derender = () => {
  contentTarget.innerHTML = ""
}

const fiveDayWeather = (weather) => {
  let allWeather = ''
  for (let i=0 ; i<5 ; i++ ) {
    allWeather += dailyWeather( i, weather)
  }
  return allWeather
}

const dailyWeather = (day, weather) => {
  const dayString = day.toString()
  const weekdayNumber = new Date(weather.daily[dayString].dt*1000).getDay()
  const weekDayArray = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
  const weekDayString = weekDayArray[weekdayNumber]
  const imagePath = `../../weatherImages/${weather.daily[dayString].weather["0"].icon}.png`
  const weatherDescription = `${weather.daily[dayString].weather["0"].description}`
  return `
    <div class="weather-day day-id-${dayString}">
      <div>${weekDayString}</div>
      <div class="weather-daily-max">${kelvinToFarenheit(weather.daily[dayString].temp.max)}</div>
      <div class="weather-daily-min">${kelvinToFarenheit(weather.daily[dayString].temp.min)}</div>
      <div class="weather-daly-description">${weatherDescription}</div>
      <img src=${imagePath} alt="weather icon">
    </div>
    `
}