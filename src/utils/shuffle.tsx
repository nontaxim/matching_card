export const shuffleArray = (
    array: {
        url: string
        name: string
        value: number
        isOpen: boolean
        isClear: boolean
    }[],
): {
    url: string
    name: string
    value: number
    isOpen: boolean
    isClear: boolean
}[] => {
    let shuffledArray = array.slice() // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)) // Get a random index from 0 to i
        ;[shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ] // Swap elements
    }
    return shuffledArray
}

export default shuffleArray
