import * as actionTypes from "../actions/questionActions";

const initialState = {
  questions: [],
  question: "",
};
const questions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_QUESTIONS:
      return {
        ...state,
        questions: action.value
      }
    // case actionTypes.EDIT_QUESTION:
    //   // console.log(action.value.notificationId)
    //   console.log(action.value.answer)
    //   var oldQuestion = state.questions.find( (question) => question.key = action.value.notificationId)
    //   // var removeQuestion = state.questions.filter( (question) => question.key !== action.value.notificationId)
    //   //   // var updatedQuestion = oldQuestion.answer = action.value.answer
    //   //   console.log(oldQuestion)
    //   //   // console.log(action.value.answer)
    //   //   console.log(removeQuestion)
    //
    //   return {
    //     ...state,
    //   };

    case actionTypes.DELETE_QUESTION:
      const updatedArray = state.questions.filter(
        (brand) => brand.key !== action.value
      );
      return {
        ...state,
        brands: updatedArray,
      };
  }
  return state;
};
export default questions;
