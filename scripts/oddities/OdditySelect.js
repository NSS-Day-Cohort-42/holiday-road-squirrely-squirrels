import { useOddities, getOddities, useOddityById } from "./OddityProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".dropdownOddityContainer")


eventHub.addEventListener("change", (event) => {
    if(event.target.id === "odditySelect"){
        const oddityId = event.target.value
        const oddity = useOddityById(oddityId)

        const oddityInfo = {}
        if(oddity) {
            oddityInfo.oddityName = oddity.name
            oddityInfo.oddityCity = oddity.city
            oddityInfo.oddityState = oddity.state
        }

        const customEvent = new CustomEvent("odditySelected", {
            detail: {
                oddityId: oddityId,
                oddityInfo: oddityInfo
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

eventHub.addEventListener("itineraryChange", () => {
    odditySelect()
})


export const odditySelect = () => {
    getOddities()
    .then(() => {
        const oddities = useOddities()
        render(oddities)
    })
}

const render = (oddityCollection) => {
    contentTarget.innerHTML = `
    <select class="dropdown dropdown--oddity" id="odditySelect">
        <option value="0">Select an oddity...</option>
        ${
            oddityCollection.map(oddity => {
                return `<option value="${oddity.id}">${oddity.name}</option>`
            }).join("")
        }
        </select>`
}