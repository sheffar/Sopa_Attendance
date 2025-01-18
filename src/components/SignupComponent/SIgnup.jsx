import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
    const [eyeIcon, setEyeIcon] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const [checkInput, setCheckInput] = useState({
        username: "",
        email: "",
        password: "",
    });

    const onchange = (e) => {
        setCheckInput({
            ...checkInput, 
            [e.target.name]: e.target.value
        });
        setError(''); // Reset the error message
    };

    const validateInput = async () => {
        if (!checkInput.username || !checkInput.email || !checkInput.password) {
            return setError("Please fill in all input fields");
        }
        
        const emailRegex = /@gmail\.com$/;
        if (!emailRegex.test(checkInput.email)) {
            return setError("Please enter a valid email address ending with '@gmail.com'");
        }

        try {
            setLoading(true);
            const reqData = await fetch("https://nifes-attendance-backend.vercel.app/signup", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(checkInput)
            });

            const resdata = await reqData.json();
            if (reqData.ok) {
                // Successful signup, navigate to home
                navigate("/");
            } else {
                console.log(resdata.message);
                setError(resdata.message);
            }
        } catch (error) {
            console.log(error.message);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const toggleIcon = () => setVisible(!visible);

    return (
        <>
            <div className="signup w-full md:w-1/3 h-fit mx-auto py-2 flex flex-col gap-2 items-center shadow-md absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                <p className="font-semibold text-base w-fit mx-auto bg-black text-white rounded-lg py-1 my-4 px-3">Nifes Admin</p>
                <p className="font-bold mx-auto w-fit text-2xl">Hello & Welcome!</p>

                <div className="w-full flex gap-6 flex-col p-4 px-3">
                    {error && <p className="text-red-600 w-full border-1 border-red-500 text-center">{error}</p>}
                    <div className="flex flex-col">
                        <label htmlFor="username" className="font-bold text-sm pb-1">User Name</label>
                        <input type="text" id="username" onChange={onchange} value={checkInput.username} name="username" className="border-2 border-black rounded-lg py-2 font-bold px-2" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-bold text-sm pb-1">Email</label>
                        <input type="text" id="email" name="email" onChange={onchange} value={checkInput.email} className="border-2 border-black rounded-lg py-2 font-bold px-2" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-bold text-sm pb-1">Password</label>
                        <div className="border-2 pr-2 border-black rounded-lg w-full flex items-center">
                            <input type={visible ? "text" : "password"} id="password" name="password" onChange={onchange} value={checkInput.password} className="w-full h-full outline-none rounded-lg py-2 font-bold px-2" />
                            {visible ? 
                                <FaEyeSlash className="stroke-1 cursor-pointer" onClick={toggleIcon} /> : 
                                <FaEye className="stroke-1 cursor-pointer" onClick={toggleIcon} />
                            }
                        </div>
                    </div>
                    <button className="p-2 font-bold w-full items-center bg-black mx-auto px-5 text-white rounded-lg" onClick={validateInput} disabled={loading}>
                        {loading ? "Loading... " : "Signup"}
                    </button>
                    <div className="flex justify-center items-center mt-4 gap-2">
                        <hr className="flex-1 border-gray-400 h-2"></hr>
                        <p className="font-semibold mb-1"> Or</p>
                        <hr className="flex-1 border-gray-400 h-2"></hr>
                    </div>
                    <Link to={"/login"} className="text-blue-400 w-fit mx-auto text-sm my-4">Login to an existing account</Link>
                </div>
            </div>
        </>
    );
};