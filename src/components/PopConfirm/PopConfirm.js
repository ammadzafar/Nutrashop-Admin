import { Popconfirm, Button, Space } from "antd";
import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";

const App = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    props.deleteHandler();
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Popconfirm
        title="Are you sure"
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        <MediaQuery minWidth={1224}>
          <Button shape="round" onClick={showPopconfirm} size="small" danger>
            <DeleteOutlined /> Delete
          </Button>
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
          <Button shape="round" onClick={showPopconfirm} size="small" danger>
            <DeleteOutlined />
          </Button>
        </MediaQuery>
      </Popconfirm>
    </>
  );
};
export default App;
