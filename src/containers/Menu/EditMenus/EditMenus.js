import {React, Component} from 'react'
import {Drawer, Button, Spin, Col, Row, Input, message} from 'antd';
import axios from "axios";
import {connect} from 'react-redux'
import * as actionCreators from "../../../store/actions/menuActions";
import Form from './Form'
import MediaQuery from 'react-responsive';

class EditMenus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            name: '',
            logo: '',
            loading: false,
            description: '',
            newId:this.props.menuId
        };
    }

    triggerChildAlert(){
        this.refs.child.showAlert();
    }
    getMenus(){
        this.props.dispatch(actionCreators.storeMenus())
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
            if (this.props.menuId) {
                    axios.get('menus/' + this.props.menuId)
                        .then(response => {
                            this.setState({
                                name: response.data.name,

                            })
                            this.props.dispatch(actionCreators.editMenu(response.data))

                        })

            }
        }

    }
    setLoaderState(){
        this.setState(
            {loading:!this.state.loading})
    }

    render() {
        let menu = ""
        // let collectionMenuId = this.props.menu !== null ? this.props.menu.Collection.id :[0]
        if (this.props.menu) {
            menu = (<>

            {/* For Big Screen  */}

            <MediaQuery minWidth={1224}>
                <Drawer
                    title="Edit Menu"
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
                          getMenus={this.getMenus.bind(this)}
                          cancelDrawer={this.props.cancel}
                          setloader={this.setLoaderState.bind(this)}
                          menuId={this.props.menu.id}
                          menu={this.props.menu}
                          collections={this.props.collections}
                          menuCollections={this.props.menuCollections}
                          // menuCollection={[collectionMenuId]}
                    />

                </Drawer>
            </MediaQuery>

            <MediaQuery maxWidth={1224}>
                <Drawer
                    title="Edit Menu"
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
                          getMenus={this.getMenus.bind(this)}
                          cancelDrawer={this.props.cancel}
                          setloader={this.setLoaderState.bind(this)}
                          menuId={this.props.menu.id}
                          menu={this.props.menu}
                          collections={this.props.collections}
                          menuCollections={this.props.menuCollections}
                          // menuCollection={[collectionMenuId]}
                    />

                </Drawer>
            </MediaQuery>
            </>)
        }
        return menu
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menus.menu,
        menuCollections:state.menus.menuCollections,
        collections:state.collections.collections
    }

}
export default connect(mapStateToProps)(EditMenus)
