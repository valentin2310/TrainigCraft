export const renderRateCharacter = ( value, index ) => {
    if (value < index + 1) {
        return <i className="ri-fire-fill text-gray-300"></i>
    }

    return <i className={`ri-fire-fill ${dificultadColor(value)}`}></i>
}

export const dificultadColor = ( value ) => {
    switch(value) {
        case 0: case 1:
            return 'text-green-500';
        case 2:
            return 'text-blue-500';
        case 3:
            return 'text-violet-500';
        case 4:
            return 'text-red-500'
        case 5:
            return 'text-rose-800'
    }
}