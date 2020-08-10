import { getParks, useParks, useParkById } from "./ParkProvider.js"

const contentTarget = document.querySelector(".dropdownParkContainer")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", changeEvent => {
  if(changeEvent.target.id === "dropdown--parks") {
    const parkId = changeEvent.target.value
    const park = useParkById(parkId)
    
    const parkInfo = {}
    if(park) {
      parkInfo.parkName = park.name
      parkInfo.parkCity = park.addresses[0].city
      parkInfo.parkState = park.addresses[0].stateCode
    }

    const parkSelectedEvent = new CustomEvent("parkSelected", {
      detail: {
        parkId: parkId,
        parkInfo: parkInfo
      }
    })

    eventHub.dispatchEvent(parkSelectedEvent)
  }
})

eventHub.addEventListener("itineraryChange", () => {
  ParkSelect()
})

const render = parks => {
  contentTarget.innerHTML = `
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