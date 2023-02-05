import React, {useEffect, useState} from 'react';
import {Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, notification, Space} from 'antd';
import axios from "axios";
import {useHistory} from "react-router-dom";
import * as actionCreators from "../../../store/actions/userActions"
import Uploader from "../../../components/ImageUploader/Uploader";
import {storeUsers} from "../../../store/actions/userActions";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 8,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 6,
        },
        sm: {
            span: 8,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const EditUser = (props) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState("")
    const [roleId , setRoleId] = useState("")
    const [allRoles,setAllRoles]=useState([])
    const [firstName ,setFirstName] =useState("")
    const [lastName ,setLastName] =useState("")
    const [email ,setEmail] =useState("")
    const [password ,setPassword] =useState("")
    const roleHandler=(event)=>{
        setRoleId(event)
        console.log(event)
    }

    const id = props.match.params.id

    useEffect(()=>{
        axios.get("users/"+id).then(
            success=>{
                let userData = success.data
                form.setFieldsValue(userData)
                setRoleId(userData.roleId)
            }
        ).catch(err=>{
            console.log(err)
        })
    },[])
    useEffect(()=>{
        axios.get("roles/").then(response=>{
            console.log(response)
            const results = response.data.map((row)=>({
                value:row.id,
                label:row.name
            }))
            setAllRoles(results)
        }).catch(error=>{
            console.log(error)
        })
    },[])
    const history=useHistory()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        let user = new FormData();
        user.append("firstName",values.firstName)
        user.append("lastName",values.lastName)
        user.append("email",values.email)
        user.append("roleId",roleId)
        // user.append("image",file)
        user.append("password",password)
        user.append("confirmPassword",values.confirmPassword)
        setLoading(true)
        axios.put("users/"+id,user).then(success=>{
            console.log(success)
            setLoading(false)
            notification['success']({
                message: 'Success',
                description:"User created successfully.",
            });
            history.push('/users');
        }).catch(error=>{
            console.log(error)
            setLoading(false)
            notification['error']({
                message: 'Error',
                description:error.response.data.message,
            });
        })

    };
    const saveImage =(image)=>{
        console.log(image)
        setFile(image)
        console.log(file)
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            {...formItemLayout}
            name="register"
            onFinish={onFinish}
            form={form}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
        >
            <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your First Name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input placeholder="First Name"/>
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Last  Name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input placeholder="Last Name"/>
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input placeholder="enter Email"/>
            </Form.Item>

            <Form.Item

                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                label="Password"
                tooltip="password must be of 8 letters at least"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password onChange={(e) => {setPassword(e.target.value)}}
                                placeholder="password must be of 8 letters at least"/>
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                tooltip="password must be of 8 letters at least"
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || password === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="password must be of 8 letters at least"/>
            </Form.Item>
            <Form.Item label="Roles"
            >
                <Space
                    direction="vertical"
                    style={{
                        width: '50%',
                    }}
                >
                    <Select
                        showSearch
                        value={roleId}
                        options={allRoles}
                        onChange={e=>roleHandler(e)}
                        filterOption={(input, option) =>
                            option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    />
                </Space>
            </Form.Item>
            {/*<Form.Item*/}
            {/*    name="file"*/}
            {/*    label="Upload Image"*/}
            {/*>*/}
            {/*    <Uploader saveImage={saveImage}/>*/}
            {/*</Form.Item>*/}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" loading={loading} htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditUser;
