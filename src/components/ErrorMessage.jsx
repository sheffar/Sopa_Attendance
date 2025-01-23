
export const ErrorMessage = ({ children, className }) => {
    return (
        <>
            <div className={`w-full md:w-1/2   h-auto ${className} mx-auto  rounded-lg p-2`}>
                {children}
            </div>
        </>
    )
}
