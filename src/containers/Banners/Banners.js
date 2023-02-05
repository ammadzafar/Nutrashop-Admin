import React, {useEffect, useRef, useState} from "react";
import logo from '../../assets/images/logos/logo.png';
import {Button, message, Switch} from "antd";
import "./Banners.css"
import axios from "axios";
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {storeBanners} from "../../store/actions/bannerActions";
import {DeleteOutlined} from "@ant-design/icons";
import * as actionCreators from "../../store/actions/bannerActions";
const NewBanners = () => {
    const dispatch = useDispatch()
    const {banners} = useSelector(({banners}) => banners);
        const ref = useRef()
        useEffect(()=>{
            ref.current = banners
        })
    const [prevBanner ,setPrevBanners] = banners
    const storeBannersAfterDelete = ()=>{
        dispatch(storeBanners())
    }
    useEffect(()=>{
        // if(prevBanner !== banners){
            dispatch(storeBanners())
        // }
        // return()=>{
        //     ref.current=banners
        // }
    },[])
    const onChange = (value, featuredObject) => {
        let addingBid = new FormData();
        addingBid.append("isFeatured", value);
        console.log(featuredObject)
        axios
            .put("banners/addBid/" + featuredObject.id, addingBid)
            .then((response) => {
                message.success("Banner Feature Is Changed");
            })
            .catch((error) => {
                message.error("Error");
            });
    };
    const onDelete = (id) => {
        console.log(id)
        axios
            .delete("banners/delete/" + id)
            .then((response) => {
                dispatch(actionCreators.deleteBanner(id))
                message.success("Banner deleted Successfully");
                storeBannersAfterDelete()
            })
            .catch((error) => {
                message.error("Error");
            });
    };
    return (<>
            <div className="banner-button">
                <Link to="/newBanner"><Button type="primary">Create Banner1</Button></Link>
            </div>
        {banners.map(banner=>(
            <React.Fragment key={banner.id.toString()}>
                <div className="Banner-sec">
                    <div className="newBanner-main">
                        <div className="newBanner-content">
                            <div className="newBanner-image">
                                <img src={process.env.REACT_APP_BASE_IMAGE_PATH + banner.image} alt="desktop banner"/>
                            </div>
                            <p>Desktop Image</p>
                        </div>
                        <div className="newBanner-content newBanner-content-para">
                           <div className='newBanner-para'>
                               <p>{banner.placeholder}</p>
                           </div>
                            <div className="newBanner-Btn">
                                <Switch
                                    defaultChecked={banner.isFeatured ?? true}
                                    checkedChildren="Featured"
                                    unCheckedChildren="Not Featured"
                                    onChange={(e)=>onChange(e, banner)}
                                />
                            </div>
                            <div className='btn-del'>
                                <Button size="small" type="primary"
                                onClick={()=>onDelete(banner.id)}>
                                    <DeleteOutlined />
                                    Delete
                                </Button>
                            </div>
                        </div>
                        <div className="newBanner-content">
                            <div className="newBanner-image-mobile">
                                <img src={process.env.REACT_APP_BASE_IMAGE_PATH + banner.mobileImage} alt="mobile banner"/>
                            </div>
                            <p>Mobile Image</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>))}
        </>
    )
}
export default NewBanners;