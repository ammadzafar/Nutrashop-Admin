import {React, useState, useEffect} from "react";
import {
    Button,
    Input,
    Layout,
    message,
    Space,
    Switch,
    Table,
    Upload,
} from "antd";
import Highlighter from "react-highlight-words";

import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
    UploadOutlined,
} from "@ant-design/icons";

// import Import from "../Import/Import";
import {Link} from "react-router-dom";
import * as actionCreators from "../../store/actions/productActions";
import axios from "axios";
import {connect} from "react-redux";
import MediaQuery from "react-responsive";
import DeletePop from "../../components/PopConfirm/PopConfirm";
import {useSelector, useDispatch} from "react-redux";
import {storeReviews} from "../../store/actions/reviewActions";
import ReactTimeAgo from "react-time-ago";

const {Content} = Layout;
const {Column} = Table;

function Reviews(props) {
    const {auth} = useSelector(({auth}) => auth);
    const dispatch = useDispatch
    const [reviewData, setReviewData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        axios.get('/reviews').then(success => {
            console.log(success)
            let data = success.data.map(review => ({
                    key: review.id,
                    reviewTitle: review.reviewTitle,
                    rating: review.rating,
                    createdAt: <ReactTimeAgo date={new Date(review.createdAt)} locale="en-US"/>,
                    name: review.Product.name,
                    visibility: review.visibility.parseInt,
                    description: review.description
                })
            )
            console.log(success.data.map(review=>({
                visibility: review.visibility,
            })))
            setReviewData(data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const currentModule = props.match.url.slice(1, 9);
    console.log(currentModule);
    const wholeModule = auth.user.role.modules.find(
        (xx) => xx.slug === currentModule
    );
    const permission = wholeModule.ModuleRole.permission;
    console.log(permission);
    const onChange=(value,collectionObject)=>{
        let collection=new FormData()
        collection.append('visibility',value)
        setLoading(true)
        axios.put('/reviews/allowed/'+collectionObject.key, collection).then(response=>{
            console.log(response)
            message.success(`Review Successfully Updated as ${value}`)
            setLoading(false)
        }).catch(error=>{
            console.log(error)
            message.error('Error'+value)
            setLoading(false)

        })

    }
    return <Content style={{margin: "16px 16px"}}>
        <div
            className="site-layout-background"
            style={{padding: 24, minHeight: 360}}
        >
            <Table dataSource={reviewData}>
                <Column
                    className="Responsive-1224"
                    title="Sr #"
                    dataIndex="key"
                    key="key"
                />
                <Column
                    className="Responsive-1224"
                    title="Created At"
                    dataIndex="createdAt"
                    key="createdAt"
                />
                <Column title="Product Name" dataIndex="name" key="name"/>
                <Column title="Review Title" dataIndex="reviewTitle" key="reviewTitle"/>
                <Column title="Rating" dataIndex="rating" key="rating"/>
                <Column title="Description" dataIndex="description" key="description"/>
                {permission === "read" ? (
                    ""
                ) : (
                    <>
                        <Column
                            title="visibility"
                            className="Responsive-1224"
                            dataIndex="visibility"
                            key="visibility"
                            render={(dataIndex, collection) => (
                                <Space size="middle">
                                    <Switch loading={loading}
                                            defaultChecked={dataIndex ?? true}
                                            checkedChildren={<CheckOutlined/>}
                                            unCheckedChildren={<CloseOutlined/>}
                                            onChange={(e) => onChange(e, collection)}/>

                                </Space>
                            )}
                        />
                    </>
                )}
            </Table>
        </div>
    </Content>;

}

export default Reviews;
