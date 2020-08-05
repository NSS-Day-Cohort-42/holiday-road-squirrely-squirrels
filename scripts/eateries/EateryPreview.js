import { useEateries, getEateries } from "./EateryProvider.js"

const contentTarget = document.querySelector(".preview--eatery")
const eventHub = document.querySelector(".container")




//listen for custom event from eatery selects
eventHub.addEventListener("eaterySelected", (customEvent) => {

    const eaterySelected = customEvent.detail.eateryId

    const allEateries = useEateries()

    const selectedEatery = allEateries.find(
        (eateryObj) => {
            return eaterySelected === eateryObj.id
        }
    ) //returns one object with matching id

    //add to DOM
    render
})



//render function

const render = (selectedEateryObj) => {
    contentTarget.innerHTML = `
        <h3>${selectedEateryObj.businessName}</h3>
        <div>${selectedEateryObj.city}, ${selectedEateryObj.state}</div>
        <button class="detailButton" id="detail--${selectedEateryObj.id}">Details</button>
        <dialog class="dialog dialog--${selectedEateryObj.id}">
            <h4>${selectedEateryObj.businessName}</h4>
            <p>${selectedEateryObj.description}</p>
            <p>${selectedEateryObj.ameneties.petFriendly}</p>
            <p>${selectedEateryObj.ameneties.wifi}</p>
            <p>${selectedEateryObj.ameneties.diaperFacility}</p>
            <p>${selectedEateryObj.ameneties.playground}</p>
            <p>${selectedEateryObj.ameneties.restrooms}</p>

            <button class="closeButton" id="close--${selectedEateryObj.id}">Close</button

        </dialog>
           
    `

}