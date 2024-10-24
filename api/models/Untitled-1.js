
import { useState } from "react"
import { useSelector } from "react-redux"




export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            setError(false)

            const res = await fetch('/api/list/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            })
            const data = res.json()
            if (data.success === false) {
                setError(data.message)
            }
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }
    return (
        <main className="p-3 max-w-4xl mx-auto" >
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="desc"
                    placeholder="desc"
                    onChange={handleChange}
                />
                <button>{loading ? 'createing' : 'ok'}</button>
                {error && <p>{error}</p>}
            </form>
        </main>
    )
}