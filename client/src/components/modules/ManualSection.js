import React, { useEffect, useState } from "react";

const ManualSection = (props) => {
  const [showContent, setVisibilty] = useState(true);
  const changeVisibility = ()=>{
    setVisibilty(!showContent);
  }

  console.log(props.header)
  return (
    <div>
      <p onClick={changeVisibility}>{props.header}</p>
      <p>{showContent ? props.content : ""}</p>
    </div>
  );
};

export default ManualSection;