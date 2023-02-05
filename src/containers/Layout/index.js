import React from 'react'
import {Layout} from 'antd';
import SideBar from './Sider/index';
import Navbar from './Header/Header';
const {Footer} = Layout;

class AdminLayout extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {

        return (
            <Layout>
                <Navbar/>
                <Layout style={{minHeight: '100vh'}}>
                    <SideBar collapsed={this.state.collapsed} onCollapse={this.onCollapse}/>
                    <Layout className="site-layout">
                        { this.props.children}
                        <Footer style={{textAlign: 'center'}}>NutraShop ©2020 Created by AS</Footer>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default AdminLayout
