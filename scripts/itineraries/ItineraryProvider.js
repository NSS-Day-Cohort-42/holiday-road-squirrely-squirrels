const eventHub = document.querySelector(".container")

let itineraries = []

const dispatchStateChangeEvent = () => {
    const itineraryStateChangedEvent = new CustomEvent("itineraryChange")
    eventHub.dispatchEvent(itineraryStateChangedEvent)
}


export const getItineraries = () => {
    return fetch("http://localhost:8088/itineraries")
    .then(response => response.json())
    .then(parsedItineraries => {
        itineraries = parsedItineraries
    })
}

export const saveItinerary = itinerary => {
    return fetch("http://localhost:8088/itineraries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itinerary)
    })
    .then(getItinerary)
    .then(dispatchStateChangeEvent)
}

export const useItineraries = () => {
    return itineraries.slice()
}