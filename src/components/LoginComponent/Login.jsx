import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash, FaTimesCircle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { ErrorMessage } from "../ErrorMessage";
import { BiError } from "react-icons/bi";

export const Login = () => {
    const [Eyeicon, setEyeIcon] = useState(false)
    const [visible, setVisible] = useState(false)
    const [apiData, setApiData] = useState([])
    const [loading, setLoading] = useState(false)
    const [Error, setError] = useState('')
    const navigate = useNavigate()  


    const toggleIcon = () => setVisible(!visible)

    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const getValue   = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        })
        setError("")
    } 

    const apicall = async () => {
        console.log(values.username)
        if (!values.username.trim()) {
            return setError("please username cannot be empty")
        }
        if (values.username.length < 4) {
            return setError("Please username cannot be less than 4 char longs")
        }
        if (!values.password.trim()) {
            return setError("please password cannot be empty")
            
        }

       
        
        try {
            setLoading(true)

            const reqData = await fetch("https://nifes-attendance-backend.vercel.app/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password
                })
            })


            const resData = await reqData.json()

            console.log(reqData)


            if (reqData.ok) {
                setApiData(resData)
                navigate("/")
            } else {
                console.log(resData.message)
                setError(resData.message)
                // setCloseError(true)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)//reset loading state to false after the requst is complete
        }



    }






    return (
        <>
            <div className="login  md:rounded-md w-full my-5 md:w-1/3 h-fit mx-auto py-2 flex flex-col gap-2 items-center md:shadow-xl   absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                <p className="font-semibold text-base w-fit mx-auto bg-black text-white rounded-lg py-1 my-4 px-3">Nifes Admin</p>
                <p className="font-bold mx-auto w-fit text-2xl">Hello & Welcome!</p>

                <div className="w-full  flex gap-6    flex-col p-4 px-3 ">
                {Error &&
                            <p className="text-red-600 w-full border-1 border-red-500 text-center">{Error}</p>
                        }
                    <div className="flex flex-col">
                        <label htmlFor="username" className="font-bold text-sm pb-1">User Name</label>
                        <input type="text" onChange={getValue} value={values.username} name="username" id="username" className="border-2 border-black rounded-lg py-2 font-bold  px-2" />
                      
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-bold text-sm pb-1">Password</label>
                        <div className="border-2 border-black rounded-lg  w-full flex px-2  items-center">
                            <input type={visible ? "text" : "password"} id="password" onChange={getValue} value={values.password} name="password" className=" w-full h-full  outline-none rounded-lg py-2 font-bold  px-2" />
                            {!visible ?
                                <FaEyeSlash className="text-xl cursor-pointer" onClick={toggleIcon} />
                                :
                                <FaEye className="text-xl cursor-pointer" onClick={toggleIcon} />

                            }

                        </div>
                    </div>
                    <button className="p-2 font-bold w-full items-center bg-black mx-auto px-5  hover:scale-105  duration-200 text-white rounded-lg" onClick={apicall} disabled={loading}>{loading ? "Loading... " : "Login"}</button>
                    <div className="flex justify-center items-center mt-4  gap-2">
                        <hr className="  flex-1 border-gray-400 h-2"></hr>
                        <p className="font-semibold mb-1"> Or</p>
                        <hr className="  flex-1 border-gray-400 h-2"></hr>
                    </div>
                    <Link to="/signup" className="text-blue-400 w-fit mx-auto text-sm my-4">Create a new account</Link>
                </div>


            </div>
           
        </>
    )
}

