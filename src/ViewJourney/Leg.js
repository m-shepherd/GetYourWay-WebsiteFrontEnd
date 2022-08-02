import React from 'react'
import car from "./Icons/DRIVING.png"
import plane from "./Icons/FLYING.png"

const Leg = ({id,transport,startLocation,startTime,endLocation,endTime,duration}) => {

  let transportIcon;

  if (transport === "DRIVING"){
    transportIcon = car;
  } else {
    transportIcon = plane;
  }

  return (
    <tr>
        <td>{id}</td>
        <td><img src={transportIcon} alt={transport} height="70" width="70"/></td>
        <td>{startLocation}</td>
        <td>{startTime}</td>
        <td>{endLocation}</td>
        <td>{endTime}</td>
        <td>{duration}</td>
        <td><button>Delete</button></td>
    </tr>
  )
}

export default Leg