import React, { useState, useEffect, Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import img from "../../images/not-found.png";
import SingleDevice from "../modules/SingleDevice.js"


import "../../utilities.css";
import SearchBar from "../modules/SearchBar";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "398328809993-2qcr90geuucv50luba0b0v6sv0vubmuh.apps.googleusercontent.com";
let deviceId= "61e221a51b7482ba240b943c";
let deviceId2 = "61e662eb3febb8279294f94a";
let deviceId3 = "61e663f63febb8279294f94b";
let deviceId4 = "61e73786e0a3d1fc4f2e955d";
let deviceId5 = "61e666ff3febb8279294f94d";

// const deviceList = []
// function addDevice()

const Skeleton = ({ userId, handleLogin, handleLogout }) => {

  // const [deviceIDList, addDevice] = useState([]);
  

  // useEffect(() => {
  //   // const query = { name: "Lenovo IdeaPad 1" };
  //   get("/api/devices").then((dev) => {
  //     deviceIDList.push(dev.id)
  //     console.log(deviceIDList)
  //     // addDevice(deviceList, dev)
  //   });});

  function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  }

  // useEffect(() => {
    let deviceList = [deviceId, deviceId2, deviceId3, deviceId4, deviceId5];

    let firstRandom = get_random(deviceList);
    let secondRandom = get_random(deviceList);
    let thirdRandom = get_random(deviceList);


  // })

  

  return (
    <>
    <SearchBar />
    <div className="rect1">
      <h1>Featured Devices</h1>
      <SingleDevice deviceId = {firstRandom} /> 
      {secondRandom !== firstRandom? (<SingleDevice deviceId = {secondRandom} />):(<SingleDevice deviceId = {thirdRandom} />)}
    </div>
    {/* <div className="rect2">
      <h1>Popular Discussions</h1>
    </div> */}
      {/*
      <a href="http://weblab.to/get-started">Check out this getting started guide</a> */}
    </>
  );
};

export default Skeleton;
