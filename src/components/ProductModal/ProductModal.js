import React,{useState} from 'react'
import {Modal, message, Col, Row, Form,Input,Button, Badge} from "antd";

import {
    LockOutlined
} from "@ant-design/icons";
import axios from "axios";
function ProductModal(props) {

    const [loading, setLoading] = useState(false)

    const {form} = Form.useForm()
    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true)
        axios.post(`/products/update/stock/${props.properties.key}`,values).then(success=>{
            console.log(success)
            message.success(success.data.message)
            setLoading(false)
            props.onOk()
        }).catch(err=>{
            console.log(err)
            message.error("Error!")
            setLoading(false)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // const onReset = () => {
    //     form.resetFields();
    // };
    return (
        <>
            <Modal
                title={`Add Stock of ${props.properties.name}`}
                visible={props.visible}
                onCancel={props.cancel}
                onOk={props.onOk}
                properties={props.properties}
                footer=""
            >
                <Form
                    form={form}
                    name="control-hooks"
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >
                    <Form.Item
                        label="Stock Amount"
                        name="stock"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Stock Amount!',
                            },
                        ]}
                    >
                        <Input type="number"/>
                    </Form.Item>
                    <Form.Item className="pb-3 pt-3" style={{textAlign:"right"}}>
                        <Button  htmlType="submit" loading={loading} type="primary"><LockOutlined/>Add Stock</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default ProductModal;
