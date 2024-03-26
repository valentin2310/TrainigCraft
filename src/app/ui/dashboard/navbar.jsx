import NavLinks from "./nav-links"
import Link from "next/link"

export default function Navbar() {
    return (
        <header className="w-full sm:h-screen sm:w-[320px] bg-dark px-2 sm:py-10 sm:px-5 text-white">
            <div className="hidden sm:grid place-items-center px-4">
                <p className="text-xl text-primary text-center font-bold">TrainigCraft</p>
                <div className="rounded-full w-32 h-32 my-8 bg-secondary shadow-lg grid place-items-center">
                    <p className="text-3xl">TR</p>
                </div>
                <hr className="w-full" />
            </div>
            <div className="flex sm:flex-col gap-3 py-8">
                <NavLinks />
            </div>
            {/* <Link 
                key={'logout'}
                href={'logout'}
                className={'hidden sm:block bottom-5 w-full py-2 px-4 text-red-500 bg-secondary rounded-lg hover:bg-red-500 hover:text-white duration-500'}
            >
                <i className={`ri-logout-circle-r-line sm:me-2`}></i><span className="hidden sm:inline">Cerrar sesión</span>
            </Link> */}
        </header>
    )
}