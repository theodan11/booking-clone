import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import './header.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import {
    faBed,
    faCalendar,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import  {SearchContext}  from '../../context/SearchContext.jsx';

import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
 


const Header = ({ type }) => {
    const navigate = useNavigate()
    // console.log(list)

    const {user} = useContext(AuthContext)
    const [destination, setDestination] = useState('')

    const [options, setOptions] = useState(false)
    const [optionsData, setOptionsData] = useState({
        'adult': 1,
        'child': 0,
        'room': 1
    })

    const handleOptionData = (name, operation) => {

        setOptionsData((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? optionsData[name] + 1 : optionsData[name] - 1,
            }
        })

    }


    const [openDate, setOpenDate] = useState(false)

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);
    const { dispatch } = useContext(SearchContext)

    const handleSearch = () => {
        dispatch({
            type: "NEW_SEARCH",
             payload: {
                city: destination,
                dates: date,
                options: optionsData
            }
        })
        navigate('/hotels', { state: { destination, date, optionsData } })
    }
    return (
        <div className='header'>
            <div className="headerContainer">
                <div className={type !== "list" ? "headerListItems headerTypeList" : "headerListItems"}>
                    <div className="headerlistItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerlistItem ">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerlistItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerlistItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerlistItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>

                {type !== "list" && (
                    <>
                        <div className="headerTitle">
                            <h1>A lifetime of discounts? It's Genius.</h1>

                        </div>
                        <div className="headerDesc">

                            <p>Get rewarded for your travels – unlock instant savings of 10% or more with a free Booking-Clone account</p>
                        </div>
                        {!user && <Link to={"/login"} >
                            <div className="headerBtn">
                            
                            <button>Sign in / Register</button>
                            
                        </div>
                        </Link>}

                        <div className="headerSearchContainer">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} /><input onChange={(e) => (setDestination(e.target.value))} placeholder='Where are you going?'></input>

                            </div>
                            <div className="headerSearchItem" >
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' onClick={() => setOpenDate(!openDate)} />
                                <span onClick={() => setOpenDate(!openDate)}>
                                    {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}
                                </span>
                                {openDate && <DateRange
                                    className='dateRange'
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    minDate={new Date()}
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' onClick={() => setOptions(!options)} /><span onClick={() => setOptions(!options)}>{`${optionsData.adult} adult . ${optionsData.child} children . ${optionsData.room} room`}</span>
                                {options && <div className="headerOptions">
                                    <div className="headerOptionItems">
                                        <span>Adult</span>
                                        <div className="headerOptionBtns">
                                            <button disabled={optionsData.adult <= 1} onClick={() => handleOptionData("adult", "d")}>-</button><span>{`${optionsData.adult}`}</span><button onClick={() => handleOptionData("adult", "i")}>+</button>

                                        </div>
                                    </div>
                                    <div className="headerOptionItems">
                                        <span>Child</span>
                                        <div className="headerOptionBtns">
                                            <button disabled={optionsData.child <= 0} onClick={() => handleOptionData("child", "d")}>-</button><span>{`${optionsData.child}`}</span><button onClick={() => handleOptionData("child", "i")}>+</button>

                                        </div>
                                    </div>
                                    <div className="headerOptionItems">
                                        <span>Room</span>
                                        <div className="headerOptionBtns">
                                            <button disabled={optionsData.room <= 1} onClick={() => handleOptionData("room", "d")}>-</button><span>{`${optionsData.room}`}</span><button onClick={() => handleOptionData("room", "i")}>+</button>

                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem" onClick={handleSearch}>
                                <button>Search</button>
                            </div>
                        </div>
                    </>)}
            </div>
        </div>
    )
}

export default Header