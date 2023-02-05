import React,{useEffect,useState} from "react";
import "./LatestQuestion.css"
import axios from "axios";
const LatestQuestion=()=>{
    const [latestQuestion , setLatestQuestion]=useState("")
    useEffect(()=>{
        axios.get("totalcontrollers/latestAnswerQuestion")
            .then((response)=>{
                console.log(response)
                setLatestQuestion(response.data.map(data=>(
                    <div className="question-content">
                        <table>
                            <tr>
                                <td className="question-data1">{data.customerId}</td>
                                <td className="question-data2">{data.question}</td>
                            </tr>
                        </table>
                    </div>
                )))
            })
            .catch((error)=>{
                console.log(error)
            })
    },[])
    return(
        <div className="latestProduct-main latestquestion">
            <h2>Latest Questions
            </h2>
            <div className="question-main">
            <table>
                <tr>
                    <th>CutomerID</th>
                    <th>QUESTION</th>
                </tr>
            </table>
            </div>
            {latestQuestion}
        </div>
    )
}
export default LatestQuestion;