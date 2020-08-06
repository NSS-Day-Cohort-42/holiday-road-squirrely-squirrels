import { useOddities, getOddities } from "./OddityProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".dropdownOddityContainer")


eventHub.addEventListener("change", (event) => {
    if(event.target.id === "odditySelect"){
        const customEvent = new CustomEvent("odditySelected", {
            detail: {
                oddityId: event.target.value
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})


export const odditySelect = () => {
    getOddities()
    .then(() => {
        const oddities = useOddities()
        render(oddities)
    })
}

const render = (oddityCollection) => {
    contentTarget.innerHTML += `
    <select class="dropdown dropdown--oddity" id="odditySelect">
        <option value="0">Select an oddity...</option>
        ${
            oddityCollection.map(oddity => {
                return `<option value="${oddity.id}">${oddity.name}</option>`
            }).join("")
        }
        </select>`
}