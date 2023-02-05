import {React, Component} from 'react';
import {connect} from 'react-redux'
import {Layout, Space, Table, Popconfirm, message, Switch, Form, Input} from "antd";
import {Button} from "antd";
import Highlighter from 'react-highlight-words';

import {
    DeleteOutlined,
    PlusOutlined,
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
    SearchOutlined
} from "@ant-design/icons";
import NewCollection from "../NewCollection/NewCollection";
import EditCollection from "../EditCollection/EditCollection";
import DeletePop from "../../../components/PopConfirm/PopConfirm"
import * as actionCreators from '../../../store/actions/collectionActions'
import './Collections.css'
import axios from "axios";
import MediaQuery from 'react-responsive'
const {Column} = Table;
const {Content} = Layout;

class Collections extends Component {
    state = {
        visible: false,
        editVisible: false,
        collectionId: null,
        collections: [],
        searchText: '',
        searchedColumn: '',
        auth:[]
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
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
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
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

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    componentDidMount() {
        this.props.dispatch(actionCreators.storeCollections())
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    editShowDrawer = (id) => {
        this.setState({
            editVisible: true,
            collectionId: id
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
    deleteCollection=(id)=>{
        axios.delete('collections/'+id).then(response => {
            this.props.dispatch(actionCreators.deleteCollection(id))
            message.success('Collection deleted successfully.');

        }).catch(error => {
            console.log(error)
            message.error("cannot delete collection because of relations");
            // alert(error)
        })
    }
    onChange=(value,collectionObject)=>{
        let collection=new FormData()
        collection.append('isPopular',value)
        axios.put('collections/togglePopular/'+collectionObject.key, collection).then(response=>{
            message.success('Collection updated successfully')
        }).catch(error=>{
            message.error('Error')

        })

    }
    render() {

        const currentModule = this.props.match.url.slice(1,12)
        const wholeModule = this.props.auth.user.role.modules.find(xx=>xx.slug===currentModule)
        const permission = wholeModule.ModuleRole.permission
        return (
            <Content style={{margin: '16px 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {permission==="read"?"":<Button className='Button' type="primary" onClick={this.showDrawer}>
                        <PlusOutlined/> New Collection
                    </Button>}
                    <Table dataSource={this.props.collections}>
                        <Column className="Responsive-1224" title="Sr #" dataIndex="key" key="key"/>
                        <Column className="Responsive-1224" title="Image" dataIndex="image" key="image" render={(image) => (
                            <div className="ant-list-item-meta-avatar"><span
                                className="ant-avatar ant-avatar-circle ant-avatar-image"><img
                                src={process.env.REACT_APP_BASE_IMAGE_PATH + image} alt="brand"/></span></div>
                        )}
                        />
                        <Column
                            title="Name"
                            dataIndex="name"
                            key="name"
                            {...this.getColumnSearchProps('name')}
                        />
                        {permission === "read" ? " " :
                            <>
                                <Column
                                    title="Popular"
                                    className="Responsive-1224"
                                    dataIndex="isPopular"
                                    key="isPopular"
                                    render={(dataIndex, collection) => (
                                        <Space size="middle">
                                            <Switch defaultChecked={dataIndex ?? true}
                                                    checkedChildren={<CheckOutlined/>}
                                                    unCheckedChildren={<CloseOutlined/>}
                                                    onChange={(e) => this.onChange(e, collection)}/>

                                        </Space>
                                    )}
                                />
                                <Column className="Responsive-1224" title="Created At" dataIndex="createdAt" key="createdAt"/>
                                <Column
                                    title="Action"
                                    dataIndex="key"
                                    key="action"
                                    render={(key) => (
                                        <Space size="middle">
                                            <MediaQuery minWidth={1224}>
                                            <Button shape="round" icon={<EditOutlined/>}
                                                    onClick={() => this.editShowDrawer(key)} size="medium">
                                                Edit Collection
                                            </Button>
                                            </MediaQuery>
                                            <MediaQuery maxWidth={1224}>
                                            <Button shape="round" icon={<EditOutlined/>}
                                                    onClick={() => this.editShowDrawer(key)} size="medium">
                                                
                                            </Button>
                                            </MediaQuery>
                                            <DeletePop name="Collection" deleteHandler={() => {
                                                this.deleteCollection(key)
                                            }}/>
                                        </Space>
                                    )}
                                />
                            </>}
                    </Table>
                    <NewCollection visible={this.state.visible} cancel={this.onClose}/>
                    <EditCollection visible={this.state.editVisible} collectionId={this.state.collectionId} cancel={this.editOnClose}/>
                </div>
            </Content>

        );
    }
}

const mapStateToProps = state => {
    return {
        collections: state.collections.collections,
        parentCollections: state.collections.parentCollections,
        auth:state.auth.auth
    }

}
export default connect(mapStateToProps)(Collections);
