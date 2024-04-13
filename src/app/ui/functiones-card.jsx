import { Image } from "@nextui-org/react"

export default function Card({titulo, descripcion, img}) {
    return (
        <div className="py-4 px-8 shadow-lg rounded-lg border-l-4 border-primary bg-gradient-to-br from-gray-100 to-gray-50 hover:from-primary/15 hover:to-primary/5 duration-500 ease-in-out">
            <Image
                radius="none"
                width={50}
                alt="Crear rutina"
                src={`/cards/${img}`}
            />
            <p className="text-primary font-bold text-xl mt-5">{titulo}</p>
            <p>{descripcion}</p>
        </div>
    )
}