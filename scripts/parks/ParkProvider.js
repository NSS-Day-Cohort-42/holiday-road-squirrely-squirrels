import keys from "../Settings.js"

let parks = []

const getResourceURL = resourceName => 
  `https://developer.nps.gov/api/v1${resourceName}?api_key=${keys.npsKey}`

export const getParks = () => {
  return fetch(getResourceURL("/parks"))
    .then(res => res.json())
    .then(parksData => parks = parksData.data)
}

export const useParks = () => parks.slice()

export const getParkCoordinates = parkId => {
  const foundPark = parks.find(park => park.id === parkId)
  const { latitude, longitude } = foundPark
  return { latitude, longitude }
}