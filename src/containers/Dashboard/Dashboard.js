import React from 'react';
import BoardCard from "./DashBoard-cards/DashBoard-card";
import "./Dashboard.css"
import {Row,Col} from "antd";
import LatestProduct from "./LatestProduct/LatestProduct";
import DemoPie from "./PieChart/PieChart";
import OrderLeft from "./PendingOrder/Order-pending";
import LatestCustomer from "./LatestCustomers/LatestCustomers";
import LatestQuestion from "./LatestQuestions/LatestQuestion";
import LatestReview from "./LastestReview/LatestReview";
import LatestOrder from "./LatestOrders/LatestOrders";
function Dashboard() {
    const data = [
        { item: 'Test', count: 40, percent: 0.4 },
        { item: 'Test1', count: 21, percent: 0.21 },
        { item: 'Test2', count: 17, percent: 0.17 },
        { item: 'Test3', count: 13, percent: 0.13 },
        { item: 'Test4', count: 9, percent: 0.09 },
    ];
    const cols = {
        percent: {
            formatter: val => {
                val = val * 100 + '%';
                return val;
            },
        },
    };
    return (
        <>
            <div className="dashboard-main-sec">
                <div className="dashboard-main">
                       <BoardCard
                           cardColor={"#E9F1F6"}
                           cardcheck="orders"
                           checkLabel="Total Orders"
                           checkLink={"/orders"}
                           checkIcon={[ <i className=" fab fa-first-order"></i>]}
                           checkIconcolor={"#ff2f00a1"}
                       />
                        <BoardCard
                            cardColor={"#E9F1F6"}
                            cardcheck="products"
                            checkLabel="Total Products"
                            checkLink={"/products"}
                            checkIcon={[<i className="fas fa-shopping-bag"></i>]}
                            checkIconcolor={"teal"}
                        />
                        <BoardCard
                            cardColor={"#E9F1F6"}
                            cardcheck="customers"
                            checkLabel="Total Customers"
                            checkLink={"/customers"}
                            checkIcon={[<i className="fas fa-users"></i>]}
                            checkIconcolor={"olive"}
                        />
                        <BoardCard
                            cardColor={"#E9F1F6"}
                            cardcheck="brands"
                            checkLabel="Total Brands"
                            checkLink= {"/brands"}
                            checkIcon={[<i className="fab fa-bandcamp"></i>]}
                            checkIconcolor={"mauve"}
                        />
                        <BoardCard
                            cardColor={"#E9F1F6"}
                            cardcheck="menus"
                            checkLabel="Total Menus"
                            checkLink={"/menus"}
                            checkIcon={[< i className="fas fa-ellipsis-v"></i>]}
                            checkIconcolor={"cyan"}
                        />
                        <BoardCard
                            cardColor={"#E9F1F6"}
                            cardcheck="collections"
                            checkLabel="Total Collections"
                            checkLink={"/collections"}
                            checkIcon={[<i className="far fa-tasks"></i>]}
                            checkIconcolor={"coral"}
                        />
                </div>
            <div>
                <LatestProduct/>
            </div>
                <div className="charts-style">
            <div className="charts-col1">
                <DemoPie/>
            </div>
                <div className="charts-col2">
                    <OrderLeft/>
                </div>
                </div>
                <div className="customer-table">
                    <LatestCustomer/>
                </div>
                <div className="question-sec">
                    <LatestQuestion/>
                </div>
                <div className="review-sec">
                    <LatestReview/>
                </div>
                <div>
                    <LatestOrder/>
                </div>
            </div>
        </>
    );
}
export default Dashboard;
