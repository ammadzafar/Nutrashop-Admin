import {Collapse, Row, Col, Select,Checkbox, Tag} from "antd";
import {React, useEffect,useState} from "react";
import {DeleteOutlined} from "@ant-design/icons";

const {Panel} = Collapse

const Attribute = (props) => {
    const [valueOptions, setValueOptions] = useState([]);
    const [values, setValues] = useState([]);
    const valuesArray = []

    const genExtra = () => (
        <DeleteOutlined
            onClick={event => {
                event.stopPropagation();
                props.deleteAttribute(props.id)
            }}
        />
    );

    const onChange= (e)=>{
        console.log(e.target.checked)
    }
    return (
        <>
            <Collapse
                defaultActiveKey={['1']}
                expandIconPosition='left'
            >
                <Panel header={props.text} key="1" extra={genExtra()}>
                    <Row>
                        <Col span={6}>
                            {props.text}
                        </Col>
                        <Col span={18}>
                            {props.values.map((value, i) =><Tag key={i}>{value.name}</Tag>)}
                        </Col>
                        <br/>
                        <br/>
                        <Col span={14}>
                            <Checkbox onChange={onChange}>Use the Attribute for Variations</Checkbox>
                        </Col>
                    </Row>

                </Panel>
            </Collapse>
            <br/>
        </>
    )

}

export default Attribute
