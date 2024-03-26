import Navbar from "@/app/ui/dashboard/navbar"

export default function Layout({ children }) {
    return (
        <div className="w-full flex flex-col sm:flex-row">
            <Navbar />

            <div className="w-full h-screen overflow-y-auto p-2 md:p-10">
                {children}
            </div>
        </div>
    )
}