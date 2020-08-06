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
// eventHub.addEventListener("odditySelected", customEvent => {
  
// })
// eventHub.addEventListener("eaterySelected", customEvent => {
  
// })

export const ItenerarySaveButton = () => {
  render()
}

const readyToSave = () => {
  return isParkSelected
}

const render = () => {
  contentTarget.innerHTML = `
  <button>Save Itenerary : ready to Save: ${readyToSave()}</button>
  `
}
