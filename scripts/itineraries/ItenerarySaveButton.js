const contentTarget = document.querySelector(".saveItineraryButtonContainer")
const eventHub = document.querySelector(".container")

let isParkSelected = false
let isEaterySelected = false
let isOdditySelected = false

eventHub.addEventListener("parkSelected", customEvent => {
  
  if ( customEvent.detail.parkId !== "" ) {
    isParkSelected = true
    render()
  }

})
eventHub.addEventListener("odditySelected", customEvent => {
  
  if ( customEvent.detail.oddityId !== "" ) {
    isOdditySelected = true
    render()
  }

})
eventHub.addEventListener("eaterySelected", customEvent => {
  
  if ( customEvent.detail.eateryId !== "" ) {
    isEaterySelected = true
    render()
  }

})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "save-itenerary-button") {
    console.log('save Itenerary clicked')
    if (readyToSave()) {
      // save itenerary to provider
      console.log("saved")
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
