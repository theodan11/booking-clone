import { useEffect, useState } from "react"
import axios from 'axios'


const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {
        let abortController = new AbortController()
        let signal = abortController.signal
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(url, { signal })
                const data = await response.data
                setData(data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData()

        return () => {
            abortController.abort()
        }

    }, [url])


    const reFetch = async () => {
        setLoading(true)
        try {
            const response = await axios.get(url)
            const data = await response.data
            setData(data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return { data, loading, error, reFetch }
}

export default useFetch