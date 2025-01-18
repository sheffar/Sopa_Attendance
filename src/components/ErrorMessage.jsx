
export const ErrorMessage = ({ children, className }) => {
    return (
        <>
            <div className={`w-full md:w-1/2   h-auto ${className} mx-auto translate-1/2 z-10 top-1/2 absolute  rounded-lg p-2`}>
                {children}
            </div>
        </>
    )
}
