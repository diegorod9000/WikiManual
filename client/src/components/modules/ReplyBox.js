import React, { useEffect, useState } from "react";
import { post } from "../../utilities";
import "./Replybox.css";

const ReplyBox = ({ userId, questionId }) => {
  const [activated, setActive] = useState(false);
  const activateReply = () => {
    setActive(true);
  };
  const sendReply = ()=>{
	console.log(userId);
    if(!userId) {
      document.getElementById("submitAnswer").value = "Please log in to submit an answer.";
      return;
    }
    let input = document.getElementById("submitAnswer").value;
    console.log(input)
    if (input==""){
      document.getElementById("submitAnswer").value = "Please enter an answer";
      return;
    }
    if (input == "Please enter an answer" || input=="Come on."){
      document.getElementById("submitAnswer").value = "Come on.";
      return;
    }
    let body = {
      userId: userId,
      questionId: questionId,
      content: input
    };
    post("/api/answers", body).then((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  return (
    <div>
      {activated ? (
        <div>
          <textarea id="submitAnswer" defaultValue={"Write answer here"}></textarea>
          <button className="answerSubmit" type="click" onClick={sendReply}>
            Submit
          </button>
        </div>
      ) : (
        <button className = "answerSubmit" onClick={activateReply}>Write reply</button>
      )}
    </div>
  );
};
   
export default ReplyBox;
