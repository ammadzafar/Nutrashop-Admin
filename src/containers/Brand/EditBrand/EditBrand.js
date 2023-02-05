import {React, Component} from 'react'
import {Drawer, Button, Spin, Col, Row, Input, message} from 'antd';
import axios from "axios";
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/brandActions";
import Form from './Form'
import MediaQuery from 'react-responsive'

const {TextArea} = Input

class EditBrand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            name: '',
            logo: '',
            loading: false,
            description: '',
        };
    }
    triggerChildAlert(){
        this.refs.child.showAlert();
    }
    getBrands(){
        this.props.dispatch(actionCreators.storeBrands())
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
            if (this.props.brandId) {
                if (!this.props.brand || (this.props.brand && this.props.brandId !== this.props.brand.id)) {
                    axios.get('brands/' + this.props.brandId)
                        .then(response => {
                            this.setState({
                                name: response.data.name,
                                description: response.data.description
                            })
                            this.props.dispatch(actionCreators.editBrand(response.data))

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
        let brand = ""

        if (this.props.brand) {
            brand = (<>

            <MediaQuery minWidth={1224}>
                <Drawer
                    title="Edit Brand"
                    width={720}
                    onClose={this.props.cancel}
                    visible={this.state.visible}
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
                          getBrands={this.getBrands.bind(this)}
                          cancelDrawer={this.props.cancel}
                          setloader={this.setLoaderState.bind(this)}
                          brandId={this.props.brand.id}
                          brand={this.props.brand} />

                </Drawer>
                </MediaQuery>

                <MediaQuery maxWidth={1224}>
                <Drawer
                    title="Edit Brand"
                    width={350}
                    onClose={this.props.cancel}
                    visible={this.state.visible}
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
                          getBrands={this.getBrands.bind(this)}
                          cancelDrawer={this.props.cancel}
                          setloader={this.setLoaderState.bind(this)}
                          brandId={this.props.brand.id}
                          brand={this.props.brand} />

                </Drawer>
                </MediaQuery>
            </>)
        }
        return brand
    }
}

const mapStateToProps = state => {
    return {
        brand: state.brands.brand,
    }

}
export default connect(mapStateToProps)(EditBrand)
