import keys from "../Settings.js"

let parks = []

/**
 * Get a timestamp for exactly 30 days before the instant this function is called.
 */
const getOneMonthAgoTimestamp = () => Date.now() - (1000 * 60 * 60 * 24 * 30)

/**
 * Save an array of parks to the local parks API, along with a timestamp representing the moment the parks were saved to the local API.
 * @param {Array} parks 
 */
const saveParks = parks => {
  const parksToSave = {
    timestamp: Date.now(),
    parks
  }
  return fetch('http://localhost:8088/parks',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(parksToSave)
    }
  )
}

/**
 * Load parks from remote National Parks Service API. Upon successful GET response, save the parks data to local API.
 */
const getParksFromRemoteAPI = () => {
  return fetch(`https://developer.nps.gov/api/v1/parks?api_key=${keys.npsKey}`)
    .then(res => res.json())
    .then(parksData => {
      saveParks(parksData.data)
      return parksData.data;
    })
}

/**
 * Load parks from API. Attempt to load from local API first, but if either local API parks are not populated, or the last time the local database was updated was over one month ago, load parks instead from remote National Parks Service API.
 */
export const getParks = () => {
  return fetch('http://localhost:8088/parks')
    .then(res => res.json())
    .then(localParksData => {
      if(!localParksData.timestamp || localParksData.timestamp < getOneMonthAgoTimestamp()) {
        return getParksFromRemoteAPI()
          .then(parksData => parks = parksData)
      }
      else {
        parks = localParksData.parks
      }
    })
}

/**
 * Get an array containing all parks in application state.
 */
export const useParks = () => parks.slice()

/**
 * Given an id of a park, return an object with keys "latitude" and "longitude" representing the location of that park.
 */
export const getParkCoordinates = parkId => {
  const foundPark = parks.find(park => park.id === parkId)
  const { latitude, longitude } = foundPark
  return { latitude, longitude }
}