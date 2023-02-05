import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {Form, Input, Row, Col, message,Select,Space} from 'antd';
import axios from "axios";
import {useSelector} from "react-redux";
import ReactHtmlParser from 'react-html-parser';

const DynamicRule = forwardRef((props, ref) => {

    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [collection, setCollection] = useState([]);
    const [collectionOptions, setCollectionOptions] = useState([]);
    const [menuCollection, setMenuCollection] = useState([0]);
    const {menu} = useSelector(({menus}) => menus);
    const collectionsArray = []

    useEffect(() => {
        form.setFieldsValue({

            name: props.menu.name,
        })
        setName(props.menu.name)

    }, [props.menu]);

    useEffect(() => {
        setCollection(props.menuCollections)
    }, [props.menuCollections]);

    useEffect(() => {
        menu.Collection !== null && setMenuCollection(menu.Collection.id)
    }, []);

    useEffect(() => {
        for (let i = 0; i < props.collections.length; i++) {
            let value = props.collections[i].key
            collectionsArray.push({
                label: props.collections[i].name,
                value,
            });
            setCollectionOptions(collectionOptions => [...collectionsArray]);


        }
    }, [props.collections])

    useImperativeHandle(
        ref,
        () => ({
            async showAlert() {
                try {
                    const values = await form.validateFields();
                    let menu = new FormData()
                    let id = props.menu.id
                    menu.append('name', name)
                    menu.append('collections',collection)
                    menu.append('menuCollection',menuCollection)
                    props.setloader()
                    axios.put('menus/' + id, menu, ).then(response => {
                        props.getMenus()
                        props.setloader()
                        props.cancelDrawer()
                        message.success('Menu updated successfully.');
                    }).catch(error => {
                        props.setloader()
                        message.error('Unable to Update the Menu.');
                        let errors = error.response.data;
                        if (errors.errors[0].param == 'name') {
                            message.error(errors.errors[0].msg);
                        }
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
    const selectPropsForMenuCollection = {
        style: {
            width: '100%',
        },
        menuCollection,
        options: collectionOptions,
        onChange: (newValue) => {
            setMenuCollection(newValue);
        },
        placeholder: 'Select Menu Collection...',
        maxTagCount: 'responsive',
    };

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
        maxTagCount: 'responsive'
        // defaultValue: selectedCollections
    };
    //
    return (
        <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter Menu name'}]}
                    >
                        <Input onChange={e => setName(e.target.value)} value={props.menu.name}
                               placeholder="Please enter user name"/>
                    </Form.Item>
                    <Form.Item label="Collections" name="collections">
                        <Space
                            direction="vertical"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Select
                                showSearch
                                value={collection}
                                filterOption={(input, option) =>
                                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                {...selectProps}
                                onChange={(value)=>setCollection(value)}
                            />
                        </Space>
                    </Form.Item>
                    {menuCollection === [0 ]? " ":<Form.Item label="Menu Collection">
                        <Space
                            direction="vertical"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Select
                                showSearch
                                value={menuCollection}
                                filterOption={(input, option) =>
                                    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                {...selectPropsForMenuCollection}
                            />
                        </Space>
                    </Form.Item>}
                </Col>
            </Row>
        </Form>
    );

});

export default DynamicRule
