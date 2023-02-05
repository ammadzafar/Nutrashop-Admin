
import React ,{Component} from "react"
import {Drawer, Form, Button, Col, Row, Input, message} from 'antd';
import * as actionCreators from "../../../store/actions/customerActions"
import {connect} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";
import MediaQuery from 'react-responsive'

const {TextArea} = Input
class NewCustomer extends Component{

    constructor(props) {
        super(props);
        this.state={
            visible:this.props.visible,
            loading:false,
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
        }
        this.handleInputChange= this.handleInputChange.bind(this);
    }
    handleInputChange (event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
        }
    }
    postCustomerHandler=()=>{
        let customer = new FormData();
        customer.append('firstName',this.state.firstName)
        customer.append('email',this.state.email)
        customer.append("phone",this.state.phone)
        customer.append("lastName", this.state.lastName)
        this.setState({
            loading:true
        })
        console.log(customer)
        axios.post('customer', customer, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            const result = {
                key:response.data.id,
                firstName:response.data.firstName,
                lastName: response.data.lastName,
                email:response.data.email,
                phone:response.data.phone,
            }
            this.props.dispatch(actionCreators.saveCustomer(result))
            message.success("Customer has been created")
            this.setState({
                loading:false
            })
            this.props.cancel()
        }).catch(error => {

        })
    }
    render() {

        return (
            <>
            <MediaQuery minWidth={750}>
                <Drawer title="Create a new Customer" width={720}  visible={this.state.visible}
                        bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div style={{textAlign: 'right',}}>
                                <Button onClick={this.props.cancel} style={{marginRight: 8}}>
                                    Cancel
                                </Button>
                            <Button onClick={this.postCustomerHandler}  type="primary">
                                Submit
                            </Button>
                        </div>
                    }>
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="firstName" label="FirstName"
                                    rules={[{required: true, message: 'Please enter Customers First name'}]}>
                                    <Input value={this.state.firstName}
                                           name="firstName"
                                           onChange={this.handleInputChange}/>
                                </Form.Item>

                                <Form.Item name="lastName" label="LastName"
                                           rules={[{required: true, message: 'Please enter Customers lastName'}]}>
                                    <Input value={this.state.lastName}
                                           name="phone"
                                           onChange={this.handleInputChange}/>
                                </Form.Item>
                                <Form.Item name="email" label="Email"
                                           rules={[{required: true, message: 'Please enter Customers email'}]}>
                                    <Input value={this.state.email}
                                           name="email"
                                           onChange={this.handleInputChange}/>
                                </Form.Item>
                                <Form.Item name="phone" label="Phone"
                                           rules={[{required: true, message: 'Please enter Customers Phone'}]}>
                                    <Input value={this.state.phone}
                                           name="phone"
                                           onChange={this.handleInputChange}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
                </MediaQuery>

            <MediaQuery maxWidth={750}>
                <Drawer title="Create a new Customer" width={350}  visible={this.state.visible}
                        bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div style={{textAlign: 'right',}}>
                                <Button onClick={this.props.cancel} style={{marginRight: 8}}>
                                    Cancel
                                </Button>
                            <Button onClick={this.postCustomerHandler}  type="primary">
                                Submit
                            </Button>
                        </div>
                    }>
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="firstName" label="FirstName"
                                    rules={[{required: true, message: 'Please enter Customers First name'}]}>
                                    <Input value={this.state.firstName}
                                           name="firstName"
                                           onChange={this.handleInputChange}/>
                                </Form.Item>

                                <Form.Item name="lastName" label="LastName"
                                           rules={[{required: true, message: 'Please enter Customers lastName'}]}>
                                    <Input value={this.state.lastName}
                                           name="phone"
                                           onChange={this.handleInputChange}/>
                                </Form.Item>
                                <Form.Item name="email" label="Email"
                                           rules={[{required: true, message: 'Please enter Customers email'}]}>
                                    <Input value={this.state.email}
                                           name="email"
                                           onChange={this.handleInputChange}/>
                                </Form.Item>
                                <Form.Item name="phone" label="Phone"
                                           rules={[{required: true, message: 'Please enter Customers Phone'}]}>
                                    <Input value={this.state.phone}
                                           name="phone"
                                           onChange={this.handleInputChange}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
                </MediaQuery>


            </>
        );
    }
}

export default connect()(NewCustomer);