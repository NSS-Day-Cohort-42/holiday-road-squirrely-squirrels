import { useParks } from "./ParkProvider.js"


const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".park")

export const ParkSelect = () => {
    const parksCollection = useParks()

    eventHub.addEventListener("change", evt => {
        if (evt.target.id === "parkSelect") {
            const selectedPark = evt.target.value
            const message = new CustomEvent("parkSelected", {
                detail: {
                    parkCode: selectedPark
                }
            })
            eventHub.dispatchEvent(message)
        }
    })

    const render = parksCollection => {

        contentTarget.innerHTML = `
        <select class="dropdown" id="parkSelect">
            <option value="0">Please select a National Park...</option>
            ${
            parksCollection.map(
                park => `<option value="${park.parkCode}">${park.fullName}</option>`
            )
            }
        </select>
    `
    }
    render(parksCollection)
}