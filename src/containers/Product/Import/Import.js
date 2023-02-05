import {React, Component} from 'react'
import {Drawer, Form, Button, message, Upload} from 'antd';
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/productActions";

import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import {UploadOutlined} from "@ant-design/icons";

class Import extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            fileList: '',
            uploading: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
        }
    }

    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();

            formData.append('file', fileList[0]);

        this.setState({
            uploading: true,
        });
        axios.post(
            'products/import',
            formData
        ).then(response => {
            this.props.dispatch(actionCreators.storeProducts())
            message.success(response.message)
            this.setState({
                uploading: false,
            });
            this.props.cancel()
        }).catch(error => {
            message.error(error.message)
            this.setState({
                uploading: false,
            });

        })
        // You can use any AJAX library you like
    };

    render() {
        const {uploading, fileList} = this.state;
        const props = {
            maxCount:1,
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
        return (
            <>
                <Form layout="vertical">
                    <Drawer
                        title="Import"
                        width={720}
                        onClose={this.props.cancel}
                        visible={this.state.visible}
                        bodyStyle={{paddingBottom: 80}}

                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined/>}>Select File</Button>
                        </Upload>
                        <Button
                            type="primary"
                            onClick={this.handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{marginTop: 16}}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </Drawer>
                </Form>
            </>
        );
    }
}

export default connect()(Import)
