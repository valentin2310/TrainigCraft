import { Avatar } from "@nextui-org/react"

export default function UserCard({ user }) {
    return (
        <div className="flex gap-5 bg-white/50 backdrop-blur py-4 px-4 sm:pe-8 rounded-lg shadow">
            {user && 
                <>
                    <Avatar isBordered color="primary" src={user.photoUrl} size="lg"></Avatar>
                    <div className="">
                        <p className="text-lg font-bold">{user.usuario}</p>
                        <p>{user.correo}</p>
                    </div>
                </>
            }
        </div>
    )
}