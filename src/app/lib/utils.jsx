import { format } from "rsuite/esm/utils/dateUtils";

export const renderRateCharacter = (value, index) => {
    if (value < index + 1) {
        return <i className="ri-fire-fill text-gray-300"></i>
    }

    return <i className={`ri-fire-fill ${dificultadColor(value)}`}></i>
}

export const dificultadColor = (value) => {
    switch (value) {
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

export const dificultadColorBorder = (value) => {
    switch (value) {
        case 0: case 1:
            return 'border-green-500';
        case 2:
            return 'border-blue-500';
        case 3:
            return 'border-violet-500';
        case 4:
            return 'border-red-500'
        case 5:
            return 'border-rose-800'
    }
}

export const generarGradient = (categorias) => {
    let gradient;

    if (!categorias || categorias.length === 0) {
        gradient = { backgroundColor: 'white' };
    } else if (categorias.length === 1) {
        gradient = { backgroundColor: categorias[0].color };
    } else {
        // Ordenar los colores por su cercanía al blanco o negro
        const sortedColors = categorias.sort((categoria1, categoria2) => {
            const rgb1 = parseInt(categoria1.color.substring(1), 16);
            const rgb2 = parseInt(categoria2.color.substring(1), 16);
            const distanciaBlanco1 = Math.abs(rgb1 - 0xffffff);
            const distanciaBlanco2 = Math.abs(rgb2 - 0xffffff);
            return distanciaBlanco1 - distanciaBlanco2;
        });

        // Crear el gradiente
        const color1 = sortedColors[0].color;
        const color2 = sortedColors[categorias.length - 1].color;
        gradient = {
            backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color2})`
        };
    }

    return gradient;
}

export const urlToBlob = async (url) => {
    const response = await fetch(url)
    const blob = await response.blob()
    return blob;
}

export const formatSecondsToTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
};

export const calcularFecha = (timestamp) => {
    const { seconds, nanoseconds } = timestamp

    const date = new Date(seconds * 1000 + nanoseconds / 1000000)
    const formattedDate = format(date, 'd/M/yyyy')

    return formattedDate;
}


export const getStartAndEndOfWeek = () => {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Ajusta el cálculo para que el lunes sea el primer día

    const firstDay = new Date(currentDate.setDate(diff));
    const lastDay = new Date(firstDay);
    lastDay.setDate(lastDay.getDate() + 6); // Añade 6 días para obtener el último día de la semana

    // Formatear las fechas en yyyy-M-d
    const formatDate = (date) => date.toISOString().split('T')[0];

    return {
        startOfWeek: formatDate(firstDay),
        endOfWeek: formatDate(lastDay),
    };
}