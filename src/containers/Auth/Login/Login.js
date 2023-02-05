import {Form, Input, Button, Checkbox} from 'antd';
import {React,useEffect,useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {notification, Space} from 'antd';
import { useSelector, useDispatch} from "react-redux";
import './Login.css'
import axios from "axios";
import * as authActions from '../../../store/actions/AuthActions/auth'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login = (props) => {
    const history = useHistory()
    const {isAuthenticated} = useSelector(({auth}) => auth);
    const dispatch = useDispatch()
    const [loading,setLoading]=useState()
    useEffect(()=>{
        isAuthenticated && history.push('/dashboard')
    })
    const onFinish = (values) => {
        setLoading(true)
        axios.post('auth/signin', values).then(success => {
            setLoading(false)
            dispatch(authActions.saveLoginData(success.data))
            history.push('/dashboard');
        }).catch(error => {
            setLoading(false)

            notification['error']({
                message: 'Login Failed',
                description:
                error.response.data.message,
            });
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button loading={loading} type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
