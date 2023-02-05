import {Component, React} from 'react';
import {connect} from 'react-redux'
import {Button, Layout, message, Space, Table} from "antd";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import NewAttribute from "../NewAttribute/NewAttribute";
import DeletePop from "../../../components/PopConfirm/PopConfirm";
import * as actionCreators from '../../../store/actions/attributeActions'
import './Attributes.css'
import axios from "axios";
import {Link} from "react-router-dom";
import EditAttribute from "../EditAttribute/EditAttribute";

const {Column} = Table;
const {Content} = Layout;

class Attributes extends Component {
    state = {
        visible: false,
        editVisible: false,
        brandId: null,
        brands: [],
        brandName :"new Name",
    };

    componentDidMount() {
        this.props.dispatch(actionCreators.storeAttributes())
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    editShowDrawer = (id, brand) => {
        this.setState({
            editVisible: true,
            brandId: {id,brand},
            brandName:brand.name,
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
    deleteAttribute=(id)=>{
        axios.delete('attributes/'+id).then(response => {
            this.props.dispatch(actionCreators.deleteAttribute(id))
            message.success('Attribute deleted successfully.');

        }).catch(error => {
            message.error(error + " " + "Error Occurred");


        })
    }
    render() {
        return (
            <Content style={{margin: '16px 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Button className='Button' type="primary" onClick={this.showDrawer}>
                        <PlusOutlined/> New Attribute
                    </Button>
                    <Table dataSource={this.props.attributes}>
                        <Column title="Sr #" dataIndex="key" key="key"/>
                        <Column title="Name" dataIndex="name" key="name"/>
                        <Column title="Created At" dataIndex="createdAt" key="createdAt"/>
                        <Column
                            title="Action"
                            dataIndex="key"
                            key="action"
                            render={(key, brand) => (
                                <Space size="middle">
                                    <Button shape="round" icon={<EditOutlined/>}
                                            onClick={() => this.editShowDrawer(key, brand)} size="medium">
                                        Edit
                                    </Button>
                                    <DeletePop name="Attribute" deleteHandler={()=>{this.deleteAttribute(key)}} />
                                </Space>
                            )}
                        />
                    </Table>
                    <NewAttribute visible={this.state.visible} cancel={this.onClose}/>
                    <EditAttribute brandId={this.state.brandId} name={this.state.brandName} visible={this.state.editVisible} cancel={this.editOnClose}/>
                </div>
            </Content>

        );
    }
}

const mapStateToProps = state => {
    return {
        attributes: state.attributes.attributes
    }

}
export default connect(mapStateToProps)(Attributes);
