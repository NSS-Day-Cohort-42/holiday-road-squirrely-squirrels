import { useEateryById } from "./EateryProvider.js"

const contentTarget = document.querySelector(".preview--eatery")
const eventHub = document.querySelector(".container")




//listen for custom event from eatery selects
eventHub.addEventListener("eaterySelected", (customEvent) => {
    const eateryId = customEvent.detail.eateryId

    if(eateryId !== "0") {
        const selectedEatery = useEateryById(eateryId)

        render(selectedEatery)
    }
    else {
        derender()
    }

})  

eventHub.addEventListener("click", (clickEvent) => {
    const [prefix, eateryId] = event.target.id.split("--")
    if (event.target.id.startsWith("showEateryDetail--")) {
        const dialogTarget = document.querySelector(`.showEateryDialog--${eateryId}`)
        dialogTarget.showModal()
    }
    else if (event.target.id === `closeEateryDialog--${eateryId}`) {
        const theDialog = event.target.parentNode
        theDialog.close()
    }
})



//render function

const render = (selectedEateryObj) => {
    contentTarget.innerHTML = `
    <div class="previewBox">
        <h3>${selectedEateryObj.businessName}</h3>
        <div>${selectedEateryObj.city}, ${selectedEateryObj.state}</div>
        <button class="detailButton" id="showEateryDetail--${selectedEateryObj.id}">Details</button>
        <dialog class="dialog showEateryDialog--${selectedEateryObj.id}">
            <h4>${selectedEateryObj.businessName}</h4>
            <p>${selectedEateryObj.description}</p>
            <p>pet friendly: ${selectedEateryObj.ameneties.petFriendly}</p>
            <p>wifi: ${selectedEateryObj.ameneties.wifi}</p>
            <p>diaper facility: ${selectedEateryObj.ameneties.diaperFacility}</p>
            <p>playground: ${selectedEateryObj.ameneties.playground}</p>
            <p>restrooms: ${selectedEateryObj.ameneties.restrooms}</p>
            <button class="closeButton" id="closeEateryDialog--${selectedEateryObj.id}">Close</button

        </dialog>
    </div>   
    `

}

const derender = () => {
    contentTarget.innerHTML = ""
}