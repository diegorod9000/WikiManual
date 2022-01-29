import React, { useEffect, useState } from "react";
import { get } from "../../utilities";

import "../../utilities.css";
import SearchBar from "../modules/SearchBar";
import "./Search.css";


const addDevice = (devlist, device) =>{
  devlist.push(device)
}
const SearchPage = (props) => {

  const [deviceList, addDevice] = useState([]);

  //Possibly put in api??:
   //  req.query.name?
  // (
  //   const filteredDevices = data.devices.filter(
  //     (device) => device.name.includes(req.query.name);
  //   res.send(filteredDevices)
  //   )

  // ):(
  

  useEffect(() => {
    // // const query {}
    let devName = props.location.state.searchVal.replace(/\s+/g, ' ')
    // console.log(devName)
    // const query = { name: devName.replace(/\s+/g, ' ')};
    const query = {name: devName}
    // console.log(query)
    get("/api/devices", { name: devName}).then((dev) => {
      
      console.log("here")
      console.log(dev)
      // addDevice(deviceList, dev)
    });



    console.log(props.location.state.searchVal);
  }, [])
  // props.location.state.searchVal

  return (
    <div>
      {/* <h1>Search Page</h1> */}
      <SearchBar />
      <div className="rect1">
        <h1>Matching Devices</h1>
      </div>
    </div>
  );
};

export default SearchPage;