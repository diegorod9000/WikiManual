import React, { useEffect, useState } from "react";
import ManualSection from "./ManualSection";
/*
This is where I will make the methods for the "fancy" text we'll have for the Manuals. 
It'll be an array of "sections" which will be Objects.
We might want to think of adding some sort of advanced text application, like Latex.
*/

const ManualContent = (props) => {
  return (
    <div>
      {props.sectionList.map((section) => (
        <ManualSection key={section.header} header={section.header} content={section.content} />
      ))}
    </div>
  );
};

export default ManualContent;
