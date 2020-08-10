import { getDirections, useDirections } from "./DirectionProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".directionsContainer")

eventHub.addEventListener("directionsClicked", event => {
  const itineraryObj = event.detail.itineraryObj

  getDirections(itineraryObj)
    .then(() => {
      const directions = useDirections()
      render(directions, itineraryObj)
    })
})

const render = (directions, itineraryObj) => {
  const parkName = itineraryObj.parkInfo.parkName
  const oddityName = itineraryObj.oddityInfo.oddityName
  const eateryName = itineraryObj.eateryInfo.eateryName

  const headerText = `Directions from Nashville to ${parkName} to ${oddityName} to ${eateryName}`

  contentTarget.innerHTML = `
    <h3 class="direcitonList__header">${headerText}</h3>
    <ol class="directionList">
      ${directions.map(direction => `<li class="direction">${direction}</li>` )}
    </ol>
  `
}