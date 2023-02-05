import {Component, React} from 'react';
import {Button, Layout, message,Input, Space, Switch, Table} from "antd";
import {CheckOutlined,SearchOutlined , CloseOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom'
import Highlighter from 'react-highlight-words';
import axios from "axios";
import {connect} from "react-redux";
import DeletePop from "../../../components/PopConfirm/PopConfirm";
import {storeUsers,deleteUser} from "../../../store/actions/userActions";
import MediaQuery from 'react-responsive'
const {Content} = Layout;
const {Column} = Table;

class Users extends Component {
    state = {
        users: [],
        searchText: '',
        searchedColumn: '',
        data:[],
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
        this.props.storeAllUsers()
        this.setState({
            data:this.props.users
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps!==this.props){
            this.setState({
                data:this.props.users
            })
        }
    }


    deleteUser = (id) => {
        axios.delete('users/' + id).then(response => {
            this.props.deleteOneUser(id)
            message.success('User deleted successfully.');

        }).catch(error => {
            message.error('can not delete the User')
        })
    }
    render() {
        const currentModule = this.props.match.url.slice(1,12)
        console.log(currentModule)
        const wholeModule = this.props.auth.user.role.modules.find(module=>module.slug===currentModule)
        const permission = wholeModule.ModuleRole.permission
        console.log(permission)
        const columns = [
            {
                title: 'Sr#',
                dataIndex: 'key',
                key: 'key',
                responsive: ['lg'],
                // width: '10%',
            },
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName',
                ...this.getColumnSearchProps('firstName'),
                // width: '20%',

            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
                // width: '20%',
                responsive: ['lg'],
                ...this.getColumnSearchProps('lastName'),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                responsive: ['lg'],
                // width: '30%',
                ...this.getColumnSearchProps('email'),
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                responsive: ['lg'],
                // width: '20%',
                ...this.getColumnSearchProps('role'),
            },
            {
                title: "Action",
                dataIndex: "key",
                key: "action",
                render: (key) => (
                <Space size="middle">
                    <MediaQuery minWidth={1224}>
                        {/*For large screeen*/}
                        <Link to={"/user/edit/" + key}>
                            <Button shape="round" icon={<EditOutlined/>}
                                    size="small">
                                Edit
                            </Button>
                        </Link>

                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        {/*For mobile and tablet*/}
                        <Link to={"/user/edit/" + key}>
                            <Button shape="round" icon={<EditOutlined/>}
                                    size="small">
                            </Button>
                        </Link>


                    </MediaQuery>
                    <DeletePop name="User" deleteHandler={() => {
                        this.deleteUser(key)
                    }}/>
                </Space>
            )


            }
        ];
        const new_column = columns.slice(0,5)
        return <>
            <Content style={{margin: '16px 16px'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {permission==="read"?"":<Link to="user/create">
                        <Button className='Button' type="primary">
                            <PlusOutlined/> New User
                        </Button>
                    </Link>}
                    <Table columns={permission==='read'?new_column:columns} dataSource={this.state.data}/>
                </div>
            </Content>
        </>;
    }
}
const mapStateToProps = state => {
    return {
        users: state.users.users,
        auth:state.auth.auth
    }

}
const mapDispatchToProps=dispatch=>{
    return {
        storeAllUsers: () => {
            dispatch(storeUsers())
        },
        deleteOneUser:(id)=>{
            dispatch(deleteUser(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
