import { getParks, useParks } from "./ParkProvider.js"

const contentTarget = document.querySelector(".dropdownContainer")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", changeEvent => {
  if(changeEvent.target.id === "dropdown--parks") {
    const parkId = changeEvent.target.value
    const parkSelectedEvent = new CustomEvent("parkSelected", {
      detail: {
        parkId: parkId
      }
    })

    eventHub.dispatchEvent(parkSelectedEvent)
  }
})

const render = parks => {
  contentTarget.innerHTML += `
    <select class="dropdown dropdown--parks" id="dropdown--parks">
      <option value="0">Select a park...</option>
      ${
        parks.map(park => {
          return `<option value="${park.id}">${park.name}</option>`
        }).join("")
      }
    </select>
  `
}

export const ParkSelect = () => {
  getParks()
    .then(() => {
      const parks = useParks()
      render(parks) 
    })
}