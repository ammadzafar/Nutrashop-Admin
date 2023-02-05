import {React, Component} from "react";
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
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
    CloudUploadOutlined
} from "@ant-design/icons";
import DeletePop from "../../../components/PopConfirm/PopConfirm";
import Import from "../Import/Import";
import {Link} from "react-router-dom";
import * as actionCreators from "../../../store/actions/productActions";
import axios from "axios";
import {connect} from "react-redux";
import MediaQuery from "react-responsive";
import ProductModal from "../../../components/ProductModal/ProductModal";

const {Content} = Layout;

class Products extends Component {
    state = {
        visible: false,
        productId: null,
        isPopular: false,
        searchText: "",
        searchedColumn: "",
        stockModalData:{},
        stockModalVisible:false,
        data: [],
        products: [],
        auth: [],
    };
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
        this.props.dispatch(actionCreators.storeProducts());
        this.setState({
            data: this.props.products,
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.products !== this.props.products) {
            this.setState({data: this.props.products});
        }
    }

    // updateReviewState = (callback) => {
    //     setOrderReview(callback)
    // }

    openModal=(id,productData)=>{
        console.log(productData)
        this.setState({
            stockModalData:productData,
            stockModalVisible:true
        })
    }
    handleOk = () => {
        this.setState({
            stockModalVisible:false
        })
    };

    handleCancel = () => {
        this.setState({
            stockModalVisible:false
        })
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    deleteProduct = (id) => {
        axios
            .delete("products/" + id)
            .then((response) => {
                this.props.dispatch(actionCreators.deleteProduct(id));
                message.success("Product deleted successfully.");
            })
            .catch((error) => {
                message.error("can not delete the product");
            });
    };
    onChange = (value, productObject) => {
        let product = new FormData();
        product.append("isPopular", value);
        axios
            .put("products/togglePopular/" + productObject.key, product)
            .then((response) => {
                message.success("Product updated successfully");
            })
            .catch((error) => {
                message.error("Error");
            });
    };


    render() {
        const currentModule = this.props.match.url.slice(1, 9);
        const wholeModule = this.props.auth.user.role.modules.find(
            (xx) => xx.slug === currentModule
        );
        const permission = wholeModule.ModuleRole.permission;

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
                title: "Popular",
                dataIndex: "isPopular",
                key: "isPopular",
                responsive: ["lg", "md", "sm"],
                render: (dataIndex, collection) => (
                    <Space size="middle">
                        <Switch
                            defaultChecked={dataIndex ?? true}
                            checkedChildren={<CheckOutlined/>}
                            unCheckedChildren={<CloseOutlined/>}
                            onChange={(e) => this.onChange(e, collection)}
                        />
                    </Space>
                ),
            },
            {
                title: "Add Stock",
                dataIndex: "key",
                key: "key",
                responsive: ["lg", "md", "sm"],
                render: (id,productData) => (
                    <Space size="middle">
                        <Button
                            type="primary"
                            shape="round"
                            icon={<CloudUploadOutlined/>}
                            onClick={()=>this.openModal(id,productData)}
                            size="small">
                            Add Stock
                        </Button>
                    </Space>
                ),
            },
            {
                title: "Action",
                dataIndex: "key",
                key: "action",
                render: (key) => (
                    <Space size="middle">
                        <Link to={"/product/allproductvariants/" + key}>
                            <Button shape="round" size="small">
                                Variations
                            </Button>
                        </Link>
                        <MediaQuery minWidth={1224}>
                            <Link to={"/product/edit/" + key}>
                                <Button shape="round" icon={<EditOutlined/>} size="small">
                                    Edit
                                </Button>
                            </Link>
                        </MediaQuery>

                        <MediaQuery maxWidth={1224}>
                            <Link to={"/product/edit/" + key}>
                                <Button
                                    shape="round"
                                    icon={<EditOutlined/>}
                                    size="small"
                                ></Button>
                            </Link>
                        </MediaQuery>
                        <DeletePop
                            name="Product"
                            deleteHandler={() => {
                                this.deleteProduct(key);
                            }}
                        />
                    </Space>
                ),
            },
        ];
        const new_columns = columns.slice(0, 3);
        const newProductButton = (
            <>
                <Link to="product/create">
                    <Button className="Button" type="primary">
                        <PlusOutlined/> New Product
                    </Button>
                </Link>
                {/* <Button icon={<UploadOutlined/>} onClick={this.showDrawer}>Import Products</Button> */}
            </>
        );
        return (
            <Content style={{margin: "16px 16px"}}>
                <div
                    className="site-layout-background"
                    style={{padding: 24, minHeight: 360}}
                >
                    <div>{permission === "read" ? "" : newProductButton}</div>
                    <Table
                        columns={permission === "read" ? new_columns : columns}
                        dataSource={this.state.data}
                    />
                    {/*<EditBrand visible={this.state.editVisible} brandId={this.state.brandId} cancel={this.editOnClose}/>*/}
                    <Import visible={this.state.visible} cancel={this.onClose}/>
                    <ProductModal
                        visible={this.state.stockModalVisible}
                        cancel={this.handleCancel}
                        properties={this.state.stockModalData}
                        onOk={this.handleOk}
                    />
                </div>
            </Content>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        auth: state.auth.auth,
    };
};

export default connect(mapStateToProps)(Products);
