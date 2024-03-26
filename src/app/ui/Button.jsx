export default function Button({children}) {
    return (
        <button 
            className="bg-primary/20 border-2 border-primary p-2 sm:pe-8 rounded-lg shadow text-white hover:bg-primary duration-500">
                {children}
        </button>
    )
}