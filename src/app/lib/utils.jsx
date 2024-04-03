export const renderRateCharacter = ( value, index ) => {
    if (value < index + 1) {
        return <i className="ri-fire-fill text-gray-300"></i>
    }
    if (value <= 2) {
        return <i className="ri-fire-fill text-blue-500"></i>
    }

    if (value == 3) {
        return <i className="ri-fire-fill text-green-500"></i>
    }

    return <i className="ri-fire-fill text-red-500"></i>
}