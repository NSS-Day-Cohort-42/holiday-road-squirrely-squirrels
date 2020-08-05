import keys from "../Settings.js"

let parks = []

const getNationalParksServiceURL = resourceName => 
  `https://developer.nps.gov/api/v1${resourceName}?api_key=${keys.npsKey}`

const getOneMonthAgoTimestamp = () => Date.now() - (1000 * 60 * 60 * 24 * 30)

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

const getParksFromRemoteAPI = () => {
  return fetch(getNationalParksServiceURL('/parks'))
    .then(res => res.json())
    .then(parksData => {
      saveParks(parksData.data)
      return parksData.data;
    })
}

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

export const useParks = () => parks.slice()

export const getParkCoordinates = parkId => {
  const foundPark = parks.find(park => park.id === parkId)
  const { latitude, longitude } = foundPark
  return { latitude, longitude }
}