import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios';

import './reserve.css'
const Reserve = ({ setModal, hotelId }) => {
  const [selected, setSelected] = useState([])
  const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`)
  const { dates } = useContext(SearchContext)
  const navigate = useNavigate()
  const handleSelected = (e) => {
    const checked = e.target.checked
    const value = e.target.value

    setSelected(checked ? [...selected, value] : selected.filter((item) => item != value))
  }


  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAvailableDates.some(date => (allDates.includes(new Date(date).getTime())))
    return !isFound
  }
  const getDateDiff = (start, end) => {
    const date = new Date(start.getTime())
    let list = []
    while (date <= end) {
      list.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return list
  }
  const handleClick = async () => {
    try {
      await Promise.all(selected.map(roomId => {
        const res = axios.put(`http://localhost:8800/api/rooms/updateAvailability/${roomId}`, { dates: allDates })
        return res.data
      }))
    } catch (error) {

    }

    navigate('/')
  }

  const allDates = getDateDiff(dates[0]?.startDate, dates[0]?.endDate)
  return (
    <div className='reserve'>
      <div className="rContainer">
        <FontAwesomeIcon className='rClose' icon={faXmarkCircle} onClick={() => setModal(false)} />
        <span>Select your rooms:</span>
        {data.map((item => {
          return <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
              <div className="rPrice">{item.price} tk</div>
            </div>
            <div className="rSelectedRooms">

              {item.roomNumbers.map((roomNumber) => {
                return <div className="room" key={roomNumber._id}>
                  <label >{roomNumber.number} </label>
                  <input type="checkbox" value={roomNumber._id} onChange={handleSelected} disabled={!isAvailable(roomNumber)} />
                </div>
              })}
            </div>
          </div>
        }))}
        <button className='rButton' onClick={handleClick}>Reserve</button>
      </div>
    </div>
  )
}

export default Reserve