import car from "./Icons/DRIVING.png"
import plane from "./Icons/FLYING.png"
import './ViewJourney.css'
import { useState } from "react"
import styles from "./ViewJourney.module.css";
import React from "react";

const Leg = ({id,transport,startLocation,startTime,endLocation,
              endTime, duration, isFadingOut, fadeOut}) => {
    
  let transportIcon;

  if (transport === "DRIVING"){
    transportIcon = car;
  } else {
    transportIcon = plane;
  }


  return (
    <tr className='item' id={id}>
        <td legid={id}>{id}</td>
        <td><img src={transportIcon} alt={transport} height="70" width="70"/></td>
        <td>{startLocation}</td>
        <td>{startTime}</td>
        <td>{endLocation}</td>
        <td>{endTime}</td>
        <td>{duration}</td>
        <td>
            <div className={`${styles.field_row} ${styles.btn}`}>
                <div className={styles.btn_layer}></div>
                <input type="submit" href="#" onClick={(e) => {
                    e.target.parentElement.parentElement.parentElement.className = "itemfadeout";
                    fadeOut(e, 300)
                }} value="Delete"/>
            </div>
        </td>
    </tr>
  )
}

export default Leg