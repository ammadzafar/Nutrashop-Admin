import {React, Component} from 'react'
import {Button, Input, Layout, message, Select, Space, Table,} from "antd";
import * as actionCreators from "../../../store/actions/OrderActions/orderActions";
import {connect} from "react-redux";
import {CheckOutlined, CloseOutlined, SearchOutlined} from "@ant-design/icons";
import OrderModal from "../../../components/OrderModal/OrderModal";
import * as helpers from "../../../Utils/helpers";
import Highlighter from "react-highlight-words";
import axios from "axios";


const {Column} = Table;
const {Content} = Layout;
const {Option} = Select;

class DeliveredOrders extends Component {

    constructor() {
        super();
        this.state = {
            isVisible:false,
            orderId:null,
            statusId:null,
        }
    }
    isModalVisible=(id,data)=>{
        if(!data.isSeen){
            axios.put('orders/statusUpdate/isSeen/' + id).then(async(success) => {
                await this.props.storeDeliveredOrders()
                await this.props.storeUnreadOrders("res")
                message.success(success.data.message);
            }).catch(error => {
                console.log(error)
            })
        }
        this.props.storeOneDeliveredOrder(id)
        this.setState({
            isVisible:true,
            orderId:id,
        });
    }


    handleCancel=()=>{
        this.setState({
            isVisible:false
        })
    }
    componentDidMount() {
        this.props.storeDeliveredOrders()
    }
    handleChange=(value)=> {
        console.log(value.key);
        this.setState({
            statusId:value.key
        })
    }
    clickHandler=(id,obj)=>{
        let prevStatusId = obj.statusId
        this.props.orderStatusUpdate(id,this.state.statusId,prevStatusId)
    }
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters,
                         }) => (
            <div style={{padding: 8}}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{marginBottom: 8, display: "block"}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{color: filtered ? "#1890ff" : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({searchText: ""});
    };
    render() {
        return (
            <Content style={{margin: '16px 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>

                    <Table dataSource={this.props.deliveredOrders}>
                        <Column title="Order" dataIndex="key" key="id"
                                render={(key, data)=>(<Space size="middle">
                                    <Button shape="round" type={`${data.isSeen?'':'primary'}`} onClick={(e)=>this.isModalVisible(key, data)} size="medium">View Order</Button>
                                </Space>)}
                        />
                        <Column title="Order No" dataIndex="order_no" key="order_no"
                                {...this.getColumnSearchProps("order_no")}/>
                        <Column title="Customer Name" dataIndex="customer_name" key="customer_name"
                                {...this.getColumnSearchProps("customer_name")}/>
                        <Column title="Email" dataIndex="customer_email" key="customer_email"/>
                        <Column title="Actions" dataIndex="key" key="id"
                                render={(key,obj)=>(
                                    <div>
                                        <Space size="middle">
                                            <Select
                                                labelInValue
                                                defaultValue={{ value: '0' }}
                                                style={{ width: 120 }}
                                                onChange={this.handleChange}
                                            >
                                                <Option value="0">Change Status</Option>
                                                <Option value="1">Mark Pending</Option>
                                                <Option value="2">Mark Verified</Option>
                                                <Option value="3">Mark Cancelled</Option>
                                                <Option value="4">Mark Refund</Option>
                                                <Option value="6">Mark InTransit</Option>
                                            </Select>
                                            <Button shape="round" icon={<CheckOutlined/>}
                                                    onClick={(e) => this.clickHandler(key,obj)} size="small">
                                                Save
                                            </Button>
                                        </Space>
                                    </div>

                                )}
                        />
                    </Table>
                    {this.props.deliveredOrder.length !== 0 ?<OrderModal isVisible={this.state.isVisible}
                                 orderId={this.state.orderId}
                                 onCancle={this.handleCancel}
                                 order={this.props.deliveredOrder}
                    />:""}
                </div>
            </Content>
        )
    }
}

const mapStateToProps = state => {
    return {
        deliveredOrders: state.orders.deliveredOrders,
        deliveredOrder:state.orders.deliveredOrder
    }
}
const mapDispatchToProps = dispatch => {
    return {
        storeDeliveredOrders: () => {
            dispatch(actionCreators.storeDeliveredOrders())
        },
        storeUnreadOrders: () => {
            dispatch(actionCreators.changeInOrders())
        },
        storeOneDeliveredOrder:(id)=>{
            dispatch(actionCreators.storeOneDeliveredOrder(id))
        },
        orderStatusUpdate:(id,statusId,prevStatusId)=>{
            dispatch(helpers.orderStatusUpdate(id,statusId,prevStatusId))
        },
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(DeliveredOrders);
