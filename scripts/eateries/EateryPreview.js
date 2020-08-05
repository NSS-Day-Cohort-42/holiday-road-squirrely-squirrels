import {useEateries, getEateries} from "./EateryProvider.js"

const contentTarget = document.querySelector(".attractionPreviewContainer")
const eventHub = document.querySelector(".container")



export const EateryPreview = () => {
    //listen for custom event from eatery selects
    eventHub.addEventListener("eaterySelected", (customEvent) => {

        const eaterySelected = customEvent.detail.eateryId

        const allEateries = useEateries()

        const selectedEatery = allEateries.find(
            (eateryObj) => {
                return eaterySelected === eateryObj.id
            }
        ) //returns one object with matching id

        //add to DOM
        render 
    })

}

//render function

const render = (selectedEateryObj) = {
    return `
    <section class="preview preview--eatery">
        <h3>${selectedEateryObj.businessName}</h3>
        <div>${selectedEateryObj.city} , ${selectedEateryObj.state}</div>
        <button id="detail--${selectedEateryObj.id}">Details</button>
        <dialog class=

    </section>
    `
   
}