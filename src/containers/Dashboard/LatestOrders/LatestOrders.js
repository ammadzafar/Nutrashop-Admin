import React, {Component, useEffect,useState} from 'react';
import axios from "axios";

const LatestOrder=()=> {
    const [leftOrder,setLeftOrder]=useState("");
    useEffect(()=>{
        axios.get("orders/pending")
            .then((response)=>{
                console.log(response);
                setLeftOrder(response.data.map(data=>(
                    <div className="review-content">
                        <table>
                            <tr>
                                <td>{data.Status.id}</td>
                                <td className="review-data1">{data.Status.name}</td>
                                <td>data</td>
                                <td>data</td>
                                {/*<td>{data.OrderProducts.Product.name}</td>*/}
                            </tr>
                        </table>
                    </div>
                )))
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])
        return (
            <div className="latestProduct-main review-sec-main">
                <h2>Orders</h2>
                <div className="review-main">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>STATUS</th>
                            <th>PRODUCT</th>
                            <th>Rating</th>
                        </tr>
                    </table>
                </div>
                {leftOrder}
            </div>
        );
}
export default LatestOrder;