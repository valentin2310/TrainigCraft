import { Image } from "@nextui-org/react"

export default function UserCard({ user }) {
    return (
        <div className="flex gap-5 bg-white/50 backdrop-blur py-4 ps-4 pe-8 rounded-lg shadow">
            <Image
                width={50}
                radius="full"
                alt="Imagen de avatar del usuario"
                src={user.photoUrl}
            />
            <div className="">
                <p className="text-lg font-bold">{user.usuario}</p>
                <p>{user.correo}</p>
            </div>
        </div>
    )
}