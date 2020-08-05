import { useParks } from "./ParkProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".preview--park")

contentTarget.addEventListener("click", event => {
  if(event.target.id.startsWith("parkDetail--")) {
    const parkId = event.target.id.split("--")[1]

    const dialogNode = document.querySelector(`#parkDialog--${parkId}`)
    dialogNode.showModal()
  }
  else if(event.target.classList.contains("closeButton")) {
    const dialogNode = event.target.parentNode
    dialogNode.close()
  }
})

const render = park => {
  contentTarget.innerHTML = `
    <h3 class="preview__header">${park.name}</h3>
    <div class="preview__location">${park.addresses[0].city}, ${park.addresses[0].stateCode}</div>
    <button class="detailButton" id="parkDetail--${park.id}">Details</button>
    <dialog class="dialog dialog--park" id="parkDialog--${park.id}">
      <h4 class="preview-dialog__header">${park.name}</h4>
      <p class="preview-dialog__description">${park.description}</p>
      <button class="closeButton" id="close--${park.id}">Close</button>
    </dialog>
  `
}

eventHub.addEventListener("parkSelected", event => {
  const parkId = event.detail.parkId

  const parks = useParks()

  const selectedPark = parks.find(park => park.id === parkId)

  render(selectedPark)
})