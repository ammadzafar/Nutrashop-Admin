import {React, Component} from 'react';
import {Row,Tabs,Card} from "antd";
import Pending from "../PendingOrders/PendingOrder"
import InTransitOrders from "../InTransit Orders/InTransitOrders";
import DeliveredOrders from "../DeliveredOrders/DeliveredOrders";
import CancelledOrders from "../CancelledOrders/CancelledOrders";
import RefundOrders from "../RefundOrder/RefundOrders";
import VerifiedOrders from "../VerifiedOrder/VerifiedOrders";
import "./Order.css"
import {connect} from "react-redux";
const {TabPane}=Tabs
class Orders extends Component {
    constructor(props) {
        super(props);
        this.state={
            auth:[]
        }
    }


    render() {
        console.log(this.props)
        const currentModule = this.props.match.url.slice(1,12)
        console.log(currentModule)
        const wholeModule = this.props.auth.user.role.modules.find(module=>module.slug===currentModule)
        const permission = wholeModule.ModuleRole.permission
        console.log(permission)
        return (
            <Row>
                <Card className='abc' title="Order List" bordered={false} >
                    <>
                        {permission==="read"?<h1>You are Not Autherized</h1>:<Tabs tabPosition='left'>
                            <TabPane tab=" Pending Orders" key="1">
                                <Pending/>
                            </TabPane>
                            <TabPane tab=" Verified Orders" key="2">
                                <VerifiedOrders/>
                            </TabPane>
                            <TabPane tab="In_Transit Orders" key="3">
                                <InTransitOrders/>
                            </TabPane>
                            <TabPane tab=" Delivered Orders" key="4">
                                <DeliveredOrders/>
                            </TabPane>
                            <TabPane tab=" Refund Orders" key="5">
                                <RefundOrders/>
                            </TabPane>
                            <TabPane tab=" Cancelled" key="6">
                                <CancelledOrders/>
                            </TabPane>

                        </Tabs>}
                    </>
                </Card>

            </Row>

        );
    }
}

const mapStateToProps =(state)=>{
    return{
        auth:state.auth.auth
    }
}
export default connect(mapStateToProps) (Orders);
