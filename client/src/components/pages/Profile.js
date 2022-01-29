import React, { useState, useEffect } from "react";
import "./Profile.css";
import { get } from "../../utilities";

const ProfilePage = ({ userId }) => {
  console.log(userId);
  const [user, setUser] = useState({});
  const [userQuestions, setQuestions] = useState([]);
  const [userAnswers, setAnswers] = useState([]);
  const [userEdits, setEdits] = useState([]);

  //Sets user depending on who is logged in
  useEffect(() => {
    if (userId) {
      const query = { userId: userId };
      get("/api/users", query).then((prof) => {
        console.log(prof);
        setUser(prof);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (user.questions) {
      console.log(user.questions);
      let query = {ids: user.questions};
      get("/api/questions",query = {ids: user.questions}).then((ret) => setQuestions(ret));
      query = {ids: user.answers}
      get("/api/answers",query).then((ret) => setAnswers(ret));
      query = {ids: user.edits}
      get("/api/edits",query).then((ret) => setEdits(ret));
    }
  }, [user]);

  console.log(userQuestions);
  return (
    <div>
      {/* <div className="settings">Settings</div> */}
      <h1>Profile Page</h1>
      {userId ? (
        <>
          <h2> You are logged in as</h2>
          <h2>{JSON.stringify(user.name)}</h2>

          <div className="flex-container">
            <div className="box">
              <h2>Your Questions</h2>
              {JSON.stringify(userQuestions) !== "[]" ? (
                <h3>{JSON.stringify(userQuestions)}</h3>
              ) : (
                <p>
                  No questions! Ask a question on a device page to see questions you've asked and
                  answers given displayed here.
                </p>
              )}
            </div>
            <div className="box">
              <h2>Your Answers</h2>
              {JSON.stringify(userAnswers) !== "[]" ? (
                <p>{JSON.stringify(userAnswers)}</p>
              ) : (
                <p>
                  No answers! Answer a question on a device page to see answers you've given here.
                </p>
              )}
            </div>
            <div className="box">
              <h2>Your Edits</h2>
              {JSON.stringify(userEdits) !== "[]" ? (
                <p>{JSON.stringify(userEdits)}</p>
              ) : (
                <p>
                  No edits! Edit information on a device page to see edits you've contributed here.
                </p>
              )}
            </div>
          </div>
          {/* <h1>{JSON.stringify(user)}</h1> */}
        </>
      ) : (
        <h1> You are logged out</h1>
      )}
    </div>
  );
};

export default ProfilePage;
