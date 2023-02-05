import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import { React } from "react";

export const STORE_QUESTIONS = "STORE_QUESTIONS";
// export const ADD_BRAND = "ADD_BRAND";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const saveQuestions = (res) => {
  return {
    type: "STORE_QUESTIONS",
    value: res,
  };
};
// export const editQuestion = (res) => {
//   return {
//     type: "EDIT_QUESTION",
//     value: res,
//   };
// };
export const deleteQuestion = (res) => {
  return {
    type: "DELETE_QUESTION",
    value: res,
  };
};
//Store Collections
export const storeQuestions = () => {
  return (dispatch) => {
    axios.get('/answer').then(success => {
      console.log(success)
      let setData = (success.data.map(question => ({
        key: question.id,
        question: question.question,
        name: question.Customer.firstName + " " + question.Customer.lastName,
        createdAt: <ReactTimeAgo date={new Date(question.createdAt)} locale="en-US"/>,
        productName: question.Product.name,
        userName: question.User !== null ? question.User.firstName+" " +question.User.lastName:"Null",
        answer: question.answer,
        answerCreatedAt: <ReactTimeAgo date={new Date(question.answerCreatedAt)} locale="en-US"/>,
        visibility: question.visibility,
      })))
      dispatch(saveQuestions(setData));
    });
  };
};
// save single brand
// export const saveBrand = (res) => {
//   return {
//     type: "ADD_BRAND",
//     value: res,
//   };
// };
