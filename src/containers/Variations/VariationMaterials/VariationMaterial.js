import React, {useEffect, useState} from 'react';
import {storeAttributes} from "../../../store/actions/attributeActions";
import {Card, Form, Select, Space} from "antd";
import {useSelector, useDispatch} from "react-redux"
import VariationSelect from "./VariationSelect";

const VariationsMaterial = (props) => {
    // const dispatch = useDispatch();
    // const {attributes} = useSelector(({attributes}) => attributes);
    const [attribute, setAttribute] = useState([]);
    const [attributeOptions, setAttributeOptions] = useState([]);
    // const [cardForName, setCardForName] = useState()
    const attributesArray = []
    // useEffect(() => {
    //     dispatch(storeAttributes())
    // }, []);

    const sendingBackAttValue = (value) => {
        props.getAttVal(value)
    }
    useEffect(() => {
        for (let i = 0; i < props.attributes.length; i++) {
            let value = props.attributes[i].key
            attributesArray.push({
                label: props.attributes[i].name,
                value,
            });
            setAttributeOptions(options => [...attributesArray]);
        }
    }, [props.attributes]);

    const selectAttributeProps = {
        style: {
            width: '70%',
        },
        attribute,
        options: attributeOptions,
        onChange: (newValue) => {
            // let {name} = props.attributes.find(att=> att.key === newValue);
            // attributeNameForCard(name)
            sendingBackAttValue(newValue)
            setAttribute(oldValue=>[...oldValue, newValue]);
        },
        placeholder: 'Select Attributes...',
        maxTagCount: 'responsive',
    }
    const callBackFunctions=(values)=>{
        console.log(values)
        // props.getSelectedValuesForAttributes()
    }
    // const attributeNameForCard = (value) => {
    //     setCardForName(<Card style={{width: 300}}>
    //         <h4>{value}</h4>
    //     </Card>)
    // }
    // const callBackHandleVariationData=(data)=>{
    //     console.log(data)
    //     alert(data)
    // }
    return (
        <div>
            <Form.Item label="Attributes">
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Select {...selectAttributeProps} />

                </Space>

            </Form.Item>
            <div>
                Select the values for the Variant
                <VariationSelect/>
            </div>
        </div>
    );
};

export default VariationsMaterial;