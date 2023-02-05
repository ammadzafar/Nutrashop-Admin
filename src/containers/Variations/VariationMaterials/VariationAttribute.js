import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {storeAttributes} from "../../../store/actions/attributeActions";
import VariationsMaterial from "./VariationMaterial";
import {Button, Card, Col, Row} from "antd";
import EditableTable from "./VariationsTable";
import axios from "axios";
import {VariationContext} from "../NewVariationis/Variations"
const VariationAttribute = () => {
    // all code of variations

    const dispatch = useDispatch()
    const {attributes} = useSelector(({attributes}) => attributes);
    useEffect(() => {
        dispatch(storeAttributes())
    }, []);
    const [attributeAndVariationHtml , setAttributeVariationHtml]= useState([])
    const [keyCount, setKeyCount]= useState(0)
    const [callBackAttKey, setCallBackAttKey] = useState(0);
    const [allAtt, setAllAtt] = useState([]);
    useEffect(()=>{
        setAllAtt(attributes)
    },[attributes]);
    useEffect(()=>{
        let newValue = allAtt.filter(att => att.key !== callBackAttKey)
        setAllAtt(newValue);
    },[callBackAttKey]);

    const getAttValFromDaughter=(value)=>{
        setCallBackAttKey(value)
        console.log(allAtt)
        setKeyCount(keyCount+1)
    }
    const handleClickForAddingAttribute=()=>{
        const attributeVariation=(<VariationsMaterial
            key={Math.random(12).toString}
            specialKey={keyCount}
            getAttVal={getAttValFromDaughter}
            attributes={allAtt}/>)
        setAttributeVariationHtml(oldArray=>[...oldArray,attributeVariation])
    }
    const [arrayForRecursion,setArrayForRecursion] = useState([]);
    // const cartesian = (...a) => ;

    const cartesianProduct=(a)=> { // a = array of array
        var i, j, l, m, a1, o = [];
        if (!a || a.length == 0) return a;

        a1 = a.splice(0, 1)[0]; // the first array of a
        a = cartesianProduct(a);
        for (i = 0, l = a1.length; i < l; i++) {
            if (a && a.length)
                for (j = 0, m = a.length; j < m; j++)
                    o.push([a1[i]].concat(a[j]));
            else
                o.push([a1[i]]);
        }
        return o;
    }

    const myFunction=(value)=>{
        setArrayForRecursion(oldArray=>[...oldArray,value])
    }
    console.log(arrayForRecursion)
    useEffect(()=>{
        console.log(arrayForRecursion)
    },[arrayForRecursion])

    const [arrayForTable, setArrayForTable] = useState([])
    const test=()=>{
        setArrayForTable(cartesianProduct(arrayForRecursion))
        createAttributeValues()
    }
    const createAttributeValues=()=>{
        arrayForTable.length !== 0 && alert()
        // axios.post('/',data)
    }
    return (
        <div>
            <Row gutter={24} className="row">
                <Col span={22}>
                    <VariationContext.Provider value={myFunction}>
                        <Card title="Variations" className="cardHeight" bordered={false}>
                            <>
                                <Button onClick={handleClickForAddingAttribute}>Add Attribute for Variant</Button>
                                {attributeAndVariationHtml}
                                {arrayForRecursion.length !==0 && <Button onClick={test} type="primary"
                                                                          style={{
                                                                              marginBottom: 16,marginTop: 16,
                                                                          }}
                                >
                                    Create Variations
                                </Button>}
                                {arrayForTable.length !== 0 ? <EditableTable children={arrayForTable}/>:''}
                            </>
                        </Card>
                    </VariationContext.Provider>
                </Col>
            </Row>
        </div>
    );
};

export default VariationAttribute;