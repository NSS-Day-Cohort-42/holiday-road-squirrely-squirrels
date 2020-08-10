import { saveItinerary } from "./ItineraryProvider.js";

const contentTarget = document.querySelector(".saveItineraryButtonContainer")
const eventHub = document.querySelector(".container")

let isParkSelected = false
let isEaterySelected = false
let isOdditySelected = false
let itineraryData = {
  parkId: "",
  parkInfo: null,
  oddityId: "",
  oddityInfo: null,
  eateryId: "",
  eateryInfo: null
}

eventHub.addEventListener("parkSelected", customEvent => {
  
  if ( customEvent.detail.parkId !== "0" ) {
    isParkSelected = true
    itineraryData.parkId = customEvent.detail.parkId
    itineraryData.parkInfo = customEvent.detail.parkInfo
  }
  else {
    isParkSelected = false
  }

  render()

})
eventHub.addEventListener("odditySelected", customEvent => {
  
  if ( customEvent.detail.oddityId !== "0" ) {
    isOdditySelected = true
    itineraryData.oddityId = customEvent.detail.oddityId
    itineraryData.oddityInfo = customEvent.detail.oddityInfo
  }
  else {
    isOdditySelected = false
  }

  render()

})
eventHub.addEventListener("eaterySelected", customEvent => {
  
  if ( customEvent.detail.eateryId !== "0" ) {
    isEaterySelected = true
    itineraryData.eateryId = customEvent.detail.eateryId
    itineraryData.eateryInfo = customEvent.detail.eateryInfo
  }
  else {
    isEaterySelected = false
  }

  render()

})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "save-itinerary-button") {
    if (readyToSave()) {
      saveItinerary(itineraryData)
    }
  }
})

eventHub.addEventListener("itineraryChange", () => {
  isParkSelected = false
  isEaterySelected = false
  isOdditySelected = false
  derender()
})

export const ItinerarySaveButton = () => {
  render()
}

const readyToSave = () => {
  return isParkSelected && isEaterySelected && isOdditySelected
}

const render = () => {
  let saveStateClass = ""
  if (readyToSave()) {
    saveStateClass = "ready-to-save"
  }
  else {
    saveStateClass = "not-ready-to-save"
  }
  contentTarget.innerHTML = `
  <button id="save-itinerary-button" class="${saveStateClass}">Save itinerary</button>
  `
}

const derender = () => {
  contentTarget.innerHTML = ''
}
