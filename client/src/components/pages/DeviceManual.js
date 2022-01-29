import React, { useState, useEffect, Component } from "react";
// import SingleDevice from "../modules/SingleDevice.js";
import "./DeviceManual.css";
import { get, post } from "../../utilities";
import ManualContent from "../modules/ManualContent"
import img from "../../images/not-found.png";
import QuestionHolder from "../modules/QuestionHolder";

const DeviceManual = ({DeviceID, userId})=> {

  // ManualContent
  const [device, setDevice] = useState({});

  useEffect(() => {
    const query = { deviceId: DeviceID };
    console.log(query);
    get("/api/devices", query).then((dev) => {
      // console.log(dev);
      setDevice(dev);
      // console.log(device);
  
    });
  }, []);

  console.log(device);

  const submitQuestion = () => {
    console.log(userId);
    if(!userId) {
      document.getElementById("submitQuestion").value = "Please log in to submit a question.";
      return;
    }
    let input = document.getElementById("submitQuestion").value;
    console.log(input)
    if (input==""){
      document.getElementById("submitQuestion").value = "Please enter a question";
      return;
    }
    if (input == "Please enter a question" || input=="Come on."){
      document.getElementById("submitQuestion").value = "Come on.";
      return;
    }
    let body = {
      userId: userId,
      deviceId: DeviceID,
      content: input
    };
    post("/api/questions", body).then((res) => {
      console.log(res);
      window.location.reload();
    })
  }


  return (
    <div>
      <h1>Device Page</h1>
      <p className="side-text">{device.name}</p>
      {device?(<img src={device.img}></img>):(<img src={img}></img>)}
      {/* {DeviceID !== ":DeviceID"?(<img></img>):(<img src={img}></img>)} */}

      {/* <img></img> */}
      {/* <p>This is the page where a device's information will be held</p> */}
      <a className="manual-button" href={device.manual_link} target="_blank">
        Manual
      <div className="manual-box-1"></div>
      <div className="manual-box-2"></div>
      </a>
      <button className="unanswered-qs">?</button>
      {/* <button className="unjudged-adds">+</button>
      <button className="edit">Edit </button> */}
      <div className="rect3">
      <h1>Device Name</h1>
      <h3> Device description: </h3>
      {device.content? <ManualContent sectionList= {device.content}/>: ""}
      </div>
      <br></br>
      <br></br>
      <div className="side-text rect4">
      <h3>Ask a question</h3>
      <textarea id="submitQuestion"></textarea>
      <button className="submit" type="click" onClick={submitQuestion}>Submit</button>
      </div>
      {device? <QuestionHolder questionIds={device.questions} userId={userId}/>: <></>}
      
    
    </div>
  );
};

export default DeviceManual;