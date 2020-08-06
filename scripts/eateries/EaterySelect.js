import {useEateries, getEateries} from "./EateryProvider.js"

const contentTarget = document.querySelector(".dropdownEateryContainer")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "dropdown--eatery") {
        
        const selectedEatery = changeEvent.target.value

        const customEvent = new CustomEvent("eaterySelected", {
            detail: {
                eateryId: selectedEatery
            }
        })

        //dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

const render = eateryArray => {

    contentTarget.innerHTML += `
    <select class ="dropdown dropdown--eatery" id="dropdown--eatery">
        <option value="0">Select an eatery...</option>
        ${
            eateryArray.map(
                eateryObj => {
                    return `<option value="${eateryObj.id}">${eateryObj.businessName}</option>`
                }
            ).join("")
        }
    </select>
    `
}

export const EaterySelect = () => {
    getEateries()
        .then(() => {
            const eateries = useEateries()

            render(eateries)
        })
}