import {React, Component} from 'react';
import {connect} from 'react-redux'
import {Layout, Space,Button, Table, Popconfirm, message} from "antd";
import * as actionCreators from '../../store/actions/customerActions'
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import NewCustomer from "./NewCustomer/NewCustomer";
import axios from "axios";
import {EditOutlined} from "@ant-design/icons";
import EditCustomer from "./EditCustomer/EditCustomer";
import DeletePop from "../../components/PopConfirm/PopConfirm";
import MediaQuery from 'react-responsive'

const {Column} = Table;
const {Content} = Layout;

class Customer extends Component {

    state = {
        customers:[],
        visible:false,
        customerId:false,
        editVisible:false,
        auth:[],
    }
    showDrawer = () =>{
        this.setState({
            visible:true,
        })
    }
    editShowDrawer=(id)=>{
       this.setState({
           editVisible:true,
           customerId:id,
       })
    }
     closeEdit = ()=>{
        this.setState({
            editVisible:false
        })
    }
    onClose = () =>{
        this.setState({
            visible: false,
        })
    }

    componentDidMount() {
        this.props.dispatch(actionCreators.storeCustomers())
    }
    deleteCustomer= (id) => {
        axios.delete('customer/' + id).then(response => {
            this.props.dispatch(actionCreators.deleteCustomer(id))
            message.success('customer is deleted successfully.');

        }).catch(error => {
            message.error('Something went wrong')
        })
    }
    render() {
        const currentModule = this.props.match.url.slice(1,12)
        console.log(currentModule)
        const wholeModule = this.props.auth.user.role.modules.find(xx=>xx.slug===currentModule)
        const permission = wholeModule.ModuleRole.permission
        console.log(permission)
        return (
            <Content style={{margin: '16px 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {permission==='read'?"":<Button className='Button' type="primary" onClick={this.showDrawer}>
                        <PlusOutlined/> New Customer
                    </Button>}
                    <Table dataSource={this.props.customers}>
                        <Column className="Responsive-1224" title="Sr #" dataIndex="key" key="key"/>
                        <Column title="First Name" dataIndex="firstName" key="firstName"/>
                        <Column className="Responsive-1224" title="Last Name" dataIndex="lastName" key="lastName"/>
                        <Column className="Responsive-1224" title="Phone" dataIndex="phone" key="phone"/>
                        <Column className="Responsive-1224" title="Email" dataIndex="email" key="email"/>
                        {permission==="read"?"":<Column title="Action" dataIndex="key" key="action"
                                 render={(key) => (
                                     <Space size="middle">

                                         <MediaQuery minWidth={1224}>
                                         <Button shape="round" icon={<EditOutlined/>}
                                                 onClick={() => this.editShowDrawer(key)} size="small">
                                             Edit
                                         </Button>
                                         </MediaQuery>

                                         <MediaQuery maxWidth={1224}>
                                         <Button shape="round" icon={<EditOutlined/>}
                                                 onClick={() => this.editShowDrawer(key)} size="medium">

                                         </Button>
                                         </MediaQuery>

                                         <DeletePop name="Customer" deleteHandler={() => {
                                             this.deleteCustomer(key)
                                         }}/>
                                     </Space>
                                 )}
                        />}
                    </Table>
                    <NewCustomer visible={this.state.visible} cancel={this.onClose}/>
                    <EditCustomer visible={this.state.editVisible} customerId={this.state.customerId} cancel={this.closeEdit}/>
                </div>
            </Content>
        );
    }
}
const mapStateToProps = state => {
    return{
        customers: state.customers.customers,
        auth:state.auth.auth
    }

}

export default connect(mapStateToProps)(Customer);
