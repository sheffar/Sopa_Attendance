import { FaCheckCircle } from "react-icons/fa";

export const Count = ({ children, className = "" }) => {
  return (
    <>
      <div className={`w-full p-2 flex justify-between ${className} border  rounded-md shadow-md`}>
        {children}
      </div>
    </>
  )
}



const SuccessMessage = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 flex flex-col items-center">
        <FaCheckCircle className="text-green-500 text-4xl mb-4" />
        <h2 className="text-xl font-bold text-black mb-2">Success</h2>
        <p className="text-black font-semibold text-center mb-4">{message}</p>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
