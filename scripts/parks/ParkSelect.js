import { getParks, useParks, useParkById } from "./ParkProvider.js"

const contentTarget = document.querySelector(".dropdownParkContainer")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", changeEvent => {
  if(changeEvent.target.id === "dropdown--parks") {
    const parkId = changeEvent.target.value
    const parkName = useParkById(parkId).name
    const parkSelectedEvent = new CustomEvent("parkSelected", {
      detail: {
        parkId: parkId,
        parkName: parkName
      }
    })

    eventHub.dispatchEvent(parkSelectedEvent)
  }
})

eventHub.addEventListener("itineraryChange", () => {
  ParkSelect()
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