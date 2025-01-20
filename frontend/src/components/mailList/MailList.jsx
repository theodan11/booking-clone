import React from 'react'
import './mailList.css'

function MailList() {
    return (
        <div className='mailList'>
            <h1> Save time, save money!</h1>
            <span>Sign up and we'll send the best deals to you</span>
            <div className="mailInputContainer">
                <input type="text" placeholder='Your Email' />
                <button className="mailBtn">
                    Subscribe
                </button>
            
            </div>


        </div>
    )
}

export default MailList