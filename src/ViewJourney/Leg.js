import React from 'react'
import car from "./Icons/DRIVING.png"
import plane from "./Icons/FLYING.png"
import { useRef } from 'react'

const Leg = ({id,transport,startLocation,startTime,endLocation,
              endTime,duration, allJourneyLegs, setAllJourneyLegs}) => {

  const deleteLeg = (e) => {
    const deleteId = idRef.current.getAttribute("legid")
    const allJourneyLegsCopy = allJourneyLegs

    let newJourneyLegs = allJourneyLegsCopy.filter(leg => leg.id != deleteId)

    setAllJourneyLegs(newJourneyLegs)

  }

  const idRef = useRef(0);

    
  let transportIcon;

  if (transport === "DRIVING"){
    transportIcon = car;
  } else {
    transportIcon = plane;
  }

  return (
    <tr>
        <td legid={id} ref={idRef}>{id}</td>
        <td><img src={transportIcon} alt={transport} height="70" width="70"/></td>
        <td>{startLocation}</td>
        <td>{startTime}</td>
        <td>{endLocation}</td>
        <td>{endTime}</td>
        <td>{duration}</td>
        <td><button onClick={deleteLeg}>Delete</button></td>
    </tr>
  )
}

export default Leg