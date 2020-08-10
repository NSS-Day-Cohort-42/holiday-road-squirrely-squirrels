import  keys  from "../Settings.js";  

const startingCity = "Nashville"
const startingState = "Tn"
const defaultCountry = "United States of America"
let LatLongPairs = []
let directionsList = []

export const useDirections = () => directionsList.slice()

export const getDirections = itineraryObj =>  {
  return getLatLngPairs(itineraryObj)
    .then(getDirectionsFromLatLongs)
}



// a function that uses Latitude longitude pairs to get directions
const getDirectionsFromLatLongs = () => {
  
  const latLongString = LatLongPairs.map(pairObj => {
    return `point=${pairObj.lat},${pairObj.lng}`
  }).join("&")

  return fetch(`https://graphhopper.com/api/1/route?${latLongString}&vehicle=car&locale=us&instructions=true&calc_points=true&key=${keys.graphhopperKey}`)
    .then( response => response.json())
    .then( responseContent => {
      directionsList = responseContent.paths["0"].instructions.map( instructionObj => {
        return instructionObj.text
      } )
    })
} 

// a function that creates a list of latitude longitude pairs from an itenerary object
const getLatLngPairs = itineraryObj => {
  return getLatLngPair( startingCity+"+"+startingState ) 
    .then( () => getLatLngPair(itineraryObj.parkInfo.parkCity+"+"+itineraryObj.parkInfo.parkState+"+"+defaultCountry)) //example of gettting latLongs for multiple cities
    .then( () => getLatLngPair(itineraryObj.oddityInfo.oddityCity+"+"+itineraryObj.oddityInfo.oddityState+"+"+defaultCountry))
    .then( () => getLatLngPair(itineraryObj.eateryInfo.eateryCity+"+"+itineraryObj.eateryInfo.eateryState+"+"+defaultCountry))
} 

const getLatLngPair = ( placeName ) => {
  return fetch(`https://graphhopper.com/api/1/geocode?q=${placeName}&locale=us&debug=true&key=${keys.graphhopperKey}`)
  .then(response => response.json())
  .then( resultsObject => {
    LatLongPairs.push(resultsObject.hits["0"].point)
  })
}