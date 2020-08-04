let parks = []

export const useParks = () => {
    return parks.sort().slice()
}

export const getParks = () => {
    return fetch("https://developer.nps.gov/api/v1/parks?api_key=WYQcOkxi31284g8XJBncJJkeUQbmQzdlYMFpRhlx")
        .then(response => response.json())
        .then(
            parsedParks => {
                parks = parsedParks.data
            }
        )
}

