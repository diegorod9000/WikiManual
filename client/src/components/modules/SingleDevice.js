import React, { useState, useEffect, Component } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import notFound from "../../images/not-found.png";
import "./SingleDevice.css"
import SingleQuestion from "./SingleQuestion";
import DeviceManual from "../pages/DeviceManual.js";


/**
 * Should render a snippet of the device on search and home pages
 * @param {string} _id
 * @param {string} description
 * @param {string} imagelink 
 * @returns 
 */


const SingleDevice = ({deviceId}) =>{

    const [device, setDevice] = useState({});

  useEffect(() => {
    // let deviceList = []
    const query = { deviceId: deviceId };

    get("/api/devices", query).then((dev) => {
    //   console.log(dev);
      setDevice(dev);
    //   console.log(device);
  
    });

  }, []);
    
    return(
        <>
        <div className="flexbox">
            <a className="dev-img" href={`/Device/${deviceId}`}>
                {device.img? (<img src={device.img}></img>):(<p>No image available</p>)}
            </a>
            <a className="text-block hover1" href={`/Device/${deviceId}`}>
                <h1>{device.name}</h1>
                <h2>{device.description}</h2>
            </a>
            <a className="text-block" href="/Profile">
                <h3>Questions</h3>
                {device.questions? (
                    <>
                    {/* {device.questions[0]} */}
                    <SingleQuestion props={device.questions} />
                    </>

                // <SingleQuestion questionId={device.questions} />
                ):(
                <p>No questions for this device</p>)}
            </a>
        </div>
        <br></br>
        <br></br>
            
        {/* <div className="flexbox">
            <div className="dev-questions">

            </div>
            <div className="dev-answers">

            </div>
        </div> */}



        </>
    );
};



export default SingleDevice;