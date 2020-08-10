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
            <p>Eatery: ${itineraryObj.eateryName}</p>
            <p>Oddity: ${itineraryObj.oddityInfo.oddityName}</p>
    
        </section>
        `

    }).join("")

    contentTarget.innerHTML = itinerariesAsHTML

}