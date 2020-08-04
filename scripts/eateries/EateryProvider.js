let eateries = []

export const useEateries = () => {
    return eateries.sort().slice()
}

export const getEateries = () => {
    return fetch("endpoint goes here")
        .then(response => response.json())
        .then(
            parsedEateries => {
                eateries = parsedEateries
            }
        )
}

