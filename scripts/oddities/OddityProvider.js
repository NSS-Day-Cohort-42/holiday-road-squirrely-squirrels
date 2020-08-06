let oddities = []



export const useOddities = () => {
    oddities = oddities.filter (oddity => {
<<<<<<< HEAD
        return oddity.id < 52
=======
        return oddity.hasOwnProperty('name') && oddity.hasOwnProperty('ameneties')
>>>>>>> master
    })
    
    let filteredOddities = oddities.filter(oddity => {
        return oddity.ameneties.restrooms
    })
    return filteredOddities.slice()
}

export const useOddityById = oddityId => {
    return oddities.find(oddity => oddity.id === parseInt(oddityId))
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


