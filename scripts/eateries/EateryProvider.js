// gets data from eatery api

let eateries = []
const minimumScore = 3

export const useEateries = () => {
    return eateries.slice()
}

export const getEateries = () => {
    return fetch("http://holidayroad.nss.team/eateries")
        .then(response => response.json())
        .then(
            parsedEateries => {

                eateries = parsedEateries
                scoreEateries()
                rankEateries()
                filterEateries()
            }
        )
}

export const scoreEateries = () => {
    for (const eatery of eateries) {
        let score = 0
        if (eatery.ameneties.petFriendly) {
            score++
        }
        if (eatery.ameneties.wifi) {
            score++
        }
        if (eatery.ameneties.diaperFacility) {
            score++
        }
        if (eatery.ameneties.playground) {
            score++
        }
        if (eatery.ameneties.restrooms) {
            score++
        }
        eatery.profileScore = score
    }
}

const rankEateries = () => {
    eateries.sort( (currentElement, nextElement) => {
        return nextElement.profileScore - currentElement.profileScore
    })
}

const filterEateries = () => {
    eateries = eateries.filter( eatery => {
        return eatery.profileScore >= minimumScore
    })
}
