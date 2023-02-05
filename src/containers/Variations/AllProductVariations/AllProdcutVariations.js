import React, {Component} from "react";
import {
    Button,
    Input,
    Layout,
    message,
    Space,
    Switch,
    Table,
} from "antd";
import Highlighter from "react-highlight-words";

import {
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import * as actionCreators from "../../../store/actions/variantActions";
import {connect} from "react-redux";
import {storeVariantsWithId} from "../../../store/actions/variantActions";


const {Content} = Layout;

class AllProductVariations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: null,
            isPopular: false,
            searchText: "",
            searchedColumn: "",
            data: [],
            productVariants: [],
        };
    }
    productId = this.props.match.params.id;

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

    componentDidMount() {
        this.props.dispatch(actionCreators.storeVariantsWithId(this.productId));
        this.setState({
            data: this.props.productVariants,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.productVariants !== this.props.productVariants) {
            this.setState({data: this.props.productVariants});
        }
    }

    render() {

        const columns = [
            {
                title: "Sr#",
                dataIndex: "key",
                key: "key",
                width: "10%",
                responsive: ["lg"],
            },
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                ...this.getColumnSearchProps("name"),
                width: "20%",
            },
            {
                title: "Created At",
                dataIndex: "createdAt",
                key: "createdAt",
                width: "20%",
                responsive: ["lg", "md", "sm"],
            },
            {
                title: "Action",
                dataIndex: "key",
                key: "action",
                render: (key) => (
                    <Space size="middle">
                        <Link to={"/product/editvariation/" + key}>
                            <Button shape="round" icon={<EditOutlined/>} size="small">
                                Variations
                            </Button>
                        </Link>
                    </Space>
                ),
            },
        ];
        // const newProductButton = (
        //     <>
        //         <Link to="product/create">
        //             <Button className="Button" type="primary">
        //                 <PlusOutlined/> New Product
        //             </Button>
        //         </Link>
        //     </>
        // );
        return (
            <Content style={{margin: "16px 16px"}}>
                <div
                    className="site-layout-background"
                    style={{padding: 24, minHeight: 360}}
                >
                    {console.log(this.props)}
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                    />
                </div>
            </Content>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productVariants: state.variants.variants,
    };
};

export default connect(mapStateToProps)(AllProductVariations);
