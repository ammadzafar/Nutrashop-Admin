import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DesktopOutlined,
  PieChartOutlined,
  DashboardOutlined,
  OrderedListOutlined,
  AmazonOutlined,
  MergeCellsOutlined,
  TagOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import { saveAllUnreadOrders } from "../../../store/actions/OrderActions/orderActions";

const { Sider } = Layout;
// const {SubMenu} = Menu;
const SideBar = (props) => {

  const [orderCount, setOrderCount] = useState('')
  const { modules } = useSelector(({ auth }) => auth);
  const { allUnread } = useSelector(({ orders }) => orders);
  const [path, setPath] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    let abc = window.location.href;
    let pathname = abc.split("/");
    setPath(pathname[3]);
  });

  useEffect(() => {
    dispatch(saveAllUnreadOrders())
  }, [allUnread])

  return (
    path && (
      <Sider
        breakpoint="lg"
        collapsed={props.collapsed}
        onCollapse={props.onCollapse}
      >
        <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline">
          {modules.map((module, key) => (
            <Menu.Item
              key={module.slug}

              icon={<FeatherIcon icon={module.icon} fill="black" size={17} />}
            >
              <Link to={`/${module.slug}`}>{module.name} </Link>
              {module.slug === "orders" ? <span style={{
                background: '#006400',
                padding: '5px 18px 6px 18px',
                fontSize: '16px',
                borderRadius: '25px',
                margin: '0 0px 0 6px'
              }}>
                {allUnread}
              </span> : ""}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    )
  );
};
export default SideBar;
