import React, {useEffect, useState} from "react";
import * as url from "url";
import axios from "axios";
import "../LatestProduct/LatestProduct.css"
const LatestCustomer=()=>{
    const [latestCustomers , setLatestCustomers]=useState("")
    useEffect(()=>{
        axios.get("totalcontrollers/latestCustomers")
            .then((response)=>{
                console.log(response)
                setLatestCustomers(response.data.map(data=>(
                    <div className="dadada-content customer-content">
                        <table>
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.phone}</td>
                                <td>{data.email}</td>
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
                <h2>Latest Customers
                </h2>
                <div className="dadada">
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>FIRSTNAME</th>
                            <th>LASTNAME</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                        </tr>
                    </table>
                </div>
                {latestCustomers}
            </div>
        </>
    )
}
export default LatestCustomer;