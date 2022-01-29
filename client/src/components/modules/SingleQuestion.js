import React, { useState, useEffect, Component } from "react";
import { get } from "../../utilities";
import "./SingleQuestion.css"


const SingleQuestion = (props) => {

    // console.log(JSON.stringify(props));
    const [question, setQuestion] = useState();

    useEffect (() => {
        setQuestion(props[0]);
        console.log(props);
        console.log(question);
    })

    // useEffect(() => {
    //     const query = { questionId: questionId };
    //     get("/api/questions", query).then((ques) => {
    //         setQuestion(ques);
    //     });
    // });


    return(
        <>
        <div className="question-box">
            <p>{JSON.stringify(question)}</p>
            {/* {question.content} */}
        </div>
        </>
    )

};

export default SingleQuestion;

