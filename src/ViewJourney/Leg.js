import car from "./Icons/DRIVING.png"
import plane from "./Icons/FLYING.png"
import './ViewJourney.css'
import { useState } from "react"

const Leg = ({id,transport,startLocation,startTime,endLocation,
              endTime, duration, isFadingOut, fadeOut}) => {
    
  let transportIcon;

  if (transport === "DRIVING"){
    transportIcon = car;
  } else {
    transportIcon = plane;
  }


  return (
    <tr className={isFadingOut ? 'itemfadeout' : 'item'}>
        <td legid={id}>{id}</td>
        <td><img src={transportIcon} alt={transport} height="70" width="70"/></td>
        <td>{startLocation}</td>
        <td>{startTime}</td>
        <td>{endLocation}</td>
        <td>{endTime}</td>
        <td>{duration}</td>
        <td>
        <div className='btnlayer'></div>
        <input id={id} type="submit" value="Delete" onClick={(e) => fadeOut(e, 300)}/>
        </td>
    </tr>
  )
}

export default Leg