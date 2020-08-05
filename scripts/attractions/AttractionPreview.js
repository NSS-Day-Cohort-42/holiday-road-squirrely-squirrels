import { useOddities } from "./AttractionProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("odditySelected", (event) => {
    oddityArray = useOddities()
    const oddityChosen = oddityArray.find(oddity => {
        return parseInt(event.detail.oddityId) === oddity.id 
    })
    render(oddityChosen)
})
eventHub.addEventListener("click", (event) => {
    
})


const render = (oddityObj) => {
    contentTarget.innerHTML += `
        <section class="preview preview--oddity">
            <h3>${oddityObj.name}</h3>
            <p>${oddityObj.city}, ${oddityObj.state}</p> 
            <button id="detail--${oddityObj.id}">Description</button>
            <dialog class="dialog--${oddityObj.id}>
            <p>${oddityObj.description}</p>
            <p>souvenirs: ${oddityObj.amenities.souvenirs}</p>
            <p>restrooms: ${oddityObj.amenities.restrooms}</p>
            </dialog>
        </section>
            `
            
}