import React, { useState } from "react";
import "./NewInput.css"


const NewSearch = (props) => {
    const [value, setValue] = useState("Search Here:");
}

const handleChange = (event) => {
    setValue(event.target.value);
  };

export default NewSearch;