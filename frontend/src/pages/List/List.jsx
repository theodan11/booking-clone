import React, { useContext } from 'react'
import './list.css'
import NavBar from '../../components/navbar/NavBar'
import Header from '../../components/header/Header'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, defaultStaticRanges } from 'react-date-range';
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
const List = () => {
  const [openDate, setOpenDate] = useState(false)
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [optionsData, setOptionData] = useState(location.state.optionsData)
  const [date, setDate] = useState(location.state.date)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const destinationUp = destination.charAt(0).toUpperCase() + destination.slice(1)
  const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels?city=${destinationUp}&min=${min || 0}&max=${max || 99999}`)
  // console.log(location.state)
  const {dispatch} = useContext(SearchContext)
  const handleClick = () => {
    reFetch()
  }
  const handleOptionChange = (e)=>{
    setOptionData((prev)=> {return {...prev, [e.target.id]:e.target.value}})
}
  return (
    <div>
      <NavBar />
      <Header type={"list"} />

      <div className="list">

        <div className="listContainer">

          <div className="searchBox">
            <h1>Search</h1>

            <div className="searchItems">
              <span>Destination</span>
              <input type="text" placeholder={destination}  onChange={(e)=>{setDestination(e.target.value)}} />
            </div>
            <div className="searchItems dateSpan">
              <span>Check-in Date</span>
              <span onClick={() => setOpenDate(!openDate)} className='searchItemDate'>{`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(date[0].endDate, 'dd/MM/yyyy')}`}</span>



              {openDate && (<DateRange

                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
              />)}


            </div>
            <div className="searchItems">
              <span>Options</span>
              <div className="optionItems">
                <div className="optionItem">
                  <span>Min price per night</span>
                  <input type="number" onChange={(e) => { setMin(e.target.value) }} />
                </div>

                <div className="optionItem">
                  <span>Max price per night</span>
                  <input type="number" onChange={(e) => { setMax(e.target.value) }} />
                </div>


                <div className="optionItem">
                  <span>Adult</span>
                  <input type="number" id='adult' placeholder={optionsData.adult} onChange={(e)=>handleOptionChange(e)}/>
                </div>
                <div className="optionItem">
                  <span>Children</span>
                  <input type="number" id='child' placeholder={optionsData.child} onChange={(e)=>handleOptionChange(e)}/>
                </div>
                <div className="optionItem">
                  <span>Room</span>
                  <input type="number" id='room' placeholder={optionsData.room} onChange={(e)=>handleOptionChange(e)}/>
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="searchResultContainer">
            {loading ? <h1>Searching...</h1> :
              data.map((item) => {
                return <div className="listItemContainer" key={item._id}>
                <div className="imgContainer">
                  <img src="../../../img/112344221_p0.jpg" alt="nice pic" className='detailImg' />
                </div>
                <div className="detailContainer">
                  <h1 className='detailHeader'>{item.name}</h1>
                  <p className='detailDistance'>{item.distance}m from center</p>
                  <p className='detailTaxi'>Free airport taxi</p>
                  <span className='detailHotel'>{item.title}</span>
                  <p className='detailInfo'>{item.desc}</p>
                  <p className='detailCancel'>Free cancellation</p>
                  <span className='detailCancelDetail'>You can cancel later, so lock in this great price today!</span>
                </div>

                <div className="ratingContainer">
                  <div className="ratingTop">
                    <span className='ratingTitle'>Excellent</span>
                    {item.rating && <p className='rating'>{item.rating}</p>}

                  </div>
                  <div className="ratingBottom">
                    <span className='ratingPrice'>{item.cheapestPrice} tk</span>
                    <p className='ratingDetails'>Includes taxes and fees</p>
                    <Link to={`/hotels/${item._id}`}>
                      <button className='ratingBtn'  onClick={()=>dispatch({type:"NEW_SEARCH", payload:{city:destination, dates:date, options: optionsData}})} >
                        See availability
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            
                  




              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List