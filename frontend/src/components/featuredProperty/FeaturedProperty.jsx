import React from 'react'
import './featuredProperty.css'
import useFetch from '../../hooks/useFetch'
const FeaturedProperty = () => {
    const {data, loading, error} = useFetch("http://localhost:8800/api/hotels/countByType")
    console.log(`property:${data}`)
    return (
        <div className='featuredProperty'>
            {loading? (<h1>Loading...</h1>): (<>
            <div className="featuredPropertyItem">
                <img className="featuredImg" src="../../../img/112344221_p1.jpg" alt="" />
                <h1>{data[0]?.type}</h1>
                <h2>{data[0]?.count}</h2>
            </div>
            <div className="featuredPropertyItem">
                <img className="featuredImg" src="../../../img/112344221_p2.jpg" alt="" />
                <h1>{data[1]?.type}</h1>
                <h2>{data[1]?.count}</h2>
            </div>
            <div className="featuredPropertyItem">
                <img className="featuredImg" src="../../../img/112344221_p3.jpg" alt="" />
                <h1>{data[2]?.type}</h1>
                <h2>{data[2]?.count}</h2>
            </div>
            <div className="featuredPropertyItem">
                <img className="featuredImg" src="../../../img/112344221_p4.jpg" alt="" />
                <h1>{data[3]?.type}</h1>
                <h2>{data[3]?.count}</h2>
            </div>
            <div className="featuredPropertyItem">
                <img className="featuredImg" src="../../../img/112344221_p0.jpg" alt="" />
                <h1>{data[4]?.type}</h1>
                <h2>{data[4]?.count}</h2>
            </div>
            </>)}

        </div>
    )
}

export default FeaturedProperty