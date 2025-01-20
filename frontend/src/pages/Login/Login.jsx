import React, { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/AuthContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setcredentials] = useState({
        username: undefined,
        password: undefined
    })
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const handleChange = (e) => {
        setcredentials((prev) => {
            return {
                ...prev, [e.target.id]: e.target.value
            }
        })
    }
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const response = await axios.post('http://localhost:8800/api/auth/login', credentials)
            dispatch({type:"LOGIN_SUCCESSFULL", payload:response.data})
            navigate('/')
        } catch (error) {
            dispatch({ type: "LOGIN_FAILED", payload: error.response.data })
        }
    }

    console.log(credentials)
    console.log(user)
    return (
        <div className='login'>
            <div className="lContainer">
                <input type="text" placeholder="username" id='username' onChange={handleChange} className="lInput" />
                <input type="password" placeholder="password" id='password' onChange={handleChange} className="lInput" />
                <button className="lButton" onClick={handleClick}>Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login