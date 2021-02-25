import React, { Component } from 'react';
import { useState, useEffect, useContext } from 'react';
import USAMap from "react-usa-map";
import '../../assets/css/map.css';
import AuthContext from '../AuthContext';

function UsaMap() {
  /* mandatory */

  const [mapStateVar, setMapStateVar] = useState<any>(0);
  const auth = useContext(AuthContext);

  useEffect(() => {
    updateMapState()
  }, [mapStateVar]);

  const mapHandler = (event: any) => {
    let stateClass = document.getElementsByClassName(mapStateVar);
    for (let i = 0; i < stateClass.length; i++) {
      stateClass[i].removeAttribute("style");
    }
    if (mapStateVar == event.target.dataset.name) {
      setMapStateVar(0);
    } else {
      stateClass = document.getElementsByClassName(event.target.dataset.name);
      for (let i = 0; i < stateClass.length; i++) {
        stateClass[i].setAttribute("style", "fill: firebrick !important;");
      }
      setMapStateVar(event.target.dataset.name);
    }
  };

  const updateMapState = () => {
    auth.updateMapState(mapStateVar);
  }


  return (

    
        <USAMap width={650} height={500} onClick={mapHandler} className="selectedState" />
    

  );

}

export default UsaMap;