import { saveItinerary } from "./ItineraryProvider.js";

const contentTarget = document.querySelector(".saveItineraryButtonContainer")
const eventHub = document.querySelector(".container")

let isParkSelected = false
let isEaterySelected = false
let isOdditySelected = false
let iteneraryData = {
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
    iteneraryData.parkId = customEvent.detail.parkId
    iteneraryData.parkName = customEvent.detail.parkName
    render()
  }

})
eventHub.addEventListener("odditySelected", customEvent => {
  
  if ( customEvent.detail.oddityId !== "" ) {
    isOdditySelected = true
    iteneraryData.oddityId = customEvent.detail.oddityId
    iteneraryData.oddityName = customEvent.detail.oddityName
    render()
  }

})
eventHub.addEventListener("eaterySelected", customEvent => {
  
  if ( customEvent.detail.eateryId !== "" ) {
    isEaterySelected = true
    iteneraryData.eateryId = customEvent.detail.eateryId
    iteneraryData.eateryName = customEvent.detail.eateryName
    render()
  }

})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "save-itenerary-button") {
    console.log('save Itenerary clicked')
    if (readyToSave()) {
      saveItinerary(iteneraryData)
    }
  }
})

export const ItenerarySaveButton = () => {
  render()
}

const readyToSave = () => {
  return isParkSelected && isEaterySelected && isOdditySelected
}

const render = () => {
  contentTarget.innerHTML = `
  <button id="save-itenerary-button">Save Itenerary : ready to Save: ${readyToSave()}</button>
  `
}
