import React, { Component } from 'react'
import { Modal, Card, Col, Row, Descriptions, Badge } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import HTMLReactParser from "html-react-parser";
import "./orderModal.css";
import { Link } from 'react-router-dom';
const { Meta } = Card;
// import invoiceData from '../../data/invoice_data';

class OrderModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.isVisible,
            orderId: this.props.orderId,
            order: this.props.order,
        }
    }


    render() {
        console.log(this.props)
        let totalPrice = this.props.order.amount
        let items = this.props.order.OrderVariants
        let order = this.props.order
        let totalQuantity = 0
        this.props.order.OrderVariants.map(price => {
            totalQuantity += price.quantity
        })
        return (
            <>

                <Modal
                    title="Order Detail"
                    visible={this.props.isVisible}
                    orderID={this.state.orderId}
                    onCancel={this.props.onCancle}
                    style={{ height: '50%', top: '0' }}
                    width={1000}
                    onOk={this.props.onCancle}
                >
                    
                    

                    <Descriptions title={"Order No:" + order.order_no} bordered>
                    
                        <Descriptions.Item span={3} style={{ textAlign: "center" }} label={"Order Placed at"}>
                            {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                        </Descriptions.Item>
                        <br />
                        <br />
                        <br />
                        <Descriptions.Item span={3} label="Customer Details">
                            <Row>
                                <Col md={10}>
                                    <h3>Name:</h3>
                                </Col>
                                <Col md={10}>
                                    {order.customer.firstName + " " + order.customer.lastName}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <h3>Email:</h3>
                                </Col>
                                <Col md={10}>
                                    {order.customer.email}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <h3>Phone:</h3>
                                </Col>
                                <Col md={10}>
                                    {order.customer.phone}
                                </Col>
                            </Row>
                        </Descriptions.Item>
                        <br />
                        <br />
                        <br />
                        <Descriptions.Item span={3} label="Address Details">
                            <Row>
                                <Col md={10}>
                                    <h3>Address:</h3>
                                </Col>
                                <Col md={10}>
                                    {order.address}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <h3>City:</h3>
                                </Col>
                                <Col md={10}>
                                    {order.city}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <h3>State/Province:</h3>
                                </Col>
                                <Col md={10}>
                                    {order.province}
                                </Col>
                            </Row>
                        </Descriptions.Item>
                        <br />
                        <br />
                        <br />
                        <Descriptions.Item label="Status">
                            <Badge status="processing" layout="vertical" text={order.Status.name.toUpperCase()} />
                        </Descriptions.Item>
                        <Descriptions.Item />
                        <br />
                        <br />
                        <br />
                        <Descriptions.Item span={2} />
                        <Descriptions.Item label="Total Price" span={3}>
                            {totalPrice}
                        </Descriptions.Item>
                        <br />
                        <br />
                        <br />
                        <Descriptions.Item label="Quantity" span={3}>
                            {totalQuantity}
                        </Descriptions.Item>
                    </Descriptions>
                    
                    <Card span={3} title="Product Description">
                        <div>
                        <Row gutter={24}>
                                <>
                                    <Col span={24}>
                                        <section>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="inventory_content">
                                                            <div className="cart-content table-responsive">
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Product</th>
                                                                            <th>Quantity</th>
                                                                            <th>Unit Price</th>
                                                                            <th>Amount</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            items.map((product) =>
                                                                                <React.Fragment key={product.id.toString()}>
                                                                                    <tr>

                                                                                        <td>
                                                                                            <div
                                                                                                className="single_cart_item flex">
                                                                                                <div
                                                                                                    className="cart_item_image"
                                                                                                    style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_IMAGE_PATH + product.Variant.Product.images[0].path})` }}></div>
                                                                                                <div
                                                                                                    className="cart_item_text">
                                                                                                    <span
                                                                                                        className="car-product-name">{HTMLReactParser(product.Variant.Product.name)}
                                                                                                    </span>
                                                                                                    <div
                                                                                                        className="cart_actions">

                                                                                                        <h6 className="cross">{product.quantity} x {product.Variant.price}
                                                                                                        </h6>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <br />

                                                                                            </div>

                                                                                        </td>
                                                                                        <td>
                                                                                            <div
                                                                                                className="quantity-selector cart">
                                                                                                <input type='text'
                                                                                                    name='quantity'
                                                                                                    value={product.quantity}
                                                                                                    className='qty input-number' />
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            {product.Variant.price}
                                                                                        </td>
                                                                                        <td>
                                                                                            {product.Variant.price * product.quantity}
                                                                                        </td>
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            )
                                                                        }

                                                                    </tbody>
                                                                    <tfoot>
                                                                        <tr>
                                                                            <td colSpan="3">
                                                                                <b style={{ float: "right" }}>Total</b></td>
                                                                            <td><b>
                                                                                {totalPrice}
                                                                            </b></td>
                                                                        </tr>
                                                                    </tfoot>
                                                                   
                                                                </table>
                                                                
                                                            </div>
                                                         
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            
                                        </section>
                                        
                                    </Col>
                                    
                                </>
                                
                            </Row>
                            
                        </div>
                     
                    </Card>
                    <div className='Modal-Invoice'>
                         <Link to={"/product/finalinvoice"}>
                        <button>Print Invoice</button>
                        </Link>
                    </div>
                    
                </Modal>
               
            </>
        );
    }
}

export default connect()(OrderModal);
