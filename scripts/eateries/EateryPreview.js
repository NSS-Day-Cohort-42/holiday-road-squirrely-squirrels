const contentTarget = document.querySelector(".preview--eatery")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("eaterySelected", (customEvent) => {
    const eaterySelected = customEvent.detail.eateryId

    render(eaterySelected)
})


const render = (selectedEateryObj) => {
    contentTarget.innerHTML = `
    <h3>${selectedEateryObj.businessName}</h3>
    <div>${selectedEateryObj.city}, ${selectedEateryObj.state}</div>
    <button class="detailButton" id="detail--${selectedEateryObj.id}">Details</button>
    <dialog class="dialog dialog--${selectedEateryObj.id}">
        <h4>${selectedEateryObj.businessName}</h4>
        <p>${selectedEateryObj.description}</p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>

        <button class="closeButton" id="close--${selectedEateryObj.id}"</button>
    </dialog>
     `
}

eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id.startsWith("dialog--")) {      
        contentTarget.showModal()
    }
    else if (clickEvent.target.id.startsWith("close--")) {
        const dialogTarget = clickEvent.target.parentNode
        dialogTarget.close()
    }

})