import React, { useContext, useState } from 'react'
import './hotel.css'
import Navbar from '../../components/navbar/NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import {
  faArrowLeft,
  faArrowRight,
  faCross,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext.jsx'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {

  const id = useLocation().pathname.split('/')[2]
  const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/find/${id}`)
  // console.log(id)
  // console.log(data)
  const hotelImgs = [
    "../../../img/112344221_p0.jpg",
    "../../../img/112344221_p1.jpg",
    "../../../img/112344221_p2.jpg",
    "../../../img/112344221_p3.jpg",
    "../../../img/112344221_p4.jpg",


  ]
  const [openImg, setOpenImg] = useState(false)
  const [imgIndex, setImgIndex] = useState()
  const handleImage = (index) => {
    // console.log(index)
    setImgIndex(index)
    setOpenImg(true)
  }


  const { dates, options } = useContext(SearchContext)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  const timeDiff = Math.abs(dates[0]?.endDate.getTime() - dates[0]?.startDate.getTime())
  const dateDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
  console.log(`this is from hotel ${dateDiff} and room ${options.room}`)

  // function dayDiff(date1, date2){
  //   const timeDiff = 
  // }
  const {user} = useContext(AuthContext)
  const nav = useNavigate()
  const [modal, setModal] = useState(false)
  const handleClick = ()=>{
    if(user){
      setModal(true)
    }else{
      nav('/login')
    }
  }

  return (
    <>
      {openImg && (
        <div className="imgViewCon">
          <FontAwesomeIcon icon={faArrowLeft} className='arrowBtn' onClick={() => setImgIndex(imgIndex <= 0 ? hotelImgs.length - 1 : imgIndex - 1)} />
          <div className="imgViewer" key={imgIndex}>
            <img className='sliderImage' src={`${hotelImgs[imgIndex]}`} alt="" />
          </div>
          <FontAwesomeIcon icon={faArrowRight} className='arrowBtn' onClick={() => setImgIndex(imgIndex >= hotelImgs.length - 1 ? 0 : imgIndex + 1)} />
          <FontAwesomeIcon icon={faCircleXmark} className='closeBtn' onClick={() => setOpenImg(false)} />
        </div>
      )}
      <div className={openImg && 'blur-background'}>

        <Navbar />
        <Header type={"list"} />
        {loading ? <h1>Loading...</h1> : <>
          <div className="hotel">
            <button className='hotelBtn' onClick={handleClick}>Reserve or Book Now!</button>
            <div className="hotelContainer">
              <div className="hotelHeader">
                <h1 className="hotelHeaderTitle">
                  {data.name}
                </h1>
                <div className="hotelHeaderLocation">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="headerLocationDetail">
                    {data.address}
                  </p>
                </div>
                <div className="headerDistance">
                  <p className="distance">Excellent location - {data.distance} m from center</p>
                </div>
                <div className="headerTaxiDetail">
                  <p>Book a stay over {data.cheapestPrice} tk at this property and get a free airport taxi</p>
                </div>



              </div>

              <div className="hotelImages">
                {hotelImgs.map((img, index) => {
                  // console.log(index);

                  return (<div className="imgCon" key={index} >
                    <img src={`${img}`} alt="" className='hotelImg' onClick={() => handleImage(index)} />
                  </div>)
                })}
              </div>
              {/* this is where img open is */}

              <div className="hotelDetailsCon">
                <div className="hotelDetailLeft">
                  <h1>{data.title}</h1>
                  <p>{data.desc}</p>
                </div>
                <div className="hotelDetailRight">
                  <h1>Perfect for a {dateDiff}-night stay in!</h1>
                  <p>{data.desc}</p>
                  <span className='spanOut'>{dateDiff * data.cheapestPrice * options.room} Tk <span className='spanInner'>({dateDiff} nights)</span></span>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>

            </div>
            <MailList />
            <Footer />
          </div>
        </>}
      </div>
      {modal && <Reserve setModal = {setModal} hotelId = {id}/>}
    </>

  )
}

export default Hotel