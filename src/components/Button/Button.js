import React from 'react';
import {Button} from "antd";
import './Button.css'
const button = (props) => (
    <Button className='Button' type={props.type} icon={props.icon} >
        {props.title}
    </Button>
)
export default button;
