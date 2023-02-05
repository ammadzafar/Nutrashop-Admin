import {React, useState, useEffect} from "react";
import {
    Button, Form,
    Input,
    Layout,
    message, Modal,
    Space,
    Switch,
    Table,
    Upload,
} from "antd";

import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
    UploadOutlined,
} from "@ant-design/icons";

// import Import from "../Import/Import";
import {Link} from "react-router-dom";
import * as actionCreators from "../../store/actions/productActions";
import axios from "axios";
import {connect} from "react-redux";
import MediaQuery from "react-responsive";
import DeletePop from "../../components/PopConfirm/PopConfirm";
import {useSelector, useDispatch} from "react-redux";
import ReactTimeAgo from "react-time-ago";
import {dispatchKey} from "codemirror/src/edit/key_events";
import {editQuestion,storeQuestions} from "../../store/actions/questionActions";

const {Content} = Layout;
const {Column} = Table;
const {TextArea} = Input
function Question(props) {
    const dispatch = useDispatch()
    const {auth} = useSelector(({auth}) => auth);
    const {questions} = useSelector(({questions}) => questions);
    const [data, setData] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUserId, setCurrentUserId] = useState('')
    const [loading, setLoading] = useState(false)

    const showModal = (key) => {
        alert(key)
        setIsModalVisible(true);
        setCurrentUserId(key)
    };
    console.log(questions)
    const onFinish = (values) => {
        console.log('Success:', values);
        values.userId = auth.id
        setLoading(true)
        axios.put("/answer/"+currentUserId,values).then(success=>{
            values.notificationId = currentUserId
            console.log(success)
            // dispatch(editQuestion(values))
            message.success("Answer Added")
            setLoading(false)
            setIsModalVisible(false)
        }).catch(err=>{
            console.log(err)
            message.error("error")
            setLoading(false)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        dispatch(storeQuestions())
    }, [])


    const modal =
        <Modal title="Submit Your Answer" visible={isModalVisible} footer=""  onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Answer"
                    name="answer"
                    rules={[
                        {
                            required: true,
                            message: 'Please input The Answer!',
                        },
                    ]}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>

    const onChange=(value,collectionObject)=>{
        let collection=new FormData()
        collection.append('visibility',value)
        collection.append("userId",auth.id)
        setLoading(true)
        axios.put('/answer/allowed/'+collectionObject.key, collection).then(response=>{
            message.success(`Answer Successfully Updated as ${value}`)
            setLoading(false)
        }).catch(error=>{
            message.error('Error')
            setLoading(false)

        })

    }
    const currentModule = props.match.url.slice(1, 9);
    console.log(currentModule);
    const wholeModule = auth.user.role.modules.find(
        (xx) => xx.slug === currentModule
    );
    const permission = wholeModule.ModuleRole.permission;
    console.log(permission);

    return <Content style={{margin: "16px 16px"}}>
        <div
            className="site-layout-background"
            style={{padding: 24, minHeight: 360}}
        >
            <Table dataSource={questions}>
                <Column
                    className="Responsive-1224"
                    title="Sr #"
                    dataIndex="key"
                    key="key"
                />
                <Column title="Customer Name" dataIndex="name" key="name"/>
                <Column title="Product Name" dataIndex="productName" key="productName"/>
                <Column title="Question" dataIndex="question" key="question"/>
                <Column title="AnswerCreated" dataIndex="answerCreatedAt" key="answerCreatedAt"/>
                <Column title="User Name" dataIndex="userName" key="userName"/>
                <Column title="Answer" dataIndex="answer" key="answer"/>
                {permission === "read" ? (
                    ""
                ) : (
                    <>
                        <Column
                            className="Responsive-1224"
                            title="Created At"
                            dataIndex="createdAt"
                            key="createdAt"
                        />
                        <Column
                            title="visibility"
                            className="Responsive-1224"
                            dataIndex="visibility"
                            key="visibility"
                            render={(dataIndex, collection) => (
                                <Space size="middle">
                                    <Switch loading={loading}
                                        defaultChecked={dataIndex ?? true}
                                            checkedChildren={<CheckOutlined/>}
                                            unCheckedChildren={<CloseOutlined/>}
                                            onChange={(e) => onChange(e, collection)}/>

                                </Space>
                            )}
                        />
                        <Column
                            title="Action"
                            dataIndex="key"
                            key="action"
                            render={(key) => (
                                <Space size="middle">

                                    <MediaQuery minWidth={1224}>
                                        <Button
                                            shape="round"
                                            icon={<EditOutlined/>}
                                            onClick={()=>showModal(key)}
                                            size="small"
                                        >
                                            Add Answer
                                        </Button>
                                        {modal}
                                    </MediaQuery>

                                    <MediaQuery maxWidth={1224}>
                                        <Button
                                            shape="round"
                                            icon={<EditOutlined/>}
                                            onClick={()=>showModal(key)}
                                            size="small"
                                        >
                                            Add Answer
                                        </Button>
                                        {modal}
                                    </MediaQuery>

                                </Space>
                            )}
                        />
                    </>
                )}
            </Table>
        </div>
    </Content>;

}

export default Question;
