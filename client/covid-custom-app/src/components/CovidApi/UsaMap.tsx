import React, { Component } from 'react';
import USAMap from "react-usa-map";
 
function UsaMap() {
  /* mandatory */

  const mapHandler = (event:any) => {
    alert(event.target.dataset.name);
  };
 

    return (
      <div className="App">
        <USAMap onClick={mapHandler} />
      </div>
    );
  
}
 
export default UsaMap;