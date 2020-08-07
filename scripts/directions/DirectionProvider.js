import  keys  from "../Settings.js";  

const startingCity = "Nashville"
const startingState = "Tn"

let result = {}

const getLatLngPair = ( placeName ) => {
  return fetch(`https://graphhopper.com/api/1/geocode?q=${placeName}&locale=us&debug=true&key=${keys.graphhopperKey}`)
  .then(response => response.json())
  .then( resultsObject => {
    result = resultsObject.hits["0"].point
  })
}

// Testing to see if this works
getLatLngPair(startingCity)
  .then( () => console.log(result))
