import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { navigate } from "@reach/router";
import { NewSearch } from "./NewInput.js";

const buttonClick = document.querySelector('button');


const SearchBar = () => {
    const [search, setSearch] = useState("");

    const changeSearch = (e) => {
        setSearch(document.querySelector("select").value.replace(/\s+/g, ' '))
        // setSearch(e.target.value)
    }

    const toSearchPage = () => {
        navigate("/Search", {state: {searchVal:search}})
    }

    return(<>
        <select name="searchSelect" className="SearchBar-container" onChange={changeSearch}>
            <option>Choose a device to search</option>
            <option>Lenovo IdeaPad 1</option>
            <option>Phillips Roku LED TV</option>
            <option>Oculus Quest 2</option>
            <option>Apple IPad Mini (6th Generation)</option>
            <option>Logitech Pop Mouse</option>
        </select>
        {/* <input className="SearchBar-container" placeholder="Search" type="text" onInput={changeSearch}></input> */}
        <button className="next-button" type="click" onClick={toSearchPage}>Next</button>
        {/* <p className='text'>Search</p>  */}
        </>
    );
};




// input.addEventListener('input', locationChange);

// function locationChange(){
//     // location.href = "/Search";
//     log.textContent = e.target.value;
// }

export default SearchBar;