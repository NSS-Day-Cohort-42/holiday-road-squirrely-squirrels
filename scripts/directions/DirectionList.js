import { getDirections, useDirections } from "./DirectionProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".directionsContainer")

eventHub.addEventListener("directionsClicked", event => {
  renderLoading()

  const itineraryObj = event.detail.itineraryObj

  getDirections(itineraryObj)
    .then(() => {
      const directions = useDirections()
      render(directions, itineraryObj)
    })
})

const renderLoading = () => {
  contentTarget.innerHTML = `
    <div class="directionList--loading">
      <p class="directionList--loading__text">Loading directions...</p>
      <img class="directionList--loading__spinner" src="./images/loadingSpinner.gif">
    </div>
  `
}

const render = (directions, itineraryObj) => {
  const parkInfo = itineraryObj.parkInfo
  const oddityInfo = itineraryObj.oddityInfo
  const eateryInfo = itineraryObj.eateryInfo

  const { parkName, parkCity, parkState } = parkInfo
  const { oddityName, oddityCity, oddityState } = oddityInfo
  const { eateryName, eateryCity, eateryState } = eateryInfo

  const headerHTML = buildHeaderHTML([ 'Nashville', parkName, oddityName, eateryName ])
  const googleMapsLink = buildGoogleMapsLink([ 'Nashville,TN', `${parkCity},${parkState}`, `${oddityCity},${oddityState}`, `${eateryCity},${eateryState}` ])

  contentTarget.innerHTML = `
    ${headerHTML}
    ${googleMapsLink}
    <ol class="directionList">
      ${directions.map(direction => `<li class="direction">${direction}</li>` ).join("")}
    </ol>
  `
}

const buildHeaderHTML = stopsOnTrip => {
  return `
    <h3 class="directionList__header">
      Directions from 
      ${
          stopsOnTrip.map(stop => `<span class="directionList__headerStop">${stop}</span>`)
            .join(" to ")
      }
    </h3>
  `
}

/**
 * Build a Google Maps link for the array of location names
 * URL conforms to requirements as specified in Google Maps URL encoding rules defined here: https://developers.google.com/maps/documentation/urls/get-started#directions-action
 */
const buildGoogleMapsLink = locationStrings => {
  const baseURL = "https://www.google.com/maps/dir/?api=1"

  const origin = encodeURIComponent(locationStrings[0])
  const destination = encodeURIComponent(locationStrings[locationStrings.length - 1])
  const waypoints = encodeURIComponent(locationStrings.slice(1, locationStrings.length - 1).join("|"))

  return `<a class="directionsGoogleMapsLink" href="${baseURL}&origin=${origin}&waypoints=${waypoints}&destination=${destination}" target="_blank">(Directions in Google Maps)</a>`
}