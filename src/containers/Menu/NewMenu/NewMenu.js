import {React, Component, useEffect, useState} from 'react'
import {Drawer, Form, Button, Col, Row, Input, message, Space, Select} from 'antd';
import Uploader from "../../../components/ImageUploader/Uploader";
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/menuActions";
import {storeCollections} from "../../../store/actions/collectionActions";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import MediaQuery from 'react-responsive'




const NewMenu = (props) => {
    const [visible, setVisible] = useState(props.visible);
    const [loading, setloading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [name, setName] = useState('');
    const [collection, setCollection] = useState([]);
    const [menuCollection, setMenuCollection] = useState([]);
    const [collectionOptions, setCollectionOptions] = useState([]);
    const collectionsArray = []

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
        setVisible(true)
    }, [])

    useEffect(()=>{
        props.dispatch(storeCollections())
    },[])
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
    const postMenuHandler = () => {
        let menu = new FormData();
        menu.append('name', name)
        menu.append('collections',collection)
        menu.append('menuCollection',menuCollection)
        setloading(true)
        setDisabled(true)
        axios.post('menus', menu).then(response => {
            const result = {
                key: response.data.id, // I added this line
                name: response.data.name,
                createdAt: <ReactTimeAgo date={new Date(response.data.createdAt)} locale="en-US"/>,
            }
            props.dispatch(actionCreators.saveMenu(result))
            setloading(false)
            setDisabled(false)
            message.success('Menu added successfully.');
            props.cancel()

        }).catch(error => {
            message.error("Unable to Process the Request!")
            setloading(false)
            setDisabled(false)
            // console.log(error)
            // let errors=error.response.data;
            // if(errors.errors[0].param=='name'){
            //     // message.error(errors.errors[0].msg);
            //
            // }

        })

    }

    return (
        <>
            <Form layout="vertical">
                <MediaQuery minWidth={750}>
                <Drawer
                    title="Create a new Menu"
                    width={720}
                    onClose={props.cancel}
                    visible={props.visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={props.cancel} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button onClick={postMenuHandler} disabled={disabled} loading={loading} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter Menu name'}]}
                            >
                                <Input value={props.name}
                                       name="name"
                                       onChange={(e) => setName(e.target.value)}/>
                            </Form.Item>
                            <Form.Item label="Collections">
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Select
                                        filterOption={(input, option) =>
                                            option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        {...selectProps}
                                    />
                                </Space>
                            </Form.Item>
                            <Form.Item label="Menu Collection">
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Select
                                        filterOption={(input, option) =>
                                            option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        {...selectPropsForMenuCollection}
                                    />
                                </Space>
                            </Form.Item>


                        </Col>
                    </Row>

                </Drawer>
                </MediaQuery>

                <MediaQuery maxWidth={750}>
                <Drawer
                    title="Create a new Menu"
                    width={350}
                    onClose={props.cancel}
                    visible={props.visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={props.cancel} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button onClick={postMenuHandler} disabled={disabled} loading={loading} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter Menu name'}]}
                            >
                                <Input value={props.name}
                                       name="name"
                                       onChange={(e) => setName(e.target.value)}/>
                            </Form.Item>
                            <Form.Item label="Collections">
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Select
                                        filterOption={(input, option) =>
                                            option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        {...selectProps}
                                    />
                                </Space>
                            </Form.Item>
                            <Form.Item label="Menu Collection">
                                <Space
                                    direction="vertical"
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Select
                                        filterOption={(input, option) =>
                                            option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        {...selectPropsForMenuCollection}
                                    />
                                </Space>
                            </Form.Item>


                        </Col>
                    </Row>

                </Drawer>
                </MediaQuery>
            </Form>

        </>
    );
}
const mapStateToProps = state => {
    return {
        collections: state.collections.collections,
    }
}
export default connect(mapStateToProps)(NewMenu)
