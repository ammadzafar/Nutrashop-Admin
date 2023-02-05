import React, { useState, useEffect } from 'react';
import DemoPie from '../PieChart/PieChart'
import "../PieChart/PieChart.css"
import axios from "axios";
import {Pie} from "@ant-design/charts";
const OrderLeft = (pieTotalOrder,piePendingOrder) => {
    const [allCanclledOrders , setAllCanclledOrder]=useState('');
    const [allDeliveredOrders , setAllDeliveredOrders]=useState('');
    const [allInTransitOrders , setAllInTransitOrders]=useState('');
    const [allPendingOrders , setAllPendingOrders]=useState('');
    const [allRefundOrders , setAllRefundOrders]=useState('');
    const [allVerifiedOrders , setAllVerifiedOrders]=useState('');
    // const [totalCustomers , setTotalCustomers]= useState("")
    // const [totalBrands , setTotalBrands]= useState("")
    // const [totalMenus , setTotalMenus]= useState("")
    // const [totalCollections , setTotalCollections]= useState("")
    // useEffect(()=>{
    //     // axios.get("totalcontrollers/allTotal")
    //     //     .then(response=>{
    //     //         console.log(response)
    //     //         setTotal(response.data)
    //     //        // totalItems=(response.data.allOrders);
    //     //        // totalItems="setTotalProducts(response.data.allProducts)";
    //     //        // totalItems="setTotalCustomers(response.data.allCustomers)";
    //     //        // totalItems="setTotalBrands(response.data.allBrands)";
    //     //        // totalItems="setTotalMenus(response.data.allMenus)";
    //     //        // totalItems="setTotalCollections(response.data.allCollections)";
    //     //     })
    //     //     .catch(err=>{
    //     //         console.log(err)
    //     //     })
    //     axios.get("totalcontrollers/pendingOrders")
    //         .then(response=>{
    //             setPending(response.data);
    //             console.log(response)
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //         })
    // },[])
    useEffect(()=>{
        axios.get("totalcontrollers/orderDetails")
            .then(response=>{
                setAllCanclledOrder(response.data.allCanclledOrders);
                setAllDeliveredOrders(response.data.allDeliveredOrders);
                setAllInTransitOrders(response.data.allInTransitOrders);
                setAllPendingOrders(response.data.allPendingOrders);
                setAllRefundOrders(response.data.allRefundOrders);
                setAllVerifiedOrders(response.data.allVerifiedOrders);
            })
            .catch(err=>{
                console.log(err)
            })
    })
    var pieOrder = [
        {
            type: "Pending",
            value:allPendingOrders,
        },
        {
            type: 'Delivered',
            value: allDeliveredOrders,
        },
        {
            type: 'InTransit',
            value: allInTransitOrders,
        },
        {
            type: 'Cancelled',
            value: allCanclledOrders,
        },
        {
            type: 'Refund',
            value: allRefundOrders,
        },
        {
            type: "Verified",
            value:allVerifiedOrders,
        },
    ];
    var configOrder = {
        appendPadding: 10,
        data: pieOrder,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
                var percent = _ref.percent;
                return ''.concat((percent * 100).toFixed(0), '%');
            },
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [{ type: 'element-active' }],
    };
    return(
        <div className="pieChart-sec">
            <h2>Orders</h2>
            <Pie {...configOrder} />
        </div>
    )
};
export default OrderLeft;