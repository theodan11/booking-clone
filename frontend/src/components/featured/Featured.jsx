import React from 'react'
import './featured.css'
import useFetch from '../../hooks/useFetch'
const Featured = () => {
    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByCity?cities=Dhaka,Chittagong,Sylhet")
    // console.log(data)
    console.log(`featured:${data}`)
    return (
        <div className='featured'>
            {loading ?( <h1>Loading</h1>) : (<><div className="featuredItems">
                <img className='featuredImg' src="../../../img/112344221_p0.jpg" alt="" />
                <div className="featureTitle">
                    <h1 >
                        Dhaka
                    </h1>
                    <h2 >
                        {data[0]} Properties
                    </h2>
                </div>
            </div>
                <div className="featuredItems">
                    <img className='featuredImg' src="../../../img/112344221_p1.jpg" alt="" />
                    <div className="featureTitle">
                        <h1 >
                            Chittagong
                        </h1>
                        <h2 >
                            {data[1]} Properties
                        </h2>
                    </div>
                </div>
                <div className="featuredItems">
                    <img className='featuredImg' src="../../../img/112344221_p3.jpg" alt="" />
                    <div className="featureTitle">
                        <h1 >
                            Sylhet
                        </h1>
                        <h2 >
                            {data[2]} Properties
                        </h2>
                    </div>
                </div></>)}

        </div>
    )
}

export default Featured






