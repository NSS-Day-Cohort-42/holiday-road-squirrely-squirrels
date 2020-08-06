let parks = []

export const getParks = () => {
  return fetch('http://localhost:8088/parks')
    .then(res => res.json())
    .then(parksData => {
        parks = parksData
    })
}

export const useParks = () => parks.slice()

export const getParkCoordinates = parkId => {
  const foundPark = parks.find(park => park.id === parkId)
  const latitude = parseFloat(foundPark.latitude) 
  const longitude = parseFloat(foundPark.longitude)
  return [ latitude, longitude ]
}

export const getParkById = parkId => {
  return parks.find(park => park.id === parkId)
}
