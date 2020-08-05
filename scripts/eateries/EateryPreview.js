import {useEateries, getEateries} from "./EateryProvider.js"

const contentTarget = document.querySelector(".attractionPreviewContainer")
const eventHub = document.querySelector(".container")



export const EateryPreview = () => {
    //listen for custom event from eatery selects
    eventHub.addEventListener("eaterySelected")



}