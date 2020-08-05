import { useParks } from "./ParkProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".preview--park")

const render = park => {
  contentTarget.innerHTML = `
    <h3 class="preview__header">${park.name}</h3>
    <div class="preview__location">${park.addresses[0].city}, ${park.addresses[0].stateCode}</div>
    <button class="detailButton" id="detail--${park.id}">Details</button>
    <dialog class="dialog dialog--park">
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