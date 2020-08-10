import { getDirections, useDirections } from "./DirectionProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".directionsContainer")

eventHub.addEventListener("directionsClicked", event => {
  renderLoading()

  const itineraryObj = event.detail.itineraryObj

  getDirections(itineraryObj)
    .then(() => {
      const directions = useDirections()
      render(directions, itineraryObj)
    })
})

const renderLoading = () => {
  contentTarget.innerHTML = `
    <div class="directionList--loading">
      <p class="directionList--loading__text">Loading directions...</p>
      <img class="directionList--loading__spinner" src="./images/loadingSpinner.gif">
    </div>
  `
}

const render = (directions, itineraryObj) => {
  const parkName = itineraryObj.parkInfo.parkName
  const oddityName = itineraryObj.oddityInfo.oddityName
  const eateryName = itineraryObj.eateryInfo.eateryName

  const headerHTML = buildHeaderHTML([ 'Nashville', parkName, oddityName, eateryName ])
  contentTarget.innerHTML = `
    ${headerHTML}
    <ol class="directionList">
      ${directions.map(direction => `<li class="direction">${direction}</li>` ).join("")}
    </ol>
  `
}

const buildHeaderHTML = stopsOnTrip => {
  return `
    <h3 class="directionList__header">
      Directions from 
      ${
          stopsOnTrip.map(stop => `<span class="directionList__headerStop">${stop}</span>`)
            .join(" to ")
      }
    </h3>
  `
}