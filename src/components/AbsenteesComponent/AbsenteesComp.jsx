import { useState } from "react"
import Spinner from "../Spinner"

export const AbsenteesComp = () => {
  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState("")



  // Function to get the current week number
  function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;

    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  const currentUsers = async () => {
    const currentDate = new Date();
    const thisWeekNumber = getWeekNumber(currentDate);

    console.log("This week number:", thisWeekNumber); // Log the week number

    const queryParams = new URLSearchParams({
      weeknumber: thisWeekNumber
    });

    setIsLoading(true);
    try {
      const response = await fetch(`https://sopa-backend.vercel.app/absentees?${queryParams.toString()}`);
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.message);
      }
    } catch (e) {
      console.log("Fetch error:", e.message);
      setError(e.message)
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>

      <div className="w-full items-center text-center">
        <button disabled={isLoading} className={`w-1/2 ${isLoading ? "bg-white" : "bg-black"} text-white p-2 my-2 mx-auto text-center`} onClick={currentUsers}>{isLoading ? <Spinner loading={isLoading} /> : "Abentees"}</button>

        {Error &&
          <p className="text-red-600 w-full md:w-[90%] mx-auto border-2 py-1 my-2  border-red-500 text-center">{Error}</p>
        }


        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-2 px-4 whitespace-nowrap">Attendees</th>
                <th className="py-2 px-4 whitespace-nowrap">Level in School</th>
                <th className="py-2 px-4 whitespace-nowrap">Lodge Name</th>
                <th className="py-2 px-4 whitespace-nowrap">Phone Number</th>
                <th className="py-2 px-4 whitespace-nowrap">Course of Study</th>
                <th className="py-2 px-4 whitespace-nowrap">DCG</th>
                <th className="py-2 px-4 whitespace-nowrap">State of Origin</th>
                <th className="py-2 px-4 whitespace-nowrap">Gender</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((info, index) => (
                <tr key={info._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="py-2 px-4">{info.username}</td>
                  <td className="py-2 px-4">{info.levelinschool}</td>
                  <td className="py-2 px-4">{info.lodgename}</td>
                  <td className="py-2 px-4">{info.phonenumber}</td>
                  <td className="py-2 px-4">{info.courseofstudy}</td>
                  <td className="py-2 px-4">{info.dcg}</td>
                  <td className="py-2 px-4">{info.stateoforigin}</td>
                  <td className="py-2 px-4">{info.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>

    </>
  )
}
