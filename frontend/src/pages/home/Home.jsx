import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/NavBar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import FeaturedProperty from '../../components/featuredProperty/FeaturedProperty'
import PropertyList from '../../components/propertyList/PropertyList'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
const Home = () => {
  return (
    <div >
        <Navbar/>
        <Header />
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Browse by property type</h1>
          <FeaturedProperty/>
          <h1 className="homeTitle">Homes guests love</h1>
          <PropertyList/>
          <MailList/>
          <Footer/>
        </div>
    </div>
  )
}

export default Home