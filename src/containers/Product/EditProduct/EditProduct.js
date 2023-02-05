import React,{useEffect, useState} from 'react';
import {Button, Card, Col, Form, Input, message, Row, Select, Space, Switch} from "antd"
import ReactQuill from 'react-quill';
import {connect} from 'react-redux'
import {
    CheckOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import 'react-quill/dist/quill.snow.css';
import '../NewProduct/NewProduct.css'
import axios from "axios";
import {useParams} from "react-router";
import {storeBrands} from "../../../store/actions/brandActions";
import {storeCollections} from "../../../store/actions/collectionActions";
import {Link, useHistory} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

const {TextArea} = Input


const CreateProduct = (props) => {
    /**
     * State Variables
     */
    const history = useHistory()
    const [name, setName] = useState("");
    const [slug,setSlug] = useState("")
    const [description, setDescription] = useState('');
    const [collection, setCollection] = useState([]);
    const [brand, setBrand] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [collectionOptions, setCollectionOptions] = useState([]);
    const [brandOptions, setBrandOptions] = useState([]);
    const [visibility, setVisibility] = useState(1);
    const [isPopular, setIsPopular] = useState(false);
    const [loading , setLoading] = useState(false);
    const collectionsArray = []
    const brandsArray = []
    const [form] = Form.useForm();
    const formLayout = 'vertical';
    const {id} = useParams()

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
        // props.dispatch(actionCreators.storeBrands())
        for (let i = 0; i < props.brands.length; i++) {
            let value = props.brands[i].key
            brandsArray.push({
                label: props.brands[i].name,
                value,
            });
            setBrandOptions(options => [...brandsArray]);
        }
    }, [props.brands]);
    useEffect(()=>{

        props.dispatch(storeBrands())
    },[])
    useEffect(()=>{
        props.dispatch(storeCollections())
    },[])

    useEffect(() => {
        axios.get('products/' + id).then((response) => {

            let product = response.data
            // let newName = ReactHtmlParser(product.name)
            // let newSlug = ReactHtmlParser(product.slug)
            //
            // product.name=newName
            // product.slug=newSlug
            form.setFieldsValue(product)
            setName(product.name)
            setSlug(product.slug)
            setBrand(product.Brand.id)
            setDescription(product.description)
            setSeoTitle(product.seo_title)
            setSeoDescription(product.seo_description)
            setKeywords(product.seo_keywords)
            setIsPopular(product.isPopular)
            setVisibility(product.visibility)
            let collections = []
            product.collections.map((collection) => collections.push(collection.id))
            setCollection(collections)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    // function for the  isPopular
    const onPopularChange = (value) => {
        setIsPopular(value)
    }


    /**
     * set Visibility
     * @param e
     */
    const onVisibility = (e) => {
        setVisibility(e)
    }

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

        let product = new FormData();
        console.log(name)
        product.append("name", name)
        product.append('slug',slug)
        product.append('collections', collection)
        product.append('brand', brand)
        product.append('description', description)
        product.append('visibility', visibility)
        product.append('seoTitle', seoTitle)
        product.append('seoDescription', seoDescription)
        product.append('keywords', keywords)
        product.append('isPopular', isPopular)
            setLoading(true)
        console.log(product)
        axios.put('products/'+id, product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response)
            // const result ={
            //     key: response.data.id, // I added this line
            //     name: response.data.name,
            //     createdAt: <ReactTimeAgo date={new Date(response.data.createdAt)} locale="en-US"/>,
            //     image: response.data.image
            // }
            // this.props.dispatch(actionCreators.saveBrand(result))
            // this.setState({
            //     loading:false
            // })
            // message.success('Brand added successfully.');
            // this.props.cancel()
            message.success('Product updated successfully.');
            setLoading(false)
            history.push("/products")
        }).catch(error => {
            setLoading(false)
            console.log(error)
            // let errors=error.response.data;
            // if(errors.errors[0].param=='name'){
            //     message.error(errors.errors[0].msg);
            //
            // }


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
                <Row gutter={12} className="row">
                    <Col xs={10} md={8} span={8}>
                        <Link to={'/products'}>
                            <Button type="danger" size="large" className="button">
                                <span className="span">Cancel</span>
                            </Button>
                        </Link>
                        <Button type="submit" size="large" className="button" loading={loading} onClick={postProductHandler}><span
                            className="span">Save</span></Button>
                    </Col>
                </Row>
                <Row gutter={12} className="row">
                    <Col xs={24} md={16} span={16}>
                        <Card title="General Description" className="cardHeight" bordered={false}>
                            <>
                                <Form.Item name="name"
                                           label="Product Name"
                                           rules={[{required: true, message: 'Please enter product name'}]}>
                                    <Input placeholder="Product name" onChange={(e) => {
                                        setName(e.target.value)
                                    }}/>
                                </Form.Item>
                                <Form.Item
                                    name="slug"
                                           label="Product Slug">
                                    <Input placeholder="Product slug"
                                           onChange={(e) => {setSlug(e.target.value)}}
                                    />
                                </Form.Item>
                                <ReactQuill value={description}  placeholder="Product description" onChange={(value) => {
                                    setDescription(value)
                                }}>
                                </ReactQuill>
                            </>
                        </Card>
                    </Col>
                    <Col xs={24} md={8} span={8}>
                        <Card title="Add product to collection" className="cardHeight" bordered={false}>
                            <>
                                <Form.Item label="Collections">
                                    <Space
                                        direction="vertical"
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Select value={collection} filterOption={(input, option) =>
                                            option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }{...selectProps}/>
                                    </Space>
                                </Form.Item>


                            </>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={12} className="row">
                    <Col xs={24} md={6} span={6}>
                        <Card title="Visibility" className="cardHeight" bordered={false}>
                            <>
                                <Card type="inner" title="Visibility">
                                    <Switch
                                        checked={visibility} checkedChildren="Published" unCheckedChildren="Hidden"
                                            onChange={(e) => onVisibility(e)}/>
                                </Card>
                                <Card style={{marginTop: 16}} type="inner" title="Popularity">
                                    <Switch checked={isPopular} checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}
                                            onChange={(a) => onPopularChange(a)}/>
                                </Card>
                            </>
                        </Card>
                    </Col>
                    <Col xs={24} md={10} span={10}>
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
                                <Form.Item name="seo_keywords"
                                           label="Keywords"
                                           rules={[{required: true, message: 'Please enter product sku'}]}>
                                    <Input placeholder="input placeholder" onChange={(e) => {
                                        setKeywords(e.target.value)
                                    }}/>
                                </Form.Item>

                            </>
                        </Card>
                    </Col>
                    <Col xs={24} span={8} md={8}>
                        <Card title="Product Brand" className="cardHeight" bordered={false}>
                            <>

                                <Form.Item label="Brands">
                                    <Space
                                        direction="vertical"
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Select value={brand}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                {...selectBrandProps} />
                                    </Space>
                                </Form.Item>
                            </>
                        </Card>
                    </Col>
                </Row>
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
