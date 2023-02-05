import {React, useEffect, useState} from 'react';
import {Card, Checkbox, Col, Form, Input, Row, Button, notification} from "antd"
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/moduleActions"
import axios from "axios";
import * as authActions from "../../../store/actions/AuthActions/auth";
import {useHistory} from "react-router-dom"
const NewRole = (props) => {
    const [modules, setModules] = useState([])
    const [loading, setLoading] = useState()
    const history=useHistory()
    useEffect(() => {
        axios.get("modules").then(success => {
            let modules = success.data
            props.dispatch(actionCreators.storeAllModules(modules))
            console.log(modules)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function onChangeRead(e, id) {
        let index = modules.findIndex(module => module.moduleId === id)
        if (index !== -1) {
            let newArray = [...modules]
            newArray[index] = {
                moduleId: id,
                permissionRead: e.target.checked,
                permissionWrite: newArray[index].permissionWrite
            }
            setModules(newArray)
        } else {
            let moduleObject = {
                moduleId: id,
                permissionRead: e.target.checked,
                permissionWrite: false

            }
            setModules(modules => [...modules, moduleObject]);

        }
    }

    function onChangeWrite(e, id) {
        let index = modules.findIndex(module => module.moduleId === id)
        if (index !== -1) {
            let newArray = [...modules]
            newArray[index] = {
                moduleId: id,
                permissionRead: newArray[index].permissionRead,
                permissionWrite: e.target.checked
            }
            setModules(newArray)
        } else {
            let moduleObject = {
                moduleId: id,
                permissionRead: false,
                permissionWrite: e.target.checked

            }
            setModules(modules => [...modules, moduleObject]);

        }
    }

    const onFinish = (values) => {
        if(modules.length ===0)
        {
            notification['error']({
                message: 'Error',
                description:"Please give permission to atleast one module.",
            });
            return
        }
        let role = new FormData();
        role.append('name', values.role)
        role.append('modules',JSON.stringify(modules))
        setLoading(true)
        axios.post('roles', role).then(success => {
            setLoading(false)
            notification['success']({
                message: 'Success',
                description:"Role created successfully.",
            });
            history.push('/roles');
        }).catch(error => {
            console.log(error)

            setLoading(false)
            //
            notification['error']({
                message: 'Error',
                description:
                error.response.data.message,
            });
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
            <div>
                <Row className="row">
                    <Col offset={4} span={16}>
                        <Card title="Create Role " className="cardHeight" bordered={false}>
                            <>
                                <Form
                                    name="basic"

                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item
                                        label="Role Name"
                                        name="role"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input role name!',
                                            },
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item >
                                        <Button loading={loading} type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </>
                        </Card>
                    </Col>
                </Row>
                <div className=" row">
                    <Row>
                        <Col offset={4} span={16}>
                            <Card title="Modules" bordered={false}>
                                <Row>
                                    {props.modules.map(module => (
                                        <>
                                            <Col span={8}>
                                                {module.name}
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox onChange={(e) => onChangeRead(e, module.id)}>Read</Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox onChange={(e) => onChangeWrite(e, module.id)}>Write</Checkbox>
                                            </Col>
                                        </>
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>


    );

}
const mapStateToProps = state => {
    return {
        modules: state.modules.modules
    }
}

export default connect(mapStateToProps)(NewRole);
