import { BiSolidHomeCircle, BiUserCheck, BiUserMinus } from "react-icons/bi"
import { BsHeart, BsReceipt } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"

export const BottomNav = () => {
    const location = useLocation().pathname

    const Hidelocation = ["/signup", "/login"]


    return (

        <div>
            {!Hidelocation.includes(location) &&
                <div className="bg-white md:hidden text-black flex justify-between  border p-3 fixed bottom-0  w-full right-0">

                    <Link to={"/"}>  <BiSolidHomeCircle size={18} className=" cursor-pointer" /> </Link>
                    <Link to={"/report"}>  <BsReceipt size={18} className=" cursor-pointer" /> </Link>
                    <Link to={"/absentees"}> <BiUserMinus size={18} className=" cursor-pointer" /> </Link>
                    <Link to={"/users"}> <BiUserCheck size={18} className=" cursor-pointer" /> </Link>
                </div>
            }

        </div>
    )
}
