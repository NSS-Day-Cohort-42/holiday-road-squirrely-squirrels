import { useEateries} from "./EateryProvider.js"

const contentTarget = document.querySelector(".preview--eatery")
const eventHub = document.querySelector(".container")




//listen for custom event from eatery selects
eventHub.addEventListener("eaterySelected", (customEvent) => {
    const allEateries = useEateries()
    const eaterySelected = allEateries.find(eatery => {
        return parseInt(event.detail.eateryId) === eatery.id
    })
    render(eaterySelected)

})  

eventHub.addEventListener("click", (clickEvent) => {
    const [prefix, eateryId] = event.target.id.split("--")
    if (event.target.id.startsWith("showEateryDetail--")) {
        const dialogTarget = document.querySelector(`.showEateryDialog--${eateryId}`)
        dialogTarget.showModal()
    }
    else if (event.target.id === `closeEateryDialog--${eateryId}`) {
        const theDialog = event.target.parentNode
        theDialog.close()
    }
})



//render function

const render = (selectedEateryObj) => {
    contentTarget.innerHTML = `
    <div class="previewBox">
        <h3>${selectedEateryObj.businessName}</h3>
        <div>${selectedEateryObj.city}, ${selectedEateryObj.state}</div>
        <button class="detailButton" id="showEateryDetail--${selectedEateryObj.id}">Details</button>
        <dialog class="dialog showEateryDialog--${selectedEateryObj.id}">
            <h4>${selectedEateryObj.businessName}</h4>
            <p>${selectedEateryObj.description}</p>
            <h5>Amenities</h5>
            <ul>
                ${ameneties(selectedEateryObj).map(amenity =>{
                    return `<li>${amenity}</li>`
                }).join('')}
            </ul>
            <button class="closeButton" id="closeEateryDialog--${selectedEateryObj.id}">Close</button

        </dialog>
    </div>   
    `

}
const amenityList = ["petFriendly","wifi","diaperFacility","playground","restrooms"]
let amenitiesAvailable = []

const ameneties = (eateryObj) => {
   amenityList.forEach(item => {
       if (eateryObj.ameneties[item]){
           amenitiesAvailable.push(item)
       }
   })
   amenitiesAvailable.forEach(item => {
       if(item === "petFriendly"){
           return "Pet Friendly"
       }
       if(item === "diaperFacility"){
           return "Diaper Facility"
       }
   })
   return amenitiesAvailable
}