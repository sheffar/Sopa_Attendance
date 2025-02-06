import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export const EditUserComp = () => {
    const { userId } = useParams() // Get the userId from the URL
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [successMessage, setShowSuccess] = useState("")

    // Fetch the user data when component mounts
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `https://sopa-backend.vercel.app/find-user/${userId}`
                )
                const result = await response.json()

                if (response.ok) {
                    setUser(result)
                } else {
                    setError(result.message)
                }
            } catch (e) {
                setError("Error fetching user details: " + e.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [userId])

    useEffect(() => {
        console.log(user)
    }, [user])

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault()

        // Prepare payload with user data for updating
        const payload = { payload: user }

        try {
            setIsLoading(true)
            const response = await fetch(
                `https://attendance-backend-rosy.vercel.app/edit-users/${userId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            )
            const result = await response.json()

            if (response.ok) {
                // Redirect to users list page or show success message
                setShowSuccess("User detail has been updated")
                setTimeout(() => {
                    setShowSuccess("")
                }, 3000);
            } else {
                setError(result.message)
            }
        } catch (e) {
            setIsLoading(false)
            setError("Error updating user: " + e.message)
        } finally {
            setIsLoading(false)

        }
    }

    // Handle input changes to update the user object
    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

    }
    // Scroll to top when an Success message appears 
    if (successMessage !== "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Show loading while data is being fetched
    if (isLoading) return <div>Loading please wait...</div>

    return (
        <div className="w-full max-w-3xl mx-auto p-6">
            {error && <p className="text-red-600">{error}</p>}
            {successMessage !== "" ? <p className="text-green-500 border border-green-500 p-2 font-semibold my-2">{successMessage}</p> : ""}

            {user && (
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold mb-4">Edit User Details</h2>
                    {/* User information fields */}
                    <div className="mb-4">
                        <label className="block">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Level in School</label>
                        <input
                            type="text"
                            name="levelinschool"
                            value={user.levelinschool}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Lodge Name</label>
                        <input
                            type="text"
                            name="lodgename"
                            value={user.lodgename}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Phone Number</label>
                        <input
                            type="text"
                            name="phonenumber"
                            value={user.phonenumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Course of Study</label>
                        <input
                            type="text"
                            name="courseofstudy"
                            value={user.courseofstudy}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">DCG</label>
                        <input
                            type="text"
                            name="dcg"
                            value={user.dcg}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">State of Origin</label>
                        <input
                            type="text"
                            name="stateoforigin"
                            value={user.stateoforigin}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    )
}
