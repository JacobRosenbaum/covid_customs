import React, { Component } from 'react';
import { useState, useEffect, useContext } from 'react';
import USAMap from "react-usa-map";
import '../../assets/css/map.css';
import AuthContext from '../AuthContext';
 
function UsaMap() {
  /* mandatory */

  const[mapStateVar, setMapStateVar] = useState<any>(0);
  const auth = useContext(AuthContext);

  useEffect(() => {
    updateMapState()
  }, [mapStateVar]);

  const mapHandler = (event:any) => {
    setMapStateVar(event.target.dataset.name);
  };

  const updateMapState = () => {
    auth.updateMapState(mapStateVar);
  }
 

    return (
      <div className="main">
        <div className="App">
          <USAMap onClick={mapHandler} className="selectedState" />
        </div>
      </div>
    );
  
}
 
export default UsaMap;