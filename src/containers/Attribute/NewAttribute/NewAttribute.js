import {React, Component} from 'react'
import {Drawer, Form, Button, Col, Row, Input, message} from 'antd';
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/attributeActions";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import {Tag, Tooltip} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

class NewAttribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            logo: '',
            loading: false,
            tags: [],
            inputVisible: false,
            inputValue: '',
            editInputIndex: -1,
            editInputValue: '',
        };

        this.handleInputsChange = this.handleInputsChange.bind(this);
    }

    handleInputsChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({tags});
    };

    showInput = () => {
        this.setState({inputVisible: true}, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({inputValue: e.target.value});
    };

    handleInputConfirm = () => {
        const {inputValue} = this.state;
        let {tags} = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    handleEditInputChange = e => {
        this.setState({editInputValue: e.target.value});
    };

    handleEditInputConfirm = () => {
        this.setState(({tags, editInputIndex, editInputValue}) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };

    saveInputRef = input => {
        this.input = input;
    };

    saveEditInputRef = input => {
        this.editInput = input;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
        }
    }

    postBrandHandler = () => {
        let attribute = new FormData();
        attribute.append('name', this.state.name)
        attribute.append('values', this.state.tags)
        this.setState({
            loading: true
        })
        axios.post('attributes', attribute).then(response => {
            console.log(response)
            const result = {
                key: response.data.data.attribute.id, // I added this line
                name: response.data.data.attribute.name,
                values: response.data.data.attribute.values,
                createdAt: <ReactTimeAgo date={new Date(response.data.data.attribute.createdAt)} locale="en-US"/>,
            }
            this.props.dispatch(actionCreators.saveAttribute(result))
            this.setState({
                loading: false
            })
            message.success('Attribute added successfully.');
            this.props.cancel()

        }).catch(error => {
            this.setState({
                loading: false
            })
            message.error(error + "Error Occurred")
        })

    }

    render() {
        const {tags, inputVisible, inputValue, editInputIndex, editInputValue} = this.state;
        return (
            <>
                <Form layout="vertical">
                    <Drawer
                        title="Create a new Attribute"
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
                                <Button onClick={this.postBrandHandler} loading={this.state.loading} type="primary">
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
                                    rules={[{required: true, message: 'Please enter attribute name'}]}
                                >
                                    <Input value={this.state.name}
                                           name="name"
                                           onChange={this.handleInputsChange}/>
                                </Form.Item>
                            </Col>
                        </Row>{console.log(tags)}
                        {tags.map((tag, index) => {
                            if (editInputIndex === index) {
                                return (
                                    <Input
                                        ref={this.saveEditInputRef}
                                        key={tag}
                                        size="default"
                                        className="tag-input"
                                        value={editInputValue}
                                        onChange={this.handleEditInputChange}
                                        onBlur={this.handleEditInputConfirm}
                                        onPressEnter={this.handleEditInputConfirm}
                                    />
                                );
                            }

                            const isLongTag = tag.length > 20;

                            const tagElem = (
                                <Tag
                                    className="edit-tag"
                                    key={tag}
                                    closable={index !== 0}
                                    onClose={() => this.handleClose(tag)}
                                >
              <span
                  onDoubleClick={e => {
                      if (index !== 0) {
                          this.setState({editInputIndex: index, editInputValue: tag}, () => {
                              this.editInput.focus();
                          });
                          e.preventDefault();
                      }
                  }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
                                </Tag>
                            );
                            return isLongTag ? (
                                <Tooltip title={tag} key={tag}>
                                    {tagElem}
                                </Tooltip>
                            ) : (
                                tagElem
                            );
                        })}
                        {inputVisible && (
                            <Input
                                ref={this.saveInputRef}
                                type="text"
                                size="default"
                                className="tag-input"
                                value={inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                            />
                        )}
                        {!inputVisible && (
                            <Tag className="site-tag-plus" onClick={this.showInput}>
                                <PlusOutlined/> Add Values
                            </Tag>
                        )}
                    </Drawer>
                </Form>

            </>
        );
    }
}

export default connect()(NewAttribute)
