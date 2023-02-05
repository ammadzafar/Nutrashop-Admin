import {Component, React} from 'react';
import {Button, Card, Col, Layout, message, Row, Space, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom'
import * as actionCreators from "../../../store/actions/roleActions";
import axios from "axios";
import {connect} from "react-redux";
import DeletePop from "../../../components/PopConfirm/PopConfirm";

const {Content} = Layout;
const {Column} = Table;


class Roles extends Component {
    state = {
        roles: [],
        auth:[],
    };

    componentDidMount() {

        this.props.dispatch(actionCreators.storeRoles())

    }

    deleteRoles = (id) => {
        axios.delete('roles/' + id).then(response => {
            this.props.dispatch(actionCreators.deleteRole(id))
            message.success('Role deleted successfully.');

        }).catch(error => {
            message.error('can not delete the Role')
        })
    }


    render() {
        const currentModule = this.props.match.url.slice(1,12)
        console.log(currentModule)
        const wholeModule = this.props.auth.user.role.modules.find(module=>module.slug===currentModule)
        const permission = wholeModule.ModuleRole.permission
        console.log(permission)
        return (
            <Content style={{margin: '16px 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {permission==="read"?"":
                        <Link to="role/create">
                        <Button className='Button' type="primary">
                            <PlusOutlined/> New Role{console.log(this.props.roles)}
                        </Button>
                    </Link>}
                    <Table dataSource={this.props.roles}>
                        <Column title="Sr #" dataIndex="key" key="key"/>
                        <Column title="Name" dataIndex="name" key="name"/>
                    </Table>
                </div>
            </Content>

        );

    }
}

const mapStateToProps = state => {
    return {
        roles: state.roles.roles,
        auth:state.auth.auth
    }

}

export default connect(mapStateToProps)(Roles);
