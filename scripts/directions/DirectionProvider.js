import  keys  from "../Settings.js";  

const startingCity = "Nashville"
const startingState = "Tn"
let LatLongPairs = []

export const getDirections = () =>  {
  getLatLngPairs()
    .then(getDirectionsFromLatLongs())
}


const getLatLngPair = ( placeName ) => {
  return fetch(`https://graphhopper.com/api/1/geocode?q=${placeName}&locale=us&debug=true&key=${keys.graphhopperKey}`)
  .then(response => response.json())
  .then( resultsObject => {
    LatLongPairs.push(resultsObject.hits["0"].point)
  })
}


// a function that sends data to LatLongPairs
const getLatLngPairs = () => {
  return getLatLngPair( startingCity+"+"+startingState ) 
    .then( () => getLatLngPair("Boise")) //example of gettting latLongs for multiple cities
    .then( () => getLatLngPair("Boise"))
    .then( () => getLatLngPair("Boise"))
    .then( () => getLatLngPair("Boise"))
    .then( () => getLatLngPair("Boise"))
    .then( () => getLatLngPair("Boise"))
    .then( () => getLatLngPair("Boise"))
    .then( () => console.log(LatLongPairs))
} 


// a function that takes uses LatLongPairs to get directions
const getDirectionsFromLatLongs = () => {} 

// call get latLong pairs for testing
getLatLngPairs()