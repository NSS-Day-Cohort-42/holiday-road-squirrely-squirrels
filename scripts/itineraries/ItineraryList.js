import {getItineraries, useItineraries} from "./ItineraryProvider.js"

const contentTarget = document.querySelector(".savedItineraries")
const eventHub = document.querySelector(".container")


eventHub.addEventListener("itineraryChange", itineraryStateChangedEvent => {
    const currentArrOfItineraries = useItineraries()
    render(currentArrOfItineraries)

})

export const ItineraryList = () => {
    let itineraryArray = []
    getItineraries()
        .then(() => {
        itineraryArray = useItineraries()  
        render(itineraryArray)     
        })
}


const render = (arrayOfItineraries) => {
    const itinerariesAsHTML = arrayOfItineraries.map(itineraryObj => {
     
       return `
        <section class="itineraryCard">

            <p>Park: ${itineraryObj.parkInfo.parkName}</p>
            <p>Oddity: ${itineraryObj.oddityInfo.oddityName}</p>
            <p>Eatery: ${itineraryObj.eateryInfo.eateryName}</p>
            <button class="directionButton" id="directions--${itineraryObj.id}">Get Directions</button>
    
        </section>
        `

    }).join("")

    contentTarget.innerHTML = itinerariesAsHTML

}

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("directions--")){
        const objectId = event.target.id.split("--")[1]
        itineraryArray = useItineraries() 
        const itineraryObject = itineraryArray.find((itinerary) => {
            return parseInt(objectId) === itinerary.id
        })
        const customEvent = new CustomEvent("directionsClicked", {
            detail: {
                itineraryObj: itineraryObject
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})