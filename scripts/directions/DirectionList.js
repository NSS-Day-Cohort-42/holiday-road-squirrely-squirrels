import { getDirections, useDirections } from "./DirectionProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".directionsContainer")

eventHub.addEventListener("directionsClicked", event => {
  const itineraryObj = event.detail.itineraryObj

  getDirections(itineraryObj)
    .then(() => {
      const directions = useDirections()
      render(directions)
    })
})

const render = directions => {
  contentTarget.innerHTML = `
    <ol class="directionList">
      ${directions.map(direction => `<li class="direction">${direction}</li>` )}
    </ol>
  `
}