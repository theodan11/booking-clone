import React from 'react'
import './propertyList.css'
import useFetch from '../../hooks/useFetch'

const PropertyList = () => {
    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels?featured=true&limit=4")
    
    return (
        <div className='propertyList'>
            {loading ? <h1>Loading...</h1> : (
                data.map((property) => {
                    return <div className="propertyListItem" key={property._id}>
                    <img className="propertyListImg" src="../../../img/112344221_p0.jpg" alt="" />
                    <h1>{property.name}</h1>
                    <span className='city'>{property.city}</span>
                    <span className='price'>Starting from {property.cheapestPrice} tk</span>
                    <div className="propertyRating">
                        {property.rating &&<>
                        
                            <div className="propertyRate">
                                {property.rating} 
                            </div><span>Excellent</span></>}

                        
                    </div>
                </div>
                        
                    

                })
            )}
        </div>

    )
}

export default PropertyList