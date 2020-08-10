import { useEateryById } from "./EateryProvider.js"

const contentTarget = document.querySelector(".preview--eatery")
const eventHub = document.querySelector(".container")




//listen for custom event from eatery selects
eventHub.addEventListener("eaterySelected", (customEvent) => {
    const eateryId = customEvent.detail.eateryId

    if(eateryId !== "0") {
        const selectedEatery = useEateryById(eateryId)

        render(selectedEatery)
    }
    else {
        derender()
    }

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

eventHub.addEventListener("itineraryChange", () => {
    derender()
})

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
            <div class="list">
            <ul>
                ${ameneties(selectedEateryObj).map(amenity =>{
                    return `<li>${amenity}</li>`
                }).join('')}
            </ul>
            </div>
            <button class="closeButton" id="closeEateryDialog--${selectedEateryObj.id}">Close</button

        </dialog>
    </div>   
    `

}
const amenityList = ["petFriendly","wifi","diaperFacility","playground","restrooms"]
let amenitiesAvailable = []

const ameneties = (eateryObj) => {
   amenitiesAvailable=[]
   amenityList.forEach(item => {
       if (eateryObj.ameneties[item]){
           amenitiesAvailable.push(item)
       }
   })
   for (let i=0; i < amenitiesAvailable.length; i++){
       if(amenitiesAvailable[i] === "petFriendly"){
           amenitiesAvailable[i] = "pet friendly"
       }
       if(amenitiesAvailable[i] === "diaperFacility"){
           amenitiesAvailable[i] = "diaper facility"
       }
    }
    
   return amenitiesAvailable
}

const derender = () => {
    contentTarget.innerHTML = ""
}