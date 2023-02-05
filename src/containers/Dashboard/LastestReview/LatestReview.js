import React,{useEffect,useState} from "react";
import axios from "axios";
import "./LatestReview.css"
const LatestReview=()=>{
    const [latestReview , setLatestReview]=useState("")
    useEffect(()=>{
        axios.get("totalcontrollers/latestReviews")
            .then((response)=>{
                console.log(response)
                setLatestReview(response.data.map(data=>(
                    <div className="review-content">
                        <table>
                            <thead>
                            <tr>
                                <td>{data.customerId}</td>
                                <td className="review-data1">{data.description}</td>
                                <td >{data.reviewTitle}</td>
                                <td>{data.rating}</td>
                            </tr>
                            </thead>
                        </table>
                    </div>
                )))
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])
    return(
        <div className="latestProduct-main review-sec-main">
            <h2>Latest Reviews</h2>
            <div className="review-main">
                <table>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Review-Title</th>
                        <th>Rating</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            {latestReview}
        </div>
    )
}
export default LatestReview;