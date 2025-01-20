import { BiError } from "react-icons/bi"
import { FaBook, FaTimesCircle, FaUser } from "react-icons/fa"
import { FaFlag, FaHouse } from "react-icons/fa6"
import { useEffect, useState } from "react"
import SuccessMessage, { Count } from "../Count"
import { ErrorMessage } from "../ErrorMessage"
import Spinner from "../Spinner"

export const Attendance = () => {

  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState("");
  const [todaysAttandance, setTodaysAttandance] = useState([])
  const [loading, setLoading] = useState(false)

  //Hide input state
  const [hide, setHide] = useState(false)

  // hide Error message
  const [closeError, setCloseError] = useState(false)

  const close = () => setCloseError(!closeError)

  //The add user btn
  const addUser = () => setHide(!hide)

  //phone number length 
  const [phoneNumberLength, setPhoneNumberLength] = useState(0);

  //Error state
  const [Error, setError] = useState("")


  const [checkInput, setCheckInput] = useState({
    phonenumber: "",
    username: "",
    levelinschool: "",
    lodgename: "",
    courseofstudy: "",
    dcg: "",
    day: "",
    month: "",
    stateoforigin: "",
    gender: "",
  })

  const validateInput = async () => {

    if (checkInput.phonenumber === "" || checkInput.phonenumber.length < 11) {
      setError("Please input a valid  phonenumber")
      return

    }

    if (checkInput.username === "") {
      setError("Input attandant name")
      return

    }
    if (checkInput.levelinschool === "") {
      setError("Attendant level in school cannot be empty")
      return

    }

    if (checkInput.lodgename === "") {
      setError("Input the name of attadendant lodge")
      return

    }

    if (checkInput.courseofstudy === "") {
      setError("Course of study cannot be empty")
      return

    }
    if (checkInput.dcg === "") {
      setError("Dcg center cannot be empty")
      return

    }
    if (parseInt(checkInput.day, 10) > 31) {
      setError("Day of birth cannot be greater than 31")
      return


    }
    if (checkInput.day === "" || checkInput.month === "") {

      if (parseInt(checkInput.day, 10) > 31) {
        setError("Day of birth cannot be greater than 31")
        return

      }


      setError("please input the day and month of birth of the attandant")
      return

    }
    if (checkInput.stateoforigin === "") {
      setError("State of origin field cannot be empty")
      return

    }
    if (checkInput.gender === "") {
      setError("Please select attendant gender")
      return


    }


    try {
      setLoading(true)
      const reqData = await fetch("https://attendance-backend-rosy.vercel.app/submit", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkInput),
      })
      const resData = await reqData.json()

      if (reqData.ok) {
        setShowSuccess(true);
        setShowSuccessMessage(resData)
        // Clear input fields after successful submission
        setCheckInput({
          phonenumber: "",
          username: "",
          levelinschool: "",
          lodgename: "",
          courseofstudy: "",
          dcg: "",
          day: "",
          month: "",
          stateoforigin: "",
          gender: "",
        });
        setError("");  // Clear errors on successful submission
      } else {
        console.log(reqData)
        setError(typeof resData.message === 'string' ? resData.message : JSON.stringify(resData.message));
      }

    } catch (error) {
      console.log(error.message)
      setError(error.message);
    } finally {
      setLoading(false)

    }
  }

  const currentUsers = async () => {

    try {
      const response = await fetch("https://attendance-backend-rosy.vercel.app/currentusers")
      const result = await response.json()


      if (response.ok) {
        setTodaysAttandance(result)

      } else {
        console.log(e.message)
      }
    } catch (e) {
      console.log(e.message)
    }
  }


  const checkPhoneNumber = async () => {
    console.log(checkInput.phonenumber)

    try {
      const reqData = await fetch("https://attendance-backend-rosy.vercel.app/attendance", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phonenumber: checkInput.phonenumber
        })
      })

      const resData = await reqData.json()


      if (reqData.ok) {
        // setApiNames(resData)
        console.log(resData.message)
      } else {
        console.log(resData.message)
        setError(resData.message);


      }

    } catch (error) {
      console.log(error.message)
      setError(error.message);

    }

  }

  // Hide the success message
  const handleClose = () => {
    setShowSuccess(false);
    setShowSuccessMessage("")
  };

  useEffect(() => {
    if (checkInput.phonenumber.trim().length >= 5) {//fire the function that checks for phone number in the db
      checkPhoneNumber()
    }
  }, [phoneNumberLength])

  useEffect(() => {
    currentUsers()

  }, [])

  const onchange = (e) => {

    if (e.target.name === 'phonenumber') {
      setPhoneNumberLength(e.target.value.length)
    }
    setCheckInput({
      ...checkInput, [e.target.name]: e.target.value
    })
    setError("")
  }



  if (loading) {
    return <Spinner loading={loading} />;
  }


  return (
    <>
      {Error && (
        <ErrorMessage className="mx-auto bg-red-500 text-center text-[16px] font-semibold">
          <p>{Error}</p> {/* Ensure Error is a string */}
        </ErrorMessage>
      )}

      {showSuccess && (
        <SuccessMessage message={showSuccessMessage.message} onClose={handleClose} />
      )}

      <div className={`w-full bg-white ${!hide ? "grid-cols-1" : "md:grid-cols-2"} relative  p-2 grid  gap-2`}>

        <div className="w-full   flex flex-col gap-2">
          <label htmlFor="phonenumber" className="font-bold text-sm"> Input attendant phone number</label>

          <div className="w-full border-2 border-black rounded-md bg-white p-1 flex">
            <input type="text" id="phonenumber" onChange={onchange} value={checkInput.phonenumber} name="phonenumber" className="w-full bg-white font-semibold outline-none" />
            <p onClick={addUser} className="justify-center text-[15px] rounded-md p-1 cursor-pointer  items-center bg-black text-white"> New</p>
          </div>
        </div>


        {hide && <div className="w-full   flex flex-col gap-2">
          <label htmlFor="username" className="font-bold text-sm"> Attendant Name</label>
          <div className="w-full border-2 border-black rounded-md bg-white p-1 flex">
            <input type="text" onChange={onchange} value={checkInput.username} name="username" id="username" className="w-full bg-white font-semibold outline-none" />
            <FaUser className="justify-center text-xl  items-center" />
          </div>

        </div>}
        {hide && <div className="w-full   flex flex-col gap-2">
          <label htmlFor="levelinschool" className="font-bold text-sm"> Level in school </label>

          <div className="w-full border-2 border-black rounded-md bg-white p-1 flex">
            <input type="text" onChange={onchange} value={checkInput.levelinschool} name="levelinschool" id="levelinschool" className="w-full bg-white font-semibold outline-none" />
            <FaHouse className="justify-center text-xl  items-center" />
          </div>

        </div>}


        {hide && <div className="w-full   flex flex-col gap-2">
          <label htmlFor="lodgename" className="font-bold text-sm"> Name of Lodge </label>

          <div className="w-full border-2 border-black rounded-md bg-white p-1 flex">
            <input type="text" id="lodgename" onChange={onchange} value={checkInput.lodgename} name="lodgename" className="w-full bg-white font-semibold outline-none" />
            <FaHouse className="justify-center text-xl  items-center" />
          </div>
        </div>}

        {hide && <div className="w-full   flex flex-col gap-2">
          <label htmlFor="courseofstudy" className="font-bold text-sm"> Course of study</label>

          <div className="w-full border-2 border-black rounded-md bg-white p-1 flex">
            <input type="text" id="courseofstudy" onChange={onchange} value={checkInput.courseofstudy} name="courseofstudy" className="w-full bg-white font-semibold outline-none" />
            <FaBook className="justify-center text-xl  items-center" />
          </div>
        </div>}

        {hide && <div className="w-full   flex flex-col gap-2">
          <label htmlFor="dcg" className="font-bold text-sm"> Dcg Center</label>

          <div className="w-full border-2 border-black rounded-md bg-white p-1 flex">
            <input type="text" id="dcg" onChange={onchange} value={checkInput.dcg} name="dcg" className="w-full bg-white font-semibold outline-none" />
            <FaHouse className="justify-center text-xl  items-center" />
          </div>
        </div>}

        {hide && <div className="w-full   flex flex-col gap-1">
          <label htmlFor="dateofbirth" className="font-bold text-sm"> Date of birth</label>

          <div className="w-full border-2 flex gap-1 border-black rounded-md bg-white p-1 ">
            <input type="number" min={1} onChange={onchange} value={checkInput.day} name="day" max={31} placeholder="Day" id="day" className="w-1/2 bg-white font-semibold   border-2 border-black" />

            <select name="month" className="w-1/2 bg-white font-semibold text-black  border-2 border-black" onChange={onchange} value={checkInput.month} id="month">
              <option value=""></option>
              <option value="Jan-01">Jan</option>
              <option value="Feb-02">Feb</option>
              <option value="March-03">March</option>
              <option value="Ap-04">Ap</option>
              <option value="May-05">May</option>
              <option value="June-06">June</option>
              <option value="July-7">July</option>
              <option value="Aug-08">Aug</option>
              <option value="Sept-09">Sept</option>
              <option value="Oct-10">Oct</option>
              <option value="Novem-1">Nov</option>
              <option value="Decm-12">Dec</option>
            </select>
          </div>
          {/* <p className="w-full bg-red-400"> Error</p> */}

        </div>}


        {hide && <div className="w-full   flex flex-col gap-2">
          <label htmlFor="stateoforigin" className="font-bold text-sm"> State of origin</label>

          <div className="w-full border-2 border-black rounded-md bg-white p-1 flex">
            <input type="text" id="stateoforigin" onChange={onchange} value={checkInput.stateoforigin} name="stateoforigin" className="w-full bg-white font-semibold outline-none" />
            <FaFlag className="justify-center text-xl  items-center" />
          </div>
        </div>}


        {hide && <div className="w-full   flex flex-col gap-2">
          <label htmlFor="gender" className="font-bold text-sm"> Gender</label>

          <select name="gender" id="gender" onChange={onchange} value={checkInput.gender} className="p-2 bg-white outline-none border-2 text-sm font-semibold border-black rounded-lg">
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>}

        {hide &&
          <button className="w-fit  md:w-full p-3 mt-4 shadow-sm hover:translate-y-1  duration-300 shadow-black md:p-2 px-10  bg-black font-semibold text-sm text-white rounded-md mx-auto" onClick={validateInput}> Submit</button>
        }


        {closeError &&
          <div className="absolute -translate-x-1/2 left-1/2 w-full translate-y-1/2 top-1/2 ">
            <ErrorMessage className="bg-black mx-auto items-center flex flex-col relative text-white gap-4 justify-center">
              <FaTimesCircle className="text-2xl absolute top-2 cursor-pointer right-2" onClick={close} />

              <BiError className=" text-4xl" />
              <p>username</p>

            </ErrorMessage>
          </div>
        }


      </div>
      <Count className="rounded-md my-3">
        <p className="font-semibold text-sm"> Total Number of Attandent For Today:</p>
        <p className="font-bold text-base">{todaysAttandance.length}</p>
      </Count>



    </>
  )
}
