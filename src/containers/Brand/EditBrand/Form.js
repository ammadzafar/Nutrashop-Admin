import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {Form, Input, Row, Col, message} from 'antd';
import Uploader from "../../../components/ImageUploader/Uploader";
import axios from "axios";
const {TextArea} = Input
const DynamicRule = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const [name, setName] = useState(false);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(false);
    const [isPopular,setIsPopular]=useState(props.brand.isPopular)
    useEffect(() => {
        form.setFieldsValue({
            name: props.brand.name,
            description: props.brand.description,
        })
        setName(props.brand.name)
        setDescription(props.brand.description)
        setIsPopular(props.brand.isPopular)
    }, [props.brand]);
    useImperativeHandle(
        ref,
        () => ({
            async showAlert() {
                try {
                    const values = await form.validateFields();
                    let brand = new FormData()
                    let id = props.brand.id
                    brand.append('file', image)
                    brand.append('isPopular', isPopular)
                    brand.append('name', name)
                    brand.append('description', description)
                    props.setloader()
                    axios.put('brands/' + id, brand, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response => {
                        props.getBrands()
                        props.setloader()
                        props.cancelDrawer()
                        message.success('Brand updated successfully.');
                    }).catch(error => {
                        let errors = error.response.data;
                        if (errors.errors[0].param == 'name') {
                            message.error(errors.errors[0].msg);
                        }
                    })

                } catch (errorInfo) {
                    if (errorInfo.errorFields[0]) {
                        message.error('Failed:', errorInfo.errorFields[0].errors[0]);

                    }
                }

            }
        }),
    )
    const saveImage = (image) => {
        setImage(image)
    }
    const onChange =  (value) => {
        setIsPopular(value)
    };

    return (
        <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter brand name'}]}
                    >
                        <Input onChange={e => setName(e.target.value)} value={props.brand.name}
                               placeholder="Please enter user name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{message: 'Please enter brand description'}]}
                    >
                        <TextArea onChange={e => setDescription(e.target.value)} value={props.brand.description}
                                  name="description" rows={4}/>
                    </Form.Item>
                </Col>
            </Row>
            <Uploader saveImage={saveImage} image={props.brand.image}/>
        </Form>
    );
});

export default DynamicRule
