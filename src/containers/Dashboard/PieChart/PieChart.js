import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import "./PieChart.css";
import axios from "axios";
const DemoPie = (props) => {
    const [totalOrders , setTotalOrders]= useState("");
    const [totalProducts , setTotalProducts]= useState("");
    const [totalCustomers , setTotalCustomers]= useState("");
    const [totalBrands , setTotalBrands]= useState("");
    const [totalMenus , setTotalMenus]= useState("");
    const [totalCollections , setTotalCollections]= useState("");
    useEffect(()=>{
        axios.get("totalcontrollers/allTotal")
            .then(response=>{
                setTotalOrders(response.data.allOrders);
                setTotalProducts(response.data.allProducts);
                setTotalCustomers(response.data.allCustomers);
                setTotalBrands(response.data.allBrands);
                setTotalMenus(response.data.allMenus);
                setTotalCollections(response.data.allCollections);
            })
            .catch(err=>{
                console.log(err)
            })
    })
    var pieData = [
        {
            type: "Orders",
            value: totalOrders,
        },
        {
            type: 'Products',
           value: totalProducts,
        },
        {
            type: 'Customers',
            value: totalCustomers,
        },
        {
            type: 'Brands',
            value: totalBrands,
        },
        {
            type: 'Menus',
            value: totalMenus,
        },
        {
            type: "Collections",
            value:totalCollections,
        },
    ];
    var config = {
        appendPadding: 10,
        data: pieData,
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
            <h2>Total Orders</h2>
            <Pie {...config} />
            {/*<div>{console.log(props)}</div>*/}
        </div>
        )
};
export default DemoPie;