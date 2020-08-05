let oddities = []

export const useOddities = () => {
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
