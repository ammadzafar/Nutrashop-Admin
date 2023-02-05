// import React, {useImperativeHandle, useState, useEffect, forwardRef} from 'react'
// import {Form, Input, Row, Col, message} from 'antd';
// import uploader from "../../../components/CropImageUploader/uploader";
// import axios from "axios";
// import Uploader from "../../../components/ImageUploader/Uploader";
//
// const {TextArea} = Input;
// const form = Form.useForm;
// const DynamicRule = forwardRef((props, ref) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     // const [quantity, setQuantity] = useState('');
//     // const [price, setPrice] = useState('');
//     // const [regularPrice, setRegularPrice] = useState('');
//     // const [sku, setSku] = useState('');
//     // const [collection, setCollection] = useState([]);
//     // const [brand, setBrand] = useState('');
//     // const [attribute, setAttribute] = useState('');
//     // const [seoTitle, setSeoTitle] = useState('');
//     // const [seoDescription, setSeoDescription] = useState('');
//     // const [keywords, setKeywords] = useState('');
//     // const [collectionOptions, setCollectionOptions] = useState([]);
//     // const [brandOptions, setBrandOptions] = useState([]);
//     // const [attributeOptions, setAttributeOptions] = useState([]);
//     // const [stock, setStock] = useState("in_stock");
//     // const [visibility, setVisibility] = useState(1);
//     // const [isPopular, setIsPopular] = useState(false);
//     // const [addedAttributesHtml, setAddedAttributesHtml] = useState([]);
//     // const[image,setImage] = useState([]);
//
//     const collectionsArray = []
//     const brandsArray = []
//     const attributesArray = []
//     const [form] = Form.useForm();
//     const formLayout = 'vertical';
//     const [productType, setProductType] = useState(true);
//     const [fileList, setFileList] = useState([]);
//
//
//     useEffect(() => {
//         form.setFieldsValue({
//             name: props.product.name,
//             description: props.product.description,
//             // quantity: props.product.quantity,
//             // price: props.product.price,
//             // regularPrice: props.product.regularPrice,
//             // sku: props.product.sku,
//             // collection: props.product.collection,
//             // brand: props.product.brand,
//             // attribute: props.product.attribute,
//             // seoTitle: props.product.seoTitle,
//             // seoDescription: props.product.seoDescription,
//             // keywords: props.product.keywords,
//             // collectionOptions: props.product.collectionOptions,
//             // brandOptions: props.product.brandOptions,
//             // attributeOptions: props.product.attributeOptions,
//             // stock: props.product.stock,
//             // visibility: props.product.visibility,
//             // isPopular: props.product.isPopular,
//             // addedAttributesHtml: props.product.addedAttributesHtml,
//             // image:props.product.image,
//         })
//         setName(props.product.name)
//         setDescription(props.product.description)
//         // setQuantity(props.product.quantity)
//         // setPrice(props.product.price)
//         // setRegularPrice(props.product.regularPrice)
//         // setSku(props.product.sku)
//         // setCollection(props.product.collection)
//         // setBrand(props.product.brand)
//         // setAttribute(props.product.attribute)
//         // setSeoTitle(props.product.seoTitle)
//         // setSeoDescription(props.product.seoDescription)
//         // setKeywords(props.product.keywords)
//         // setCollectionOptions(props.product.collectionOptions)
//         // setBrandOptions(props.product.brandOptions)
//         // setAttributeOptions(props.product.attributeOptions)
//         // setStock(props.product.stock)
//         // setVisibility(props.product.visibility)
//         // setIsPopular(props.product.isPopular)
//         // setAddedAttributesHtml(props.product.addedAttributesHtml)
//         // setImage(props.product.image)
//
//     }, [props.product]);
//     useImperativeHandle(
//         ref,
//         () => ({
//             async showAlert() {
//                 try {
//                     const values = await form.validateFields();
//                     let product = new FormData()
//                     let id = props.brand.id
//                     // product.append('file', image)
//                     // product.append('isPopular', isPopular)
//                     product.append('name', name)
//                     product.append('description', description)
//                     // product.append('quantity', quantity)
//                     // product.append('price', price)
//                     // product.append('regularPrice', regularPrice)
//                     // product.append('sku', sku)
//                     // product.append('collection', collection)
//                     // product.append('brand', brand)
//                     // product.append('attribute', attribute)
//                     // product.append('seoTitle', seoTitle)
//                     // product.append('seoDescription', seoDescription)
//                     // product.append('keywords', keywords)
//                     // product.append('collectionOptions', collectionOptions)
//                     // product.append('brandOptions', brandOptions)
//                     // product.append('attributeOptions', attributeOptions)
//                     // product.append('stock', stock)
//                     // product.append('visibility', visibility)
//                     // product.append('addedAttributesHtml', addedAttributesHtml)
//                     props.setloader()
//                     axios.put('products/' + id, product, {
//                         headers: {
//                             'Content-Type': 'multipart/form-data'
//                         }
//                     }).then(response => {
//                         props.getProducts()
//                         props.setloader()
//                         props.cancelDrawer()
//                         message.success('Product updated successfully.');
//                     }).catch(error => {
//                         let errors = error.response.data;
//                         if (errors.errors[0].param == 'name') {
//                             message.error(errors.errors[0].msg);
//                         }
//                     })
//
//                 } catch (errorInfo) {
//                     if (errorInfo.errorFields[0]) {
//                         message.error('Failed:', errorInfo.errorFields[0].errors[0]);
//
//                     }
//                 }
//
//             }
//         }),
//     );
//     return (
//         <Form form={form} layout="vertical">
//             <Row gutter={16}>
//                 <Col span={24}>
//                     <Form.Item
//                         name="name"
//                         label="Name"
//                         rules={[{required: true, message: 'Please enter Product name'}]}
//                     >
//                         <Input onChange={e => setName(e.target.value)} value={props.product.name}
//                                placeholder="Please enter user name"/>
//                     </Form.Item>
//                     <Form.Item
//                         name="description"
//                         label="Description"
//                         rules={[{message: 'Please enter Product description'}]}
//                     >
//                         <TextArea onChange={e => setDescription(e.target.value)} value={props.product.description}
//                                   name="description" rows={4}/>
//                     </Form.Item>
//                 </Col>
//             </Row>
//             {/*<Uploader saveImage={saveImage} image={props.brand.image}/>*/}
//         </Form>
//     );
// });
//
//
//
// export default DynamicRule