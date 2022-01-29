import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import QuestionAnswers from "./QuestionAnswers";
import ReplyBox from "./ReplyBox";
import "./QuestionHolder.css";

const QuestionHolder = ({ questionIds, userId }) => {
  console.log(questionIds);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!questionIds) return;
    console.log(questionIds);
    let query = { ids: questionIds };
    get("/api/questions", query).then((ret) => setQuestions(ret));
  }, [questionIds]);

  //Formats
  const htmlify = (question) => {
    if (!question.userName) return "";
    return (
      <p className="question-content">
        {question.userName} asked:
        <br /> &emsp; {question.content}{" "}
      </p>
    );
  };

  return (
    <div className="quest-container">
      {questions.map((question) => (
        <div key={question._id}>
          {htmlify(question)}
          <ReplyBox userId={userId} questionId={question._id} />
          <QuestionAnswers answerIds={question.answers}></QuestionAnswers>
        </div>
      ))}
    </div>
  );
};

export default QuestionHolder;
