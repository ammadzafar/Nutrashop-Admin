import {React, useEffect, useState} from 'react';
import {Button, Card, Col, Collapse, Form, Input, message, Radio, Row, Select, Space, Switch, Tabs, Upload} from "antd"
import {connect} from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    BoxPlotFilled,
    CalendarFilled,
    CheckCircleFilled,
    CheckOutlined,
    CloseOutlined,
    SettingFilled
} from "@ant-design/icons";
import './NewProduct.css'
import ImgCrop from 'antd-img-crop';
import axios from "axios";
import {Link, useHistory} from 'react-router-dom'
import {storeBrands} from "../../../store/actions/brandActions";
import {storeCollections} from "../../../store/actions/collectionActions";
import MediaQuery from 'react-responsive'

const {TextArea} = Input
const {TabPane} = Tabs;
const {Option} = Select;


const CreateProduct = (props) => {
    /**
     * State Variables
     */
    const [name, setName] = useState('');
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [sku, setSku] = useState('');
    const [collection, setCollection] = useState([]);
    const [brand, setBrand] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [collectionOptions, setCollectionOptions] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);
    const [stock, setStock] = useState("in_stock");
    const [visibility, setVisibility] = useState(1);
    const [isPopular, setIsPopular] = useState(false);
    const [loading, setLoading] = useState(false)
    const collectionsArray = []
    const brandsArray = []
    const [form] = Form.useForm();
    const formLayout = 'vertical';
    const [productType, setProductType] = useState(true);
    const [fileList, setFileList] = useState([]);

    const history = useHistory()
    useEffect(() => {
        for (let i = 0; i < props.collections.length; i++) {
            let value = props.collections[i].key
            collectionsArray.push({
                label: props.collections[i].name,
                value,
            });
            setCollectionOptions(collectionOptions => [...collectionsArray]);
        }
    }, [props.collections]);
    useEffect(() => {
        props.dispatch(storeBrands())
    }, [])
    useEffect(() => {
        props.dispatch(storeCollections())
    }, [])
    useEffect(() => {
        for (let i = 0; i < props.brands.length; i++) {
            let value = props.brands[i].key
            brandsArray.push({
                label: props.brands[i].name,
                value,
            });
            setBrandOptions(options => [...brandsArray]);
        }
    }, [props.brands]);

    // function for the  isPopular
    const toggleChange = (value) => {
        setIsPopular(value)
    }
    /**
     * Image on Change Function
     * @param newFileList
     */
    let onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    /**
     * set Stock Value
     * @param e
     */

    const onStock = (e) => {
        setStock(e.target.value)
    }


    function onProductChange(value) {
        if (value == 1) {
            setProductType(true);

        } else {
            setProductType(false);

        }
    }

    /**
     * set Visibility
     * @param e
     */
    const onVisibility = (value) => {
        setVisibility(value)
    }
    /**
     * Image Preview Function
     * @param file
     * @returns {Promise<void>}
     */
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
    /**
     * Dummy request for uploading image
     * @param file
     * @param onSuccess
     */
    const dummyRequest = ({file, onSuccess}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    /**
     *
     * @type {{mode: string, onChange: onChange, maxTagCount: string, options: *[], style: {width: string}, collection: *[], placeholder: string}}
     */
    const selectProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        collection,
        options: collectionOptions,
        onChange: (newValue) => {
            setCollection(newValue);
        },
        placeholder: 'Select Collection...',
        maxTagCount: 'responsive',
    };

    /**
     *
     * @type {{onChange: onChange, maxTagCount: string, options: *[], style: {width: string}, placeholder: string, brand: unknown}}
     */
    const selectBrandProps = {
        style: {
            width: '100%',
        },
        brand,
        options: brandOptions,

        onChange: (newValue) => {
            setBrand(newValue);
        },
        placeholder: 'Select Brand...',
        maxTagCount: 'responsive',
    };

    const postProductHandler = async () => {
        const validate = await form.validateFields()
        if (sku === "") {
            return message.error('Cannot create product without SKU')
        }else if(quantity === ""){
            return message.error('Cannot create product without quantity')
        }else if(stock === ""){
            return message.error('Cannot create product without stock')
        }
        let product = new FormData();
        product.append('name', name)
        product.append("slug", slug)
        fileList.forEach(file => {
            product.append('files', file.originFileObj);
        });
        product.append('collections', collection)
        product.append('brand', brand)
        product.append('description', description)
        product.append('quantity', quantity)
        product.append('sku', sku)
        product.append('price', price)
        product.append('stockStatus', stock)
        product.append('visibility', visibility)
        product.append('regularPrice', regularPrice)
        product.append('seoTitle', seoTitle)
        product.append('seoDescription', seoDescription)
        product.append('keywords', keywords)
        // product.append('isPopular',this.state.isPopular)
        product.append('isPopular', isPopular)
        setLoading(true)

        axios.post('products', product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response)
            message.success('Product added successfully.');
            setLoading(false)
            history.push("/products")

        }).catch(error => {
            setLoading(false)
            let errors = error.response.data;
            console.log(errors)
            // if (errors.errors[0].param == 'name') {
            //     message.error(errors.errors[0].msg);
            // }
            // errors.error?message.error("Add Collection or Brand"):message.error(errors.errors[0].message,3)
            // console.log(errors)
        })
    }

    return (
        <Form
            layout={formLayout}
            form={form}
            initialValues={{
                layout: formLayout,
            }}
        >
            <div className="site-card-wrapper">

                {/* For Big Screen */}

                <MediaQuery minWidth={1224}>
                    <Row className="row">
                        <Col span={8} offset={16}><Link to='/products'>
                            <Button type="danger" size="large" className="button"><span
                                className="span">Cancel</span></Button></Link>
                            <Button type="submit" size="large" className="button" loading={loading}
                                    onClick={postProductHandler}><span
                                className="span">Save</span></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                        </Col>
                    </Row>
                    <Row gutter={12} className="row">
                        <Col span={16}>
                            <Card title="General Description" className="cardHeight" bordered={false}>
                                <>
                                    <Form.Item name="name"
                                               label="Product Name"
                                               rules={[{required: true, message: 'Please enter product name'}]}>
                                        <Input placeholder="Product name" onChange={(e) => {
                                            setName(e.target.value)
                                        }}/>
                                    </Form.Item>
                                    <Form.Item name="slug"
                                               label="Product Slug">
                                        <Input placeholder="Product Slug" onChange={(e) => {
                                            setSlug(e.target.value)
                                        }}/>
                                    </Form.Item>

                                    <ReactQuill placeholder="Product description"
                                                onChange={(value, delta, source, editor) => {
                                                    setDescription(editor.getHTML)
                                                }}/>
                                </>
                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card title="Add product to collection" className="cardHeight" bordered={false}>
                                <>
                                    <Form.Item label="Collections">
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select filterOption={(input, option) =>
                                                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }{...selectProps} />
                                        </Space>
                                    </Form.Item>
                                </>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={12} className="row">
                        <Col span={16}>
                            <Card title="Product data -" className="cardHeight" bordered={false} extra={<Select
                                style={{width: 200}}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={onProductChange}
                                defaultValue="1"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="1">Simple Product</Option>
                            </Select>}>
                                <>
                                    <Tabs tabPosition="left" defaultActiveKey="1">
                                        {
                                            productType &&
                                            <TabPane
                                                tab={
                                                    <span>
                                                <SettingFilled/>
                                                            General
                                                        </span>
                                                }
                                                key="1"
                                            >
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
                                                <Form.Item name="regular_price"
                                                           label="Regular Price"
                                                           rules={[{
                                                               required: true,
                                                               message: 'Please enter product regular price'
                                                           }]}>
                                                    <Input placeholder="Regular price" onChange={(e) => {
                                                        setRegularPrice(e.target.value)
                                                    }}/>
                                                </Form.Item>
                                                <ImgCrop rotate>
                                                    <Upload
                                                        name="images"
                                                        listType="picture-card"
                                                        fileList={fileList}
                                                        customRequest={dummyRequest}
                                                        onChange={onChange}
                                                        onPreview={onPreview}
                                                    >
                                                        {fileList.length < 5 && '+ Upload'}
                                                    </Upload>
                                                </ImgCrop>
                                            </TabPane>
                                        }
                                        {productType &&
                                        <TabPane
                                            tab={
                                                <span>
                                                <CheckCircleFilled/>
                                                            Inventory
                                                        </span>
                                            }
                                            key="2"
                                        >
                                            <Form.Item name="sku"
                                                       defaultValue={"in_stock"}
                                                       label="SKU"
                                                       rules={[{required: true, message: 'Please enter product sku'}]}>
                                                <Input placeholder="Sku" onChange={(e) => {
                                                    setSku(e.target.value)
                                                }}/>
                                            </Form.Item>
                                            <Form.Item name="quantity"
                                                       label="Quantity"
                                                       rules={[{
                                                           required: true,
                                                           message: 'Please enter product quantity'
                                                       }]}>
                                                <Input placeholder="Quantity" onChange={(e) => {
                                                    setQuantity(e.target.value)
                                                }}/>
                                            </Form.Item>
                                            <Form.Item name="stock"
                                                       label="Stock status"
                                            >
                                                <Radio.Group onChange={onStock} value={stock}
                                                             defaultValue={stock}>
                                                    <Radio value="in_stock">In Stock</Radio>
                                                    <Radio value="out_of_stock">Out Of Stock</Radio>
                                                    <Radio value="stock_back">Stock Back</Radio>

                                                </Radio.Group>
                                            </Form.Item>
                                        </TabPane>
                                        }
                                    </Tabs>
                                </>
                                {/*{!productType && <VariationAttribute/> }*/}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Visibility" className="cardHeight" bordered={false}>
                                <>
                                    <Card type="inner" title="Visibility">
                                        <Switch checkedChildren="Published" unCheckedChildren="Hidden"
                                                onChange={(e) => onVisibility(e)}/>
                                    </Card>
                                    <Card style={{marginTop: 16}} type="inner" title="Popularity">
                                        <Switch checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}
                                                onChange={(a) => toggleChange(a)}/>
                                    </Card>
                                </>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={12} className="row">
                        <Col span={16}>
                            <Card title="Search engine listing" className="cardHeight" bordered={false}>
                                <>
                                    <Form.Item name="seo_title"
                                               label="Title"
                                               rules={[{required: true, message: 'Please enter product price'}]}>
                                        <Input placeholder="input placeholder" onChange={(e) => {
                                            setSeoTitle(e.target.value)
                                        }}/>
                                    </Form.Item>

                                    <Form.Item name="seo_description"
                                               label="Description"
                                               rules={[{required: true, message: 'Please enter product barcode'}]}>
                                        <TextArea placeholder="input placeholder" onChange={(e) => {
                                            setSeoDescription(e.target.value)
                                        }}/>
                                    </Form.Item>
                                    <Form.Item name="keywords"
                                               label="Keywords"
                                               rules={[{required: true, message: 'Please enter product sku'}]}>
                                        <Input placeholder="input placeholder" onChange={(e) => {
                                            setKeywords(e.target.value)
                                        }}/>
                                    </Form.Item>

                                </>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Product Brand" className="cardHeight" bordered={false}>
                                <>
                                    <Form.Item label="Brands"
                                               rules={[{required: true, message: 'Please enter product Brand'}]}>
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }{...selectBrandProps} />
                                        </Space>
                                    </Form.Item>
                                </>
                            </Card>
                        </Col>
                    </Row>
                </MediaQuery>


                {/* For Small Screen */}

                <MediaQuery maxWidth={1224}>
                    <Row className="row">
                        <Col span={24} offset={0}><Link to='/products'>
                            <Button type="danger" size="large" className="button"><span
                                className="span">Cancel</span></Button></Link>
                            <Button type="submit" size="large" className="button" loading={loading}
                                    onClick={postProductHandler}><span
                                className="span">Save</span></Button>
                        </Col>
                    </Row>
                    <Row gutter={12} className="row">
                        <Col span={24}>
                            <Card title="General Description" className="cardHeight" bordered={false}>
                                <>
                                    <Form.Item name="name"
                                               label="Product Name"
                                               rules={[{required: true, message: 'Please enter product name'}]}>
                                        <Input placeholder="Product name" onChange={(e) => {
                                            setName(e.target.value)
                                        }}/>
                                    </Form.Item>
                                    <Form.Item name="slug"
                                               label="Product Slug">
                                        <Input placeholder="Product Slug" onChange={(e) => {
                                            setSlug(e.target.value)
                                        }}/>
                                    </Form.Item>

                                    <ReactQuill placeholder="Product description"
                                                onChange={(value, delta, source, editor) => {
                                                    setDescription(editor.getHTML)
                                                }}/>


                                </>
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Card title="Add product to collection" className="cardHeight" bordered={false}>
                                <>
                                    <Form.Item label="Collections">
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select filterOption={(input, option) =>
                                                option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }{...selectProps} />
                                        </Space>
                                    </Form.Item>


                                </>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={12} className="row">
                        <Col span={24}>
                            <Card title="Product data -" className="cardHeight" bordered={false} extra={<Select
                                style={{width: 200}}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={onProductChange}
                                defaultValue="1"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="1">Simple Product</Option>
                                <Option value="2">Variable Product</Option>

                            </Select>}>

                                <>
                                    <Tabs tabPosition="left" defaultActiveKey="1">
                                        {
                                            productType &&
                                            <TabPane
                                                tab={
                                                    <span>
                                                <SettingFilled/>
                                                            General
                                                        </span>
                                                }
                                                key="1"
                                            >
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
                                                <Form.Item name="regular_price"
                                                           label="Regular Price"
                                                           rules={[{
                                                               required: true,
                                                               message: 'Please enter product regular price'
                                                           }]}>
                                                    <Input placeholder="Regular price" onChange={(e) => {
                                                        setRegularPrice(e.target.value)
                                                    }}/>
                                                </Form.Item>
                                                <ImgCrop rotate>
                                                    <Upload
                                                        name="images"
                                                        listType="picture-card"
                                                        fileList={fileList}
                                                        customRequest={dummyRequest}
                                                        onChange={onChange}
                                                        onPreview={onPreview}
                                                    >
                                                        {fileList.length < 5 && '+ Upload'}
                                                    </Upload>
                                                </ImgCrop>
                                            </TabPane>
                                        }

                                        {productType &&
                                        <TabPane
                                            tab={
                                                <span>
                                                <CheckCircleFilled/>
                                                            Inventory
                                                        </span>
                                            }
                                            key="2"
                                        >
                                            <Form.Item name="sku"
                                                       label="SKU"
                                                       rules={[{required: true, message: 'Please enter product sku'}]}>
                                                <Input placeholder="Sku" onChange={(e) => {
                                                    setSku(e.target.value)
                                                }}/>
                                            </Form.Item>
                                            <Form.Item name="quantity"
                                                       label="Quantity"
                                                       rules={[{
                                                           required: true,
                                                           message: 'Please enter product quantity'
                                                       }]}>
                                                <Input placeholder="Quantity" onChange={(e) => {
                                                    setQuantity(e.target.value)
                                                }}/>
                                            </Form.Item>
                                            <Form.Item name="stock"
                                                       label="Stock status"
                                                       rules={[{
                                                           required: true,
                                                           message: 'Please select stock status'
                                                       }]}>
                                                <Radio.Group onChange={onStock} value="in_stock"
                                                             defaultValue="in_stock">
                                                    <Radio value="in_stock">In Stock</Radio>
                                                    <Radio value="out_of_stock">Out Of Stock</Radio>
                                                    <Radio value="stock_back">Stock Back</Radio>

                                                </Radio.Group>
                                            </Form.Item>
                                        </TabPane>
                                        }
                                        {!productType &&
                                        <TabPane
                                            tab={
                                                <span>
                                                <CalendarFilled/>
                                                            Attributes
                                                        </span>
                                            }
                                            key="3"
                                        >
                                        </TabPane>}
                                        {!productType &&
                                        <TabPane
                                            tab={
                                                <span>
                                                <BoxPlotFilled/>
                                                            Variations
                                                        </span>
                                            }
                                            key="4"
                                        >
                                            Variations
                                        </TabPane>}
                                    </Tabs>
                                </>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Visibility" className="cardHeight" bordered={false}>
                                <>
                                    <Card type="inner" title="Visibility">
                                        <Switch checkedChildren="Published" unCheckedChildren="Hidden"
                                                onChange={(e) => onVisibility(e)}/>
                                    </Card>
                                    <Card style={{marginTop: 16}} type="inner" title="Popularity">
                                        <Switch checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}
                                                onChange={(a) => toggleChange(a)}/>
                                    </Card>
                                </>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={12} className="row">
                        <Col span={24}>
                            <Card title="Search engine listing" className="cardHeight" bordered={false}>
                                <>
                                    <Form.Item name="seo_title"
                                               label="Title"
                                               rules={[{required: true, message: 'Please enter product price'}]}>
                                        <Input placeholder="input placeholder" onChange={(e) => {
                                            setSeoTitle(e.target.value)
                                        }}/>
                                    </Form.Item>

                                    <Form.Item name="seo_description"
                                               label="Description"
                                               rules={[{required: true, message: 'Please enter product barcode'}]}>
                                        <TextArea placeholder="input placeholder" onChange={(e) => {
                                            setSeoDescription(e.target.value)
                                        }}/>
                                    </Form.Item>
                                    <Form.Item name="keywords"
                                               label="Keywords"
                                               rules={[{required: true, message: 'Please enter product sku'}]}>
                                        <Input placeholder="input placeholder" onChange={(e) => {
                                            setKeywords(e.target.value)
                                        }}/>
                                    </Form.Item>

                                </>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Product Brand" className="cardHeight" bordered={false}>
                                <>

                                    <Form.Item label="Brands">
                                        <Space
                                            direction="vertical"
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <Select
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }{...selectBrandProps} />
                                        </Space>
                                    </Form.Item>
                                </>
                            </Card>
                        </Col>
                    </Row>
                </MediaQuery>

            </div>
        </Form>


    );

}

const mapStateToProps = state => {
    return {
        collections: state.collections.collections,
        brands: state.brands.brands,
        attributes: state.attributes.attributes,
    }

}
export default connect(mapStateToProps)(CreateProduct);
