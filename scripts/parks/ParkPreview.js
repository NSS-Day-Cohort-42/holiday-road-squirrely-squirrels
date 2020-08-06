import { useParks } from "./ParkProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".preview--park")

contentTarget.addEventListener("click", event => {
  if(event.target.id.startsWith("openParkDetail--") || event.target.id.startsWith("closeParkDetail--")) {
    const [ prefix, parkId ] = event.target.id.split("--")
    const dialogNode = document.querySelector(`#parkDialog--${parkId}`)

    if(prefix === "openParkDetail") {
      dialogNode.showModal()
    }
    else {
      dialogNode.close()
    }
  }
})

const render = park => {
  contentTarget.innerHTML = `
    <h3 class="preview__header">${park.name}</h3>
    <div class="preview__location">${park.addresses[0].city}, ${park.addresses[0].stateCode}</div>
    <button class="detailButton" id="openParkDetail--${park.id}">Details</button>
    <dialog class="dialog dialog--park" id="parkDialog--${park.id}">
      <h4 class="preview-dialog__header">${park.name}</h4>
      <p class="preview-dialog__description">${park.description}</p>
      <button class="closeButton" id="closeParkDetail--${park.id}">Close</button>
    </dialog>
  `
}

eventHub.addEventListener("parkSelected", event => {
  const parkId = event.detail.parkId

  const parks = useParks()

  const selectedPark = parks.find(park => park.id === parkId)

  render(selectedPark)
})