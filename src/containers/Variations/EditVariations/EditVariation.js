import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col,Radio, Form, Input, message, Row, Upload} from "antd"
import {Link, useHistory} from "react-router-dom";
import ImgCrop from "antd-img-crop";

const EditVariation = (props) => {
    const id = props.match.params.id
    const [price, setPrice] = useState('');
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    let [removedImages, setRemovedImages] = useState([])
console.log(status)

    let onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    const onRemove = file => {
        setRemovedImages(removedImages => [...removedImages, file.uid])

    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    const formLayout = 'vertical';
    useEffect(() => {
        axios.get('variants/findOne/' + id).then((response) => {
            let product = response.data

            form.setFieldsValue(product)
            setName(product.name)
            setSku(product.sku)
            setPrice(product.price)
            setStock(product.stock)
            setStatus(product.status)
            let images = product.variantImg
            images.map((image) => {
                let path = process.env.REACT_APP_BASE_IMAGE_PATH + image.path
                let img = {
                    uid: image.id,
                    url: path
                }
                setFileList(defaultFileList => [...defaultFileList, img])

            })
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    const history = useHistory()
    const postVariantHandler = async () => {
        const validate = await form.validateFields()

        let product = new FormData();
        product.append('name', name)
        product.append('stock', stock)
        product.append('sku', sku)
        product.append('removedImages', removedImages)
        product.append('price', price)
        product.append('stockStatus', status)
        fileList.forEach(file => {
            product.append('files', file.originFileObj);
        });
        setLoading(true)

        axios.put('variants/' + id, product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response)
            message.success('variant updated successfully.');
            setLoading(false)
            history.push("/products")

        }).catch(error => {
            setLoading(false)
            console.log(error)
            message.error(error)
        })
    }
    const onStockStatus = (e) => {
        setStatus(e.target.value)
    }
    const radio = <Radio.Group onChange={onStockStatus} value={status} defaultValue={status}>
        <Radio value="in_stock">In Stock</Radio>
        <Radio value="not_available">Out Of Stock</Radio>
        <Radio value="stock_back">Stock Back</Radio>
    </Radio.Group>
    return (
        <div className="site-card-wrapper">
            <Row className="row">
                <Col span={8} offset={16}><Link to='/products'>
                    <Button type="danger" size="large" className="button"><span
                        className="span">Cancel</span></Button></Link>
                    <Button type="submit" size="large" className="button" loading={loading}
                            onClick={postVariantHandler}><span
                        className="span">Save</span></Button>
                </Col>
            </Row>
            <Card>
            <Form
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                }}
            >
                <Row gutter={12} className="row">
                    <Col md={16}>
                        <Form.Item name="name"
                                   label="Name"
                                   rules={[{
                                       required: true,
                                       message: 'Please enter Variant Name'
                                   }]}>
                            <Input placeholder="Name" onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                        </Form.Item>
                        <Form.Item name="sku"
                                   label="Sku"
                                   rules={[{
                                       required: true,
                                       message: 'Please enter variant Sku'
                                   }]}>
                            <Input placeholder="Sku" onChange={(e) => {
                                setSku(e.target.value)
                            }}/>
                        </Form.Item>
                        <Form.Item name="price"
                                   label="Price"
                                   rules={[{
                                       required: true,
                                       message: 'Please enter product price'
                                   }]}>
                            <Input placeholder="Price" onChange={(e) => {
                                setPrice(e.target.value)
                            }}/>
                        </Form.Item>
                        <Form.Item name="stock"
                                   label="Stock"
                                   rules={[{
                                       required: true,
                                       message: 'Please enter variant Stock'
                                   }]}>
                            <Input placeholder="Stock" onChange={(e) => {
                                setStock(e.target.value)
                            }}/>
                        </Form.Item>
                        <Form.Item name="stock-status"
                                   label="Stock status"
                                   defaultValue={status}
                                  >
                            {status !=='' && radio}
                        </Form.Item>

                    </Col>
                    <Col md={8}>
                        <Card title="Image">
                        <Form.Item name="image">
                            <ImgCrop rotate>
                                <Upload
                                    name="images"
                                    listType="picture-card"
                                    fileList={fileList}
                                    customRequest={dummyRequest}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    onRemove={onRemove}
                                >
                                    {fileList.length < 5 && '+ Upload'}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Form>
            </Card>
        </div>
    );
};


export default EditVariation;
