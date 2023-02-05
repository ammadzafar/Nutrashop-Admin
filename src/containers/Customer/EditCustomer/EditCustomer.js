import {React, Component} from 'react'
import {Drawer, Button, Spin, Col, Row, Input, message} from 'antd';
import axios from "axios";
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/customerActions"
import Form from './Form'
import MediaQuery from 'react-responsive'

const {TextArea} = Input

class EditCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:this.props.visible,
            loading:false,
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
        };
    }
    triggerChildAlert(){
        this.refs.child.showAlert();
    }
    getCustomers(){
        this.props.dispatch(actionCreators.storeCustomers())
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
            if (this.props.customerId) {
                if (!this.props.customer || (this.props.customer && this.props.customerId !== this.props.customer.id)) {
                    axios.get('customer/' + this.props.customerId)
                        .then(response => {
                            this.setState({
                                firstName: response.data.firstName,
                                lastName: response.data.lastName,
                                email:response.data.email,
                                phone:response.data.phone
                            })
                            this.props.dispatch(actionCreators.editCustomer(response.data))

                        })
                }
            }
        }

    }
    setLoaderState(){
        this.setState(
            {loading:!this.state.loading})
    }

    render() {
        let customer = ""

        if (this.props.customer) {
            customer = (<>
                <MediaQuery minWidth={1224}>

                <Drawer
                    title="Edit customer"
                    width={720}
                    onClose={this.props.cancel}
                    visible={this.props.visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.props.cancel} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button type="primary" loading={this.state.loading} onClick={this.triggerChildAlert.bind(this)}>
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form ref="child"
                          getCustomers={this.getCustomers.bind(this)}
                          cancelDrawer={this.props.cancel}
                          setloader={this.setLoaderState.bind(this)}
                          customerId={this.props.customer.id}
                          customer={this.props.customer} />

                </Drawer>
                </MediaQuery>

                <MediaQuery maxWidth={1224}>

                <Drawer
                    title="Edit customer"
                    width={350}
                    onClose={this.props.cancel}
                    visible={this.props.visible}
                    bodyStyle={{paddingBottom: 80}}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.props.cancel} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button type="primary" loading={this.state.loading} onClick={this.triggerChildAlert.bind(this)}>
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <Form ref="child"
                          getCustomers={this.getCustomers.bind(this)}
                          cancelDrawer={this.props.cancel}
                          setloader={this.setLoaderState.bind(this)}
                          customerId={this.props.customer.id}
                          customer={this.props.customer} />

                </Drawer>
                </MediaQuery>
            </>)
        }
        return customer
    }
}

const mapStateToProps = state => {
    return {
        customer: state.customers.customer,
    }

}
export default connect(mapStateToProps)(EditCustomer)
