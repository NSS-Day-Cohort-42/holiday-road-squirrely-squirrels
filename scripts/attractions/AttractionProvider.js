let oddities = []



export const useOddities = () => {
    oddities = oddities.filter(oddity => {
        return oddity.ameneties.restrooms
    })
    return oddities.slice()
}

export const getOddities = () => {
    return fetch("http://holidayroad.nss.team/bizarreries")
    .then(response => response.json())
    .then(
        parsedOddities => {
            oddities = parsedOddities
        }
    )
}


