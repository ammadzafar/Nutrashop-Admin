import React,{ Component} from 'react';
import {connect} from 'react-redux'
import {Layout, Space, Table, Popconfirm, message} from "antd";
import {Button} from "antd";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeletePop from "../../../components/PopConfirm/PopConfirm"
import NewMenus from "../../Menu/NewMenu/NewMenu"
import EditMenus from "../../Menu/EditMenus/EditMenus"

import './Menus.css'
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import axios from "axios";
import * as actionCreators from "../../../store/actions/menuActions";
import MediaQuery from 'react-responsive'

const {Column} = Table;
const {Content} = Layout;

class Menus extends Component {
    state = {
        visible: false,
        editVisible: false,
        menuId: '',
        Menus: [],
        auth:[],
    };

    componentDidMount() {
        this.props.dispatch(actionCreators.storeMenus())
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    editShowDrawer = (id) => {
        this.setState({
            editVisible: true,
            menuId: id
        });

    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    editOnClose = () => {
        this.setState({
            editVisible: false,
        });
    };
    deleteMenu=(id)=>{
        axios.delete('menus/'+id).then(response => {
            this.props.dispatch(actionCreators.deleteMenu(id))
            message.success('Menu deleted successfully.');

        }).catch(error => {
            let errors=error.response.data;
            message.error(errors.errors[0].msg);


        })
    }
    render() {
        const currentModule = this.props.match.url.slice(1,9)
        const wholeModule = this.props.auth.user.role.modules.find(xx=>xx.slug===currentModule)
        const permission = wholeModule.ModuleRole.permission
        return (
            <Content style={{margin: '16px 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {permission==="read"?" ":<Button className='Button' type="primary" onClick={this.showDrawer}>
                        <PlusOutlined/> New Menu
                    </Button>}
                    <Table dataSource={this.props.menus}>
                         
                        <Column className="Responsive-1224" title="Sr #" dataIndex="key" key="key"/>

                        <Column title="Name" dataIndex="name" key="name"/>
                        <Column className="Responsive-1224" title="Menu Collection" dataIndex="menuCollection" key="menuCollection"/>
                        <Column className="Responsive-1224" title="Created At" dataIndex="createdAt" key="createdAt"/>
                        {permission==="read"?" ":<Column
                            title="Action"
                            dataIndex="key"
                            key="action"
                            render={(key) => (
                                <Space size="middle">
                                    <MediaQuery minWidth={1224}>
                                    <Button shape="round" icon={<EditOutlined/>}
                                            onClick={() => this.editShowDrawer(key)} size="medium">
                                        Edit
                                    </Button>
                                    </MediaQuery>

                                    <MediaQuery maxWidth={1224}>
                                    <Button shape="round" icon={<EditOutlined/>}
                                            onClick={() => this.editShowDrawer(key)} size="medium">
                                        
                                    </Button>
                                    </MediaQuery>
                                    
                                    <DeletePop name="Menus" deleteHandler={() => {
                                        this.deleteMenu(key)
                                    }}/>
                                </Space>
                            )}
                        />}
                    </Table>
                        <NewMenus visible={this.state.visible} cancel={this.onClose}/>
                    <EditMenus visible={this.state.editVisible} menuId={this.state.menuId} cancel={this.editOnClose}/>

                </div>
            </Content>

        );
    }
}

const mapStateToProps = state => {
    return {
        menus: state.menus.menus,
        auth:state.auth.auth
    }

}
export default connect(mapStateToProps)(Menus);
