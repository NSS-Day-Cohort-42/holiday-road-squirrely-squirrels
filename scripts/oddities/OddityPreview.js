import { useOddityById } from "./OddityProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".preview--oddity")

eventHub.addEventListener("odditySelected", (event) => {
    const oddityId = event.detail.oddityId

    if(oddityId !== "0") {
        const oddityChosen = useOddityById(oddityId)
        render(oddityChosen)
    }
    else {
        derender()
    }
})

eventHub.addEventListener("click", (event) => {
    const [ prompt, oddityId ] = event.target.id.split("--")
    if (event.target.id.startsWith("detail--")){
        const contentTarget = document.querySelector(`.dialog--${oddityId}`)
        contentTarget.showModal()
    }
    else if (event.target.id === `close--${oddityId}`){
        const theDialog = event.target.parentNode
        theDialog.close()
    }
})

eventHub.addEventListener("itineraryChange", () => {
    derender()
})


const render = (oddityObj) => {
    contentTarget.innerHTML = `
        <div class="previewBox">
            <h3>${oddityObj.name}</h3>
            <div>${oddityObj.city}, ${oddityObj.state}</div> 
            <button class="detailButton" id="detail--${oddityObj.id}">Details</button>
            <dialog class="dialog dialog--${oddityObj.id}">
                <h4>${oddityObj.name}</h4>
                <p>${oddityObj.description}</p>
                <p>${souvenirs(oddityObj)}</p>
                <p>Restrooms available</p>
                <button class="close" id="close--${oddityObj.id}">Close</button>
            </dialog>
        </div>
            `
}

const souvenirs = (oddityObject) => {
    if (oddityObject.ameneties.souvenirs === true) {
        return "Souvenirs available"
    }else{
        return "Souvenirs not available"
    }
}
const derender = () => {
    contentTarget.innerHTML = ""
}