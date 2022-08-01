import React from 'react'

const Leg = ({id,transport,startLocation,startTime,endLocation,endTime,duration}) => {
  return (
    <tr>
        <td>{id}</td>
        <td><img src={transport+".jpg"} alt={transport}/></td>
        <td>{startLocation}</td>
        <td>{startTime}</td>
        <td>{endLocation}</td>
        <td>{endTime}</td>
        <td>{duration}</td>
    </tr>
  )
}

export default Leg