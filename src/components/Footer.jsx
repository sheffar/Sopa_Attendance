import { FaTwitter } from "react-icons/fa"
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6"
import { Link } from "react-router-dom"



export const Footer = () => {

    const links = [1, 2, 3, 4, 5, 6]
    return (
        <>
            <div className="w-full p-5 md:p-7 gap-3 md:gap-6 flex my-4 flex-col">
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">

                    <div className="flex flex-col sm:flex-row items-center justify-between  gap-3">
                        <p className="w-20 h-20 rounded-full bg-red-400"></p>
                        <p className="font-bold text-xl font-sans">GRATIA OF-GAD</p>
                    </div>

                    <div className="flex justify-center gap-4 items-center md:gap-6 flex-wrap  p-1 ">
                        {links.map((el, index) => (
                            <Link key={index} className="font-semibold hover:scale-105 duration-200  p-1 hover:text-blue-600 text-sm ">For design</Link>

                        ))}
                    </div>

                    <div className=" flex justify-between gap-5 md:gap-7">
                        <FaTwitter className="stroke-2 text-xl hover:cursor-pointer hover:scale-105 duration-200" />
                        <FaFacebook className="stroke-2 text-xl hover:cursor-pointer hover:scale-105 duration-200" />
                        <FaInstagram className="stroke-2 text-xl hover:cursor-pointer hover:scale-105 duration-200" />
                        <FaWhatsapp className="stroke-2 text-xl hover:cursor-pointer hover:scale-105 duration-200" />

                    </div>

                </div>
                <div className="w-fit  mx-auto my-5">
                    <p className="mx-auto text-sm font-medium text-black/70">© 2024 GRATIA OF-GAD </p>


                </div>
            </div>
        </>
    )
}
