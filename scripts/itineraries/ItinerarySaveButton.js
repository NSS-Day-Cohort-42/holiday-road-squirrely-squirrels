import { saveItinerary } from "./ItineraryProvider.js";

const contentTarget = document.querySelector(".saveItineraryButtonContainer")
const eventHub = document.querySelector(".container")

let isParkSelected = false
let isEaterySelected = false
let isOdditySelected = false
let itineraryData = {
  parkId: "",
  parkName: "",
  oddityId: "",
  oddityName: "",
  eateryId: "",
  eateryName: "",
}

eventHub.addEventListener("parkSelected", customEvent => {
  
  if ( customEvent.detail.parkId !== "" ) {
    isParkSelected = true
    itineraryData.parkId = customEvent.detail.parkId
    itineraryData.parkName = customEvent.detail.parkName
    render()
  }

})
eventHub.addEventListener("odditySelected", customEvent => {
  
  if ( customEvent.detail.oddityId !== "" ) {
    isOdditySelected = true
    itineraryData.oddityId = customEvent.detail.oddityId
    itineraryData.oddityName = customEvent.detail.oddityName
    render()
  }

})
eventHub.addEventListener("eaterySelected", customEvent => {
  
  if ( customEvent.detail.eateryId !== "" ) {
    isEaterySelected = true
    itineraryData.eateryId = customEvent.detail.eateryId
    itineraryData.eateryName = customEvent.detail.eateryName
    render()
  }

})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "save-itinerary-button") {
    if (readyToSave()) {
      saveItinerary(itineraryData)
    }
  }
})

export const ItinerarySaveButton = () => {
  render()
}

const readyToSave = () => {
  return isParkSelected && isEaterySelected && isOdditySelected
}

const render = () => {
  contentTarget.innerHTML = `
  <button id="save-itinerary-button">Save itinerary : ready to Save: ${readyToSave()}</button>
  `
}
