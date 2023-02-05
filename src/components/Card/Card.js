import React from 'react';
import {Card, Col, Row} from "antd";
import './Card.css'
const card=(props)=>(
    <div className="site-card-border-less-wrapper">
        <Row gutter={16}>
            <Col  className='cardRow' span={8} offset={8}>
                <Card className="F-width" title={props.title} bordered={false}>
                    {props.children}
                </Card>
                
            </Col>
        </Row>
    </div>
)
export default card;
