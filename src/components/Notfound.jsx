import { BiError } from "react-icons/bi"
import { Link } from "react-router-dom"

export const Notfound = () => {
  return (
    <>
      <div className="md:w-1/2 w-full  py-3 flex flex-col items-center gap-3 md:gap-2 my-5  mx-auto justify-center ">
      <BiError className="text-7xl"/>
        <p className="text-xl font-bold text-red-500">404 Not Found</p>
        <p className="text-sm font-bold text-red-500">This page does not exist yet!</p>
        <Link to="/" > <button className="bg-black p-2 items-center font-semibold text-white rounded-lg"> Go Back</button> </Link>

      </div>
    </>
  )
}
