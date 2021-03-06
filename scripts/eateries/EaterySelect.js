import { useEateries, getEateries, useEateryById}  from "./EateryProvider.js"

const contentTarget = document.querySelector(".dropdownEateryContainer")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "dropdown--eatery") {
        const selectedEateryId = changeEvent.target.value
        const selectedEatery = useEateryById(selectedEateryId)

        const eateryInfo = {}
        if(selectedEatery) {
            eateryInfo.eateryName = selectedEatery.businessName
            eateryInfo.eateryCity = selectedEatery.city
            eateryInfo.eateryState = selectedEatery.state
        }

        const customEvent = new CustomEvent("eaterySelected", {
            detail: {
                eateryId: selectedEateryId,
                eateryInfo: eateryInfo
            }
        })

        //dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

eventHub.addEventListener("itineraryChange", () => {
    EaterySelect()
})

const render = eateryArray => {

    contentTarget.innerHTML = `
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