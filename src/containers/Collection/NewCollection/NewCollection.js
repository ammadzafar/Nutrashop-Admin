import {React, Component} from 'react'
import {Drawer, Form, Button, Col, Row, Input, message, Radio, Space, Select, Switch} from 'antd';
import Uploader from "../../../components/ImageUploader/Uploader";
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/collectionActions";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import MediaQuery from 'react-responsive'
import ReactHtmlParser from 'react-html-parser';

const {TextArea} =Input


class NewCollection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible,
            name: '',
            collectionIds:[],
            description:'',
            logo: '',
            loading:false,
            isPopular:false,
            collectionOptions:[]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.setCollection = this.setCollection.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
            const collectionsArray = []
            for (let i = 0; i < this.props.collections.length; i++) {
                let value = this.props.collections[i].key
                collectionsArray.push({
                    label: this.props.collections[i].name,
                    value,
                });

            }
            this.setState({collectionOptions: collectionsArray});

        }
    }
    saveImage =(image) =>{
        this.setState({
            logo:image
        })
    }
    setCollection=(value)=>{
        this.setState({collectionIds:value})
    }
    postCollectionHandler=()=>{
       let collection = new FormData();
        collection.append('file',this.state.logo)
        collection.append('name',this.state.name)
        collection.append('description',this.state.description)
        collection.append('collectionIds',this.state.collectionIds)
        collection.append('isPopular', this.state.isPopular)
       this.setState({
           loading:true
       })
       axios.post('collections',collection, {
           headers: {
               'Content-Type': 'multipart/form-data'
           }
       }).then(response=>{
           const result ={
               key: response.data.newCollection.id, // I added this line
               name: ReactHtmlParser(response.data.newCollection.name),
               createdAt: (
                   <ReactTimeAgo
                       date={new Date(response.data.newCollection.createdAt)}
                       locale="en-US"
                   />
               ),
               image: response.data.newCollection.image
           }

           this.props.dispatch(actionCreators.saveCollection(result))
           this.setState({
               loading:false
           })
           message.success('Collection added successfully.');
           this.props.cancel()

       }).catch(error=>{
           // let errors=error.response.data;
           this.setState({
               loading:false
           })
           message.error("An error occur while creating Collection"+error)
           // if(errors.errors[0].param=='name'){
           //     message.error(errors.errors[0].msg);
           //
           // }

       })

   }
    onChange=(value)=>{
        this.setState({
            isPopular:value
        })
    }
    render() {
        var collectionIds=this.state.collectionIds
        var collectionOptions=this.state.collectionOptions
        const selectProps = {
            style: {
                width: '100%',
            },
            mode: 'multiple',
            collectionIds,
            options: collectionOptions,

            placeholder: 'Select Child  Collection...',
            maxTagCount: 'responsive',
        };
        return (
            <>
                <MediaQuery minWidth={750}>
                    <Drawer
                    title="Create a new Collection"
                    width={720}
                    onClose={this.props.cancel}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.props.cancel} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button onClick={this.postCollectionHandler} loading={this.state.loading}  type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                        <Form layout="vertical" >

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{required: true, message: 'Please enter collection name'}]}
                                >
                                    <Input value={this.state.name}
                                           name="name"
                                           onChange={this.handleInputChange} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[{ message: 'Please enter brand description'}]}
                                >
                                    <TextArea onChange={this.handleInputChange} value={this.state.description} name="description" rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Child Collection">
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
                                            onChange={(value)=>this.setCollection(value)}
                                            {...selectProps}
                                        />
                                    </Space>
                                </Form.Item>
                                <Form.Item
                                    label="Popular"
                                >
                                    <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined/>}  onChange={(e)=>this.onChange(e)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Uploader saveImage={this.saveImage}/>
                        </Form>

                    </Drawer>
                </MediaQuery>

                <MediaQuery maxWidth={750}>
                    <Drawer
                    title="Create a new Collection"
                    width={350}
                    onClose={this.props.cancel}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.props.cancel} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button onClick={this.postCollectionHandler} loading={this.state.loading}  type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                        <Form layout="vertical" >

                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{required: true, message: 'Please enter collection name'}]}
                                >
                                    <Input value={this.state.name}
                                           name="name"
                                           onChange={this.handleInputChange} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="Description"
                                    rules={[{ message: 'Please enter brand description'}]}
                                >
                                    <TextArea onChange={this.handleInputChange} value={this.state.description} name="description" rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Child Collection">
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
                                            onChange={(value)=>this.setCollection(value)}
                                            {...selectProps}
                                        />
                                    </Space>
                                </Form.Item>
                                <Form.Item
                                    label="Popular"
                                >
                                    <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined/>}  onChange={(e)=>this.onChange(e)} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Radio.Group  defaultValue={1}>
                                    <Radio value={1}>Published</Radio>
                                    <Radio value={2}>Hidden</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Uploader saveImage={this.saveImage}/>
                        </Form>

                    </Drawer>
                </MediaQuery>

    </>
        );
    }
}
const mapStateToProps = state => {
    return {
        collections: state.collections.collections,

    }

}
export default connect(mapStateToProps)(NewCollection)
