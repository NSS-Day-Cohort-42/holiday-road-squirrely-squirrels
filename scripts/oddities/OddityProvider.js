let oddities = []



export const useOddities = () => {
    oddities.pop()
    
    let filteredOddities = oddities.filter(oddity => {
        return oddity.ameneties.restrooms
    })
    return filteredOddities.slice()
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


