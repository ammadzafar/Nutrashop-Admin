import React, {useEffect, useState} from "react";
import "../DashBoard-cards/DashBoard-card.css";
import axios from "axios";
import {Button} from "antd";
import {Link} from "react-router-dom";
const BoardCard=(props)=>{
    const [dasboardProps , setDashboardProps]= useState(0)
    useEffect(()=>{
        axios.get(`/totalControllers/${props.cardcheck}`)
            .then(response=>{
            setDashboardProps(response.data)
        })
            .catch(err=>{
            console.log(err)
        })
    })  
    return(
        <div className="board-Card-main" style={{backgroundColor:props.cardColor}}>
        <Link to={props.checkLink}>
                <div className="board-Card-content">
            <div className="board-Card-Label">
            <p>{props.checkLabel}</p>
            </div>
            <div className="board-Card">
                <p>
                    {dasboardProps}
                </p>
            </div>
                </div>
                <div className="board-card-icon" style={{color:props.checkIconcolor}}>
                    {props.checkIcon}
                </div>
        </Link>
        </div>
    )
}
export default BoardCard;