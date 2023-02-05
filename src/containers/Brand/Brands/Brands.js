import { Component, React } from "react";
import { connect } from "react-redux";
import { Button, Layout, message, Space, Switch, Table } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import NewBrand from "../NewBrand/NewBrand";
import EditBrand from "../EditBrand/EditBrand";
import DeletePop from "../../../components/PopConfirm/PopConfirm";
import * as actionCreators from "../../../store/actions/brandActions";
import "./Brands.css";
import axios from "axios";
import MediaQuery from 'react-responsive'


const { Column } = Table;
const { Content } = Layout;

class Brands extends Component {
  state = {
    visible: false,
    editVisible: false,
    brandId: null,
    brands: [],
    auth: [],
  };

  componentDidMount() {
    this.props.dispatch(actionCreators.storeBrands());
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  editShowDrawer = (id) => {
    this.setState({
      editVisible: true,
      brandId: id,
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
  deleteBrand = (id) => {
    axios
      .delete("brands/" + id)
      .then((response) => {
        this.props.dispatch(actionCreators.deleteBrand(id));
        message.success("Brand deleted successfully.");
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
  };
  onChange = (value, brandObject) => {
    let brand = new FormData();
    brand.append("isPopular", value);
    axios
      .put("brands/togglePopular/" + brandObject.key, brand)
      .then((response) => {
        message.success("Brand updated successfully");
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
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          {permission === "read" ? (
            ""
          ) : (
            <Button className="Button" type="primary" onClick={this.showDrawer}>
              <PlusOutlined /> New Brand
            </Button>
          )}
          <Table dataSource={this.props.brands}>
            <Column
              className="Responsive-1224"
              title="Sr #"
              dataIndex="key"
              key="key"
            />
            <Column
              className="Responsive-1224"
              title="Image"
              dataIndex="image"
              key="image"
              render={(image) => (
                <div className="ant-list-item-meta-avatar">
                  <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                    <img
                      src={process.env.REACT_APP_BASE_IMAGE_PATH + image}
                      alt="brand"
                    />
                  </span>
                </div>
              )}
            />
            <Column title="Name" dataIndex="name" key="name" />
            {permission === "read" ? (
              ""
            ) : (
              <>
                <Column
                  title="Popular"
                  dataIndex="isPopular"
                  className="Responsive-1224"
                  key="isPopular"
                  render={(dataIndex, brand) => (
                    <Space size="middle">
                      <Switch
                        defaultChecked={dataIndex ?? true}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={(e) => this.onChange(e, brand)}
                      />
                    </Space>
                  )}
                />
                <Column
                  className="Responsive-1224"
                  title="Created At"
                  dataIndex="createdAt"
                  key="createdAt"
                />
                <Column
                  title="Action"
                  dataIndex="key"
                  key="action"
                  render={(key) => (
                    <Space size="middle">

                      <MediaQuery minWidth={1224}>
                        <Button
                          shape="round"
                          icon={<EditOutlined />}
                          onClick={() => this.editShowDrawer(key)}
                          size="medium"
                        >
                          Edit Brand
                        </Button>
                      </MediaQuery>

                      <MediaQuery maxWidth={1224}>
                        <Button
                          shape="round"
                          icon={<EditOutlined />}
                          onClick={() => this.editShowDrawer(key)}
                          size="medium"
                        >
                          
                        </Button>
                      </MediaQuery>

                      <DeletePop
                        name="Brand"
                        deleteHandler={() => {
                          this.deleteBrand(key);
                        }}
                      />
                    </Space>
                  )}
                />
              </>
            )}
          </Table>
          <NewBrand visible={this.state.visible} cancel={this.onClose} />
          <EditBrand
            visible={this.state.editVisible}
            brandId={this.state.brandId}
            cancel={this.editOnClose}
          />
        </div>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands.brands,
    auth: state.auth.auth,
  };
};
export default connect(mapStateToProps)(Brands);
