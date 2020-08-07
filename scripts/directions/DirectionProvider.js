import  keys  from "../Settings.js";  

const startingCity = "Nashville"
const startingState = "Tn"



let results = []

const getLatLngPair = ( placeName ) => {
  return fetch(`https://graphhopper.com/api/1/geocode?q=${placeName}&locale=us&debug=true&key=${keys.graphhopperKey}`)
  .then(response => response.json())
  .then( resultsObject => {
    results.push(resultsObject.hits["0"].point)
  })
}

// Testing to see if this works
getLatLngPair(startingCity)
  .then( () => getLatLngPair("Boise"))
  .then( () => console.log(results))
  