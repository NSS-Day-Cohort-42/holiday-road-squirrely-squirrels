let parks = []

const desiredActivities = [ 
  "Biking", 
  "Food", 
  "Guided Tours",
  "Hands-On", 
  "Ice Skating",
  "Junior Ranger Program",
  "Playground",
  "Swimming"
]

const minimumScore = 5

export const useParks = () => parks.slice()

export const useParkCoordinates = parkId => {
  const foundPark = parks.find(park => park.id === parkId)
  const latitude = parseFloat(foundPark.latitude) 
  const longitude = parseFloat(foundPark.longitude)
  return [ latitude, longitude ]
}

export const useParkById = parkId => {
  return parks.find(park => park.id === parkId)
}

export const getParks = () => {
  return fetch('http://localhost:8088/parks')
    .then(res => res.json())
    .then(parksData => {
        parks = parksData
        scoreParks()
        rankParks()
        filterParks()
        filterParkActivities()
    })
}

const scoreParks = () => {
  for(const park of parks) {
    let score = 0;

    for(let activity of park.activities) {
      if(desiredActivities.includes(activity.name)) {
        score++
      }
    }

    park.profileScore = score
  }
}

const rankParks = () => {
  parks.sort((currentPark, nextPark) => {
    return nextPark.profileScore - currentPark.profileScore
  })
}

const filterParks = () => {
  parks = parks.filter(park => {
    return park.profileScore >= minimumScore
  })
}

const filterParkActivities = () => {
  for(const park of parks) {
    park.activities = park.activities.filter(activity => {
      return desiredActivities.includes(activity.name)
    })
  }
}


