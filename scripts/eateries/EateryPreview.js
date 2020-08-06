import { useEateries} from "./EateryProvider.js"

const contentTarget = document.querySelector(".preview--eatery")
const eventHub = document.querySelector(".container")




//listen for custom event from eatery selects
eventHub.addEventListener("eaterySelected", (customEvent) => {
    const allEateries = useEateries()
    const eaterySelected = allEateries.find(eatery => {
        return parseInt(event.detail.eateryId) === eatery.id
    })
    render(eaterySelected)

})  

eventHub.addEventListener("click", (clickEvent) => {
    const [prefix, eateryId] = event.target.id.split("--")
    if (event.target.id.startsWith("showDetail--")) {
        const dialogTarget = document.querySelector(`.showDialog--${eateryId}`)
        dialogTarget.showModal()
    }
    else if (event.target.id === `closeDialog--${eateryId}`) {
        const theDialog = event.target.parentNode
        theDialog.close()
    }
})



//render function

const render = (selectedEateryObj) => {
    contentTarget.innerHTML = `
        <h3>${selectedEateryObj.businessName}</h3>
        <div>${selectedEateryObj.city}, ${selectedEateryObj.state}</div>
        <button class="detailButton" id="showDetail--${selectedEateryObj.id}">Details</button>
        <dialog class="dialog showDialog--${selectedEateryObj.id}">
            <h4>${selectedEateryObj.businessName}</h4>
            <p>${selectedEateryObj.description}</p>
            <p>pet friendly: ${selectedEateryObj.ameneties.petFriendly}</p>
            <p>wifi: ${selectedEateryObj.ameneties.wifi}</p>
            <p>diaper facility: ${selectedEateryObj.ameneties.diaperFacility}</p>
            <p>playground: ${selectedEateryObj.ameneties.playground}</p>
            <p>restrooms: ${selectedEateryObj.ameneties.restrooms}</p>
            <button class="closeButton" id="closeDialog--${selectedEateryObj.id}">Close</button

        </dialog>
           
    `

}