import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Col, Form, Input, message, Row} from 'antd';
import axios from "axios";

const CustomerEditForm = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("")
    useEffect(() => {
        console.log(props.customer)
        form.setFieldsValue({
            firstName: props.customer.firstName,
            email: props.customer.email,
            phone: props.customer.phone,
            lastName: props.customer.lastName,
        })
        setFirstName(props.customer.firstName)
        setLastName(props.customer.lastName)
        setEmail(props.customer.email)
        setPhone(props.customer.phone)
    }, [props.customer]);
    useImperativeHandle(
        ref,
        () => ({
            async showAlert() {
                try {
                    const values = await form.validateFields();
                    let customer = new FormData()
                    let id = props.customerId
                    customer.append('lastName', lastName)
                    customer.append('firstName', firstName)
                    customer.append('phone', phone)
                    customer.append("email", email)
                    props.setloader()
                    axios.put('customer/' + id, customer, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response => {
                        props.getCustomers()
                        props.setloader()
                        props.cancelDrawer()
                        message.success('Customer updated successfully.');
                    }).catch(error => {
                        console.log(error)
                        // let errors = error.response.data;
                        // if (errors.errors[0].param == 'firstName') {
                        //     message.error(errors.errors[0].msg);
                        // }
                    })

                } catch (errorInfo) {
                    console.log(errorInfo)
                    // if (errorInfo.errorFields[0]) {
                    //     message.error('Failed:', errorInfo.errorFields[0].errors[0]);
                    //
                    // }
                }

            }
        }),
    )
    return (
        <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{required: true, message: 'Please enter Customer First Name'}]}
                    >
                        <Input onChange={e => setFirstName(e.target.value)} value={firstName}
                               placeholder="Please enter user first name"/>
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{required: true, message: 'Please enter Customer Last Name'}]}
                    >
                        <Input onChange={e => setLastName(e.target.value)} value={firstName}
                               placeholder="Please enter user name last name"/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter Customer Email'}]}
                    >
                        <Input onChange={e => setEmail(e.target.value)} value={firstName}
                               placeholder="Please enter user Email"/>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Customer Phone NO"
                        rules={[{required: true, message: 'Please enter Customer Last Name'}]}
                    >
                        <Input onChange={e => setPhone(e.target.value)} value={firstName}
                               placeholder="Please enter user name last name"/>
                    </Form.Item>

                </Col>
            </Row>
        </Form>
    );

});
export default CustomerEditForm
