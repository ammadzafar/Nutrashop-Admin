import React, {useEffect, useState} from "react";
import * as url from "url";
import axios from "axios";
import "./LatestProduct.css"
const LatestProduct=()=>{
    const [allProducts , setAllProducts]=useState("")
    useEffect(()=>{
        axios.get("totalcontrollers/latestProducts")
            .then((response)=>{
                console.log(response)
                setAllProducts(response.data.map(data=>(
                    <div className="dadada-content">
                        <table>
                            <tr>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td>{data.quantity}</td>
                            <td>{data.regularPrice}</td>
                            </tr>
                        </table>
                    </div>
                )))
        })
            .catch((error)=>{
                console.log(error)
            })
    },[])
    return(
        <>
            <div className="latestProduct-main">
                <h2>Latest Products</h2>
                <div className="dadada">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th>REG.PRICE</th>
                        </tr>
                    </table>
                </div>
                {allProducts}
            </div>
        </>
    )
}
export default LatestProduct;