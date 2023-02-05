import React, {useState, useContext} from 'react';
import {Select, Form, Space, Button} from 'antd';
import {VariationContext} from '../NewVariationis/Variations'


const VariationSelect = (props) => {
    const contextFunction = useContext(VariationContext)
    const [variationData, setVariationData] = useState([])
    const handleChange = (value) => {
        setVariationData(value);
    }
    const handleBlur = () => {
        contextFunction(variationData)
    }
    return (
        <div>
            <Form.Item label="Select Values">
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Select
                        maxTagCount='responsive'
                        mode="tags"
                        style={{width: '70%'}}
                        onBlur={handleBlur}
                        placeholder="Select values for the variants"
                        onChange={handleChange}/>
                    <Button
                        type="primary"
                        style={{
                            marginBottom: 16,
                            marginTop: 16,
                        }}
                    >Save Values</Button>
                </Space>
            </Form.Item>
        </div>
    );
};

export default VariationSelect;