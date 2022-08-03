import React from 'react'
import car from "./Icons/DRIVING.png"
import plane from "./Icons/FLYING.png"
import styles from './ViewJourney.css'

const Leg = ({id,transport,startLocation,startTime,endLocation,
              endTime, duration, deleteLeg}) => {

    
  let transportIcon;

  if (transport === "DRIVING"){
    transportIcon = car;
  } else {
    transportIcon = plane;
  }

  return (
    <tr>
        <td legid={id}>{id}</td>
        <td><img src={transportIcon} alt={transport} height="70" width="70"/></td>
        <td>{startLocation}</td>
        <td>{startTime}</td>
        <td>{endLocation}</td>
        <td>{endTime}</td>
        <td>{duration}</td>
        <td><div className={`${styles.field} ${styles.btn} ${styles.col}`}>
                                    <div className={styles.btn_layer}></div>
                                    <input id={id} type="submit" value="Delete" onClick={deleteLeg}/>
                                </div></td>
    </tr>
  )
}

export default Leg