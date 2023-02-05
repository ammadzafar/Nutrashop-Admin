import {React, Component} from 'react'
import {Drawer, Button, Spin, Col, Row, Input, message} from 'antd';
import axios from "axios";
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/collectionActions";
import Form from './Form'
import MediaQuery from 'react-responsive';
const {TextArea} = Input

class EditCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            name: '',
            logo: '',
            loading: false,
            description: '',
            collections:""
        };
    }
    triggerChildAlert(){
        this.refs.child.showAlert();
    }
    getCollections(){
        this.props.dispatch(actionCreators.storeCollections())
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
            if (this.props.collectionId) {
                if (!this.props.collection || (this.props.collection && this.props.collectionId !== this.props.collection.id)) {
                    axios.get('collections/' + this.props.collectionId)
                        .then(response => {
                            this.setState({
                                name: response.data.name,
                                description: response.data.description
                            })
                            this.props.dispatch(actionCreators.editCollection(response.data))
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

        if (this.props.collection) {
            brand = (<>

            <MediaQuery minWidth={1224}>
                <Drawer
                    title="Edit Collection"
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
                          getCollections={this.getCollections.bind(this)}
                          cancelDrawer={this.props.cancel}
                          setloader={this.setLoaderState.bind(this)}
                          collectionId={this.props.collection.id}
                          collection={this.props.collection}
                          collections={this.props.collections}
                          pids={this.props.parentIds}

                    />

                </Drawer>
            </MediaQuery>



            <MediaQuery maxWidth={1224}>
                <Drawer
                    title="Edit Collection"
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
                          getCollections={this.getCollections.bind(this)}
                          cancelDrawer={this.props.cancel}
                          setloader={this.setLoaderState.bind(this)}
                          collectionId={this.props.collection.id}
                          collection={this.props.collection}
                          collections={this.props.collections}
                    />

                </Drawer>
            </MediaQuery>
            </>)
        }
        return brand
    }
}

const mapStateToProps = state => {
    return {
        collection: state.collections.collection,
        collections:state.collections.collections,
        parentIds:state.collections.parentIds,
    }

}
export default connect(mapStateToProps)(EditCollection)
