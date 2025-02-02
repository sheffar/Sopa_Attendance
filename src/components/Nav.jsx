import { FaHome } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { BiIdCard, BiLogOut, BiUser, BiUserCheck } from "react-icons/bi"
import { FaPerson } from "react-icons/fa6"
import { useState } from "react"



export const Nav = () => {
    const location = useLocation().pathname





    const HideNavRoutes = ['/login', '/signup']




    return (
        <>
            {!HideNavRoutes.includes(location) &&
                < div className="nav w-full  sticky  mb-4 top-0 z-10 right-0 flex py-4  justify-between items-center px-2 md:p-4 shadow-sm  shadow-black">

                    <Link to={"/"}>
                        <p className="font-bold text-black text-md items-center"> <span className="font-bold text-xl text-yellow-400 mr-1 style">N</span>ifes</p>
                    </Link>
                    <p className="font-semibold text-sm  items-center "> ..Building Tomorrow's Leaders Today</p>

                    <div className={` hidden py-4 md:py-2  md:flex  gap-16 items-center justify-center`}>

                        <Link to={"/"} className="flex items-center font-semibold text-sm gap-1 hover:scale-105 duration-300 mx-auto w-fit"> Home <FaHome size={20} /> </Link>
                        <Link to={"/report"} className="flex items-center gap-1 font-semibold text-sm hover:scale-105 duration-300 mx-auto w-fit"> Report <BiIdCard size={20}/> </Link>
                        <Link to={"/absentees"} className="flex items-center gap-1 hover:scale-105  font-semibold text-sm duration-300 mx-auto w-fit"> Get Absentees <FaPerson size={20}/> </Link>
                        <Link to={"/users"}  className="flex items-center gap-1 hover:scale-105 font-semibold text-sm duration-300 mx-auto w-fit"> Users  <BiUserCheck size={20}/>  </Link>
                    </div>

                </div >


            }

        </>
    )
}




