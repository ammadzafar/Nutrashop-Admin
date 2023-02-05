import React, {Component,useState} from 'react'
import {Image, Layout, Menu} from "antd";
import {UserOutlined} from '@ant-design/icons';
import Logo from "../../../assets/images/logos/abc.png";
import './Header.css';
import { useSelector, useDispatch} from "react-redux";
import { useHistory} from 'react-router-dom'

import * as authActions from '../../../store/actions/AuthActions/auth'
const {Header} = Layout;
const {SubMenu} = Menu;

const Navbar =(props)=> {
    const {auth} = useSelector(({auth}) => auth);

    const dispatch=useDispatch()
    const history=useHistory()
    const [current,setCurrent]=useState('mail')
    const handleClick = (e) => {
        setCurrent( e.key);
    };
    let userName = (auth.user.firstName+" "+auth.user.lastName)
    const logout = (e) => {
        dispatch(authActions.logout())
        history.push('/')
    };


        return (
            <Header className="site-layout-background" style={{padding: 0, height:'auto',backgroundColor:'#adadad87'}}>
            <Image
                width={210}
                style={{marginTop:"-6"}}
                src={Logo}
            />
            <Menu className='Menu' onClick={handleClick} style={{marginTop:"40px",backgroundColor:'#adadad87',border:"none"}} selectedKeys={[current]} mode='horizontal'>

                <SubMenu key="SubMenu" icon={<UserOutlined/>} title={userName}>
                    <Menu.Item key="setting:1">Profile</Menu.Item>
                    <Menu.Item key="setting:2" onClick={logout} >Logout</Menu.Item>

                </SubMenu>

            </Menu>
        </Header>
        )


}

export default Navbar
