import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {storeAttributes} from "../../../store/actions/attributeActions";
import VariationsMaterial from "../../Variations/VariationMaterials/VariationMaterial";
import {Button, Card, Col, Row} from "antd";
import EditableTable from "../../Variations/VariationMaterials/VariationsTable";
import axios from "axios";

export const VariationContext = React.createContext()
export const productId = React.createContext()
const Variations = (props) => {
    console.log(props)
    const resId = props.match.params.id
    // all code of variations
    const [totalAttNumber, setTotalAttNumber]= useState(10000)
    const dispatch = useDispatch()
    const {attributes} = useSelector(({attributes}) => attributes);
    useEffect(() => {
        dispatch(storeAttributes())
    }, []);
    const [attributeAndVariationHtml, setAttributeVariationHtml] = useState([])
    const [keyCount, setKeyCount] = useState(0)
    const [callBackAttKey, setCallBackAttKey] = useState(0);
    const [allAtt, setAllAtt] = useState([]);
    useEffect(() => {
        setAllAtt(attributes)
        setTotalAttNumber(attributes.length)
    }, [attributes]);
    const [addAttButton, setAddAttButton] = useState(false)
    useEffect(() => {
        let newValue = allAtt.filter(att => att.key !== callBackAttKey)
        setAllAtt(newValue);
    }, [callBackAttKey]);

    const [attIdArray, setAttIdArray]=useState([])
    const getAttValFromDaughter = (value) => {
        setCallBackAttKey(value)
        setAttIdArray(oldArray => [...oldArray, value])
        setKeyCount(keyCount + 1)
    }
    const handleClickForAddingAttribute = () => {
        const attributeVariation = (<VariationsMaterial
            key={Math.random(12).toString}
            specialKey={keyCount}
            getAttVal={getAttValFromDaughter}
            attributes={allAtt}/>)
        setAttributeVariationHtml(oldArray => [...oldArray, attributeVariation])

    }
    useEffect(()=>{
        totalAttNumber === attributeAndVariationHtml.length && setAddAttButton(true);
    },[attributeAndVariationHtml])
    const [arrayForRecursion, setArrayForRecursion] = useState([]);

    const cartesianProduct = (a) => { // a = array of array
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
    const [newArray, setNewArray] = useState([]);
    const myFunction = (value) => {
        let tempObject = {};
        let tempArray = [];
        tempObject.attKey = callBackAttKey
        tempObject.attValue = value
        let filteredArray =newArray.map(arr=>arr.filter(arr=> arr.attKey !== callBackAttKey ))
        let improvedArray = filteredArray.filter(arr=> {
            return arr !== []
        })
        setNewArray(improvedArray)
        setArrayForRecursion(oldArray => [...oldArray, value])
        tempArray.push(tempObject)
        setNewArray(old=>[...old, tempArray])

    }
    console.log(newArray)

    const [arrayForTable, setArrayForTable] = useState([])
    const saveVariationsDataCreateAttributeProduct = () => {
        setArrayForTable(cartesianProduct(arrayForRecursion))
        createAttributeValues(newArray)
    }

    const createAttributeValues = (array) => {
        let data = new FormData()
        data.append("attributesIdArray",attIdArray)
        data.append("data", JSON.stringify(array))
        data.append("productId",props.match.params.id)
        let test = JSON.stringify(array, null, 2);
        console.log(test)
        alert(test)
        axios.post('/attributes/values/',data,{
            contentType: 'application/json'
        }).then(res=>console.log(res)).catch(err=>console.log(err))
    }

    return (
        <div>
            <Row gutter={24} className="row">
                <Col span={24}>
                    <VariationContext.Provider value={myFunction}>
                    <productId.Provider value={resId}>
                        <Card title="Variations" className="cardHeight" bordered={false}>
                            <>
                                <Button disabled={addAttButton}
                                        type="primary"
                                        style={{
                                            marginBottom: 16,
                                            marginTop: 16,
                                        }}
                                        onClick={handleClickForAddingAttribute}>Add Attribute for Variant</Button>
                                {attributeAndVariationHtml}
                                {arrayForRecursion.length !== 0 &&
                                <Button
                                    onClick={()=>saveVariationsDataCreateAttributeProduct()} type="primary"
                                    style={{
                                        marginBottom: 16, marginTop: 16,
                                    }}
                                >
                                    Create Variations
                                </Button>}
                                {arrayForTable.length !== 0 ? <EditableTable children={arrayForTable}/> : ''}
                            </>
                        </Card>
                    </productId.Provider>
                    </VariationContext.Provider>
                </Col>
            </Row>
        </div>
    );
};

export default Variations;