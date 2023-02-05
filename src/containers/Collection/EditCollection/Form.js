import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {Form, Input, Row, Col, message, Space, Select} from 'antd';
import Uploader from "../../../components/ImageUploader/Uploader";
import axios from "axios";
import {useDispatch} from "react-redux";
import * as actionCreators from "../../../store/actions/collectionActions";

const {TextArea} = Input
const DynamicRule = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const [name, setName] = useState(false);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(false);
    const [parentCollection, setParentCollection] = useState([])
    const [parentCollectionOptions, setParentCollectionOptions] = useState([]);
    const parentCollectionArray = []
    const dispatch = useDispatch()
    useEffect(() => {
        for (let i = 0; i < props.collections.length; i++) {
            let value = props.collections[i].key
            parentCollectionArray.push({
                label: props.collections[i].name,
                value,
            });
            setParentCollectionOptions(options => [...parentCollectionArray]);
        }
    }, [props.collections]);
    useEffect(() => {
        form.setFieldsValue({
            name: props.collection.name,
            description: props.collection.description,
            parentCollection: props.collection.collectionId
        })
        setName(props.collection.name)
        setDescription(props.collection.description)
        setParentCollection(props.pids)
    }, [props.collection]);
    useImperativeHandle(
        ref,
        () => ({
            async showAlert() {
                try {
                    const values = await form.validateFields();
                    let collection = new FormData()
                    let id = props.collection.id
                    collection.append('file', image)
                    collection.append('name', name)
                    collection.append('description', description)
                    collection.append('collectionIds', parentCollection)
                    props.setloader()
                    axios.put('collections/' + id, collection, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response => {
                        dispatch(actionCreators.editCollection(response.data.latestCollections))
                        props.getCollections()
                        props.setloader()
                        props.cancelDrawer()
                        message.success('Collection updated successfully.');

                    }).catch(error => {
                        props.setloader()
                        message.error(error)
                    })

                } catch (errorInfo) {
                    props.setloader()
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

    const selectParentCollectionProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        parentCollection,
        options: parentCollectionOptions,

        onChange: (newValue) => {
            setParentCollection(newValue);
        },
        placeholder: 'Select ParentCollection...',
        maxTagCount: 'responsive',
    };
    return (
        <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter collection name'}]}
                    >
                        <Input onChange={e => setName(e.target.value)} value={props.collection.name}
                               placeholder="Please enter user name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{message: 'Please enter collection description'}]}
                    >
                        <TextArea onChange={e => setDescription(e.target.value)} value={props.collection.description}
                                  name="description" rows={4}/>
                    </Form.Item>
                    <Form.Item label="Child Collection">
                        <Space
                            direction="vertical"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Select
                                showSearch
                                value={parentCollection}
                                filterOption={(input, option) =>
                                    option.props.label[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                {...selectParentCollectionProps}/>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
            <Uploader saveImage={saveImage} image={props.collection.image}/>
        </Form>
    );
});

export default DynamicRule
