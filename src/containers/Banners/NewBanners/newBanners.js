import React, {useEffect, useState} from "react";
import Uploader from "../../../components/ImageUploader/Uploader"
import {Link} from "react-router-dom";
import "./newBanners.css";
import {Form,Switch, Button, Select, Input, message, Space} from "antd";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {storeCollections} from "../../../store/actions/collectionActions";
import {storeProducts} from "../../../store/actions/productActions";

//state of Desktop image
const Banners = (props) => {
    const dispatch = useDispatch()
    const {products} = useSelector(({products}) => products);
    const {collections} = useSelector(({collections}) => collections);

    //setting the Products and Collections in the states for Select
    const [collectionOptions , setCollectionOptions] = useState([])
    const [productOptions , setProductOptions] = useState([])
    const collectionsArray = []
    const productsArray = []
    useEffect(() => {
        dispatch(storeProducts())
    }, [])
    useEffect(() => {
        dispatch(storeCollections())
    }, [])
    useEffect(() => {
        for (let i = 0; i < collections.length; i++) {
            let value = collections[i].key
            collectionsArray.push({
                label: collections[i].name,
                value,
            });
            setCollectionOptions(collectionOptions => [...collectionsArray]);
        }
    }, [collections]);

    useEffect(() => {
        for (let i = 0; i < products.length; i++) {
            let value = products[i].key
            productsArray.push({
                label: products[i].name,
                value,
            });
            setProductOptions(productOptions => [...productsArray]);
        }
    }, [products]);

    const [desktopLogo, setDesktopLogo] = useState('');
    const saveImage = (image) => {
        setDesktopLogo(image)
        setDesktopButtonDisable(false)
    };
    // for desktop loading
    const [desktopLoading, setDesktopLoading] = useState(false)
    const [desktopButtonDisable, setDesktopButtonDisable] = useState(true)
    // save response from desktop api
    const [desktopId, setDesktopId] = useState("")
    //state of Mobile image
    const [mobileLogo, setMobileLogo] = useState('');
    const mobImage = (imageSectionTwo) => {
        setMobileLogo(imageSectionTwo)
        setMobileButtonDisable(false)
    };
    //for Mobiledata loading
    const [mobileLoading, setMobileLoading] = useState(false);
    const [mobileButtonDisable, setMobileButtonDisable] = useState(true)
    //save response from Mobile Api
    const [mobileId, setMobileId] = useState('');
    //state of form Placeholder.
    const [placeholder, setPlaceholder] = useState('');
    const handleFirstMobilePlaceHolder = (event) => {
        console.log(event.target.value)
        setPlaceholder(event.target.value)
    };
    const [isFeatured, setIsFeatured] = useState(0)
    //state of form Collection. for first dataSet
    const [collection, setCollection] = useState('');
    const selectProps = {
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
    //state of form Product.
    const [product, setProduct] = useState('');
    const selectProductProps = {
        style: {
            width: '100%',
        },
        product,
        options: productOptions,
        onChange: (newValue) => {
            setProduct(newValue);
        },
        placeholder: 'Select Collection...',
        maxTagCount: 'responsive',
    };

    //Desktop image Api Function.
    const saveBannerDesktopSectionTwo = () => {
        let banner = new FormData();
        banner.append("image", desktopLogo);
        setDesktopLoading(true)
        axios.post('banners', banner, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response);
                message.success(response.data.message)
                setDesktopId(response.data.new_banner.id)
                setDesktopLoading(false)
                setDesktopButtonDisable(true)
            })
            .catch((error) => {
                console.log(error);
                message.error(error)
                setDesktopLoading(false)
            });
    }
    //Mobile image and Form data Api Function.
    const saveMobileDataSectionTwo = () => {
        let mobileData = new FormData();
        mobileData.append("mobileImage", mobileLogo);
        mobileData.append("placeholder", placeholder);
        mobileData.append("isFeatured", isFeatured);
        mobileData.append("collectionId", collection);
        mobileData.append("productId", product);
        axios.put('banners/' + desktopId, mobileData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response);
                message.success(response.data.message);
                setMobileId(response.data.id)
                setMobileLoading(false);
                setMobileButtonDisable(true);
            })
            .catch((error) => {
                message.error(error);
                setMobileLoading(false);
            });
    }

    //Second Section functionality

    //Desktop SectionTwo button & Loading state
    const [desktopSectionTwoLoading, setDesktopSectionTwoLoading] = useState(false)
    const [desktopSectionTwoButtonDisable, setDesktopSectionTwoButtonDisable]=useState(true);

    //for Mobiledata 2 loading
    const [mobileSectionTwoLoading, setMobileSectionTwoLoading] = useState(false);
    const [mobileSectionTwoButtonDisable, setMobileSectionTwoButtonDisable] = useState(true)

    //state of form Placeholder Section Two.
    const [placeholderSectionTwo, setPlaceholderSectionTwo] = useState('');
    const handleSecondMobilePlaceHolder = (event) => {
        setPlaceholderSectionTwo(event.target.value)
    };

    //saving response from dexktop api of section two
    const [desktopSectionTwoId,setDesktopSectionTwoId] =  useState('')
    //state of form Collection. for first dataSet
    const [collectionSectionTwo, setCollectionSectionTwo] = useState('');
    const selectCollectionPropsSectionTwo = {
        style: {
            width: '100%',
        },
        collectionSectionTwo,
        options: collectionOptions,
        onChange: (newValue) => {
            setCollectionSectionTwo(newValue);
        },
        placeholder: 'Select Collection...',
        maxTagCount: 'responsive',
    };
    //state of form Product.
    const [productSectionTwo, setProductSectionTwo] = useState('');
    const selectProductPropsSectionTwo = {
        style: {
            width: '100%',
        },
        productSectionTwo,
        options: productOptions,
        onChange: (newValue) => {
            setProductSectionTwo(newValue);
        },
        placeholder: 'Select Collection...',
        maxTagCount: 'responsive',
    };
    const [isFeaturedSectionTwo, setIsFeaturedSectionTwo] = useState(0)
    //Desktop Section Two image Api Function.
    const saveBannerDesktopTwo = () => {
        let bannerSectionTwo = new FormData();
        bannerSectionTwo.append("image", desktopLogoSectionTwo);
        setDesktopSectionTwoLoading(true)
        setDesktopSectionTwoButtonDisable(true)
        axios.post('banners', bannerSectionTwo, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response);
                message.success(response.data.message)
                setDesktopSectionTwoId(response.data.new_banner.id)
                setDesktopSectionTwoLoading(false)
            })
            .catch((error) => {
                console.log(error);
                message.error(error)
                setDesktopSectionTwoLoading(false)
                setDesktopSectionTwoButtonDisable(false)
            });
    }
    //Mobile image and Form data Api Function.
    const saveMobileData2 = () => {
        let mobileSectionTwoData = new FormData();
        mobileSectionTwoData.append("mobileImage", mobileLogoSectionTwo);
        mobileSectionTwoData.append("placeholder", placeholderSectionTwo);
        mobileSectionTwoData.append("collectionId", collectionSectionTwo);
        mobileSectionTwoData.append("isFeatured", isFeaturedSectionTwo);
        mobileSectionTwoData.append("productId", productSectionTwo);
        setMobileSectionTwoLoading(true);
        setMobileSectionTwoButtonDisable(true);
        axios.put('banners/' + desktopSectionTwoId, mobileSectionTwoData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response);
                message.success(response.data.message);
                setMobileSectionTwoLoading(false);
            })
            .catch((error) => {
                message.error(error);
                setMobileSectionTwoLoading(false);
                setMobileSectionTwoButtonDisable(false);
            });
    }

    // setting Imaga ass Logo for section two
    const [desktopLogoSectionTwo,setDesktopLogoSectionTwo]=useState("");
    const saveImageForDesktopSectionTwo = (image) => {
        setDesktopLogoSectionTwo(image)
        setDesktopSectionTwoButtonDisable(false)
    };

    //state of Mobile image
    const [mobileLogoSectionTwo, setMobileLogoSectionTwo] = useState('');
    const mobSectionTwoImage = (image2) => {
        setMobileLogoSectionTwo(image2)
        setMobileSectionTwoButtonDisable(false);
    };
    


    return (<>
            <div  className="new-banner-button"><Link to="/banners" ><Button type="primary">Cancel</Button></Link></div>
            <div className="Banner-main">
                <div className="New-Banner-sec">
                    <Form layout="vertical">
                        <div className="Banner-content">
                            <div className='uploader-main'>
                                <div className="image-uploader">
                                    <p>Desktop Image1</p>
                                    <div className="mobile-image">
                                        <Uploader saveImage={saveImage}/>
                                        <Button disabled={desktopButtonDisable} loading={desktopLoading}
                                                onClick={saveBannerDesktopSectionTwo} type="primary">Upload Desktop
                                            Image
                                        </Button>
                                    </div>
                                </div>
                                <div className="image-uploader">
                                    <p>Mobile Image</p>
                                    <div className="mobile-image">
                                        <Uploader saveImage={mobImage}/>
                                    </div>
                                </div>
                            </div>
                            <div className='form-inputs'>
                                <Form.Item
                                    name="name"
                                    label="Placeholder"
                                    rules={[
                                        {required: true, message: "Please enter Placeholder name"},
                                    ]}
                                >
                                    <Input
                                        value={placeholder}
                                        onChange={(e) => handleFirstMobilePlaceHolder(e)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Switch
                                        checkedChildren="Featured"
                                        unCheckedChildren="Not Featured"
                                        onChange={()=>setIsFeatured(!isFeatured)}
                                    />
                                </Form.Item>
                                <Form.Item label="Collections">
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
                                            }{...selectProps} />
                                    </Space>
                                </Form.Item>
                                <Form.Item label="Products">
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
                                            }{...selectProductProps} />
                                    </Space>
                                </Form.Item>
                                <div className="form-btn">
                                    <Button disabled={desktopId !== 0 && mobileButtonDisable} loading={mobileLoading}
                                            onClick={saveMobileDataSectionTwo} type="primary">Upload Mobile Image</Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
                {/* section no 2*/}
                <div className="New-Banner-sec">
                    <Form layout="vertical">
                        <div className="Banner-content">
                            <div className='uploader-main'>
                                <div className="image-uploader">
                                    <p>Desktop Image</p>
                                    <div className="mobile-image">
                                        <Uploader saveImage={saveImageForDesktopSectionTwo}/>
                                        <Button disabled={desktopSectionTwoButtonDisable} loading={desktopSectionTwoLoading}
                                                onClick={saveBannerDesktopTwo}
                                                type="primary">Upload Desktop Image</Button>
                                    </div>
                                </div>
                                <div className="image-uploader">
                                    <p>Mobile Image</p>
                                    <div className="mobile-image">
                                        <Uploader saveImage={mobSectionTwoImage}/>
                                    </div>
                                </div>
                            </div>
                            <div className='form-inputs'>
                                <Form.Item
                                    name="name"
                                    label="Placeholder"
                                    rules={[
                                        {required: true, message: "Please enter brand name"},
                                    ]}
                                >
                                    <Input
                                        value={placeholderSectionTwo}
                                        onChange={(c) => handleSecondMobilePlaceHolder(c)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Switch
                                        checkedChildren="Featured"
                                        unCheckedChildren="Not Featured"
                                        onChange={()=>setIsFeaturedSectionTwo(!isFeaturedSectionTwo)}
                                    />
                                </Form.Item>
                                <Form.Item label="Collections">
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
                                            }{...selectCollectionPropsSectionTwo} />
                                    </Space>
                                </Form.Item>
                                <Form.Item label="Products">
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
                                            }{...selectProductPropsSectionTwo} />
                                    </Space>
                                </Form.Item>
                                <div className="form-btn">
                                    <Button
                                        disabled={desktopSectionTwoId !== 0 && mobileSectionTwoButtonDisable} loading={mobileSectionTwoLoading}
                                        onClick={saveMobileData2} type="primary">Upload Mobile Image</Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Banners;