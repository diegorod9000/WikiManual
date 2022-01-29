import React, { useEffect, useState } from "react";
import { get } from "../../utilities";
import "./QuestionAnswers.css"

const QuestionAnswers = ({ answerIds }) => {
  console.log(answerIds);
  const [answers, setAnswers] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!answerIds || !visible) return;
    console.log(answerIds);
    let query = { ids: answerIds };
    get("/api/answers", query).then((ret) => setAnswers(ret));
  }, [visible]);

  const makeVisible = () => {
    setVisible(true);
  };
  const stringifyAnswer = (answer) => {
    if (!answer.userName) return "";
    return (
      <p>
        {answer.userName} answered:
        <br /> {answer.content}{" "}
      </p>
    );
  };

  return (
    <div className="answers">
      {visible? answers.map((answer) => (
        <div key={answer._id}>{stringifyAnswer(answer)}</div>
      )): <p className="click-to-show" onClick={makeVisible}>Click to load answers</p>}
    </div>
  );
};

export default QuestionAnswers;
