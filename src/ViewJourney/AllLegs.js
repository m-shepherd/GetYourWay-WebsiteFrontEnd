import React from 'react'
import Leg from './Leg'

const AllLegs = ({data}) => {
    const legs = data.map(currentLeg => {
        //const leg = new LegModel(currentLeg._id,currentLeg.startLocation,currentLeg.startTime,currentLeg.endLocation,currentLeg.endTime,currentLeg.duration);
        return  <Leg id={currentLeg.id} transport={currentLeg.transport} startLocation={currentLeg.startLocation} startTime={currentLeg.startTime} endLocation={currentLeg.endLocation} endTime={currentLeg.endTime} duration={currentLeg.duration}/>
    })
  return (
    <div className="row">
        <h3>Legs</h3>
        <table>
            <thead>
                <tr>
                    <th>Leg</th>
                    <th>Transport</th>
                    <th>Start</th>
                    <th>StartTime</th>
                    <th>End</th>
                    <th>EndTime</th>
                    <th>duration</th>
                </tr>
            </thead>
            <tbody>{legs}</tbody>
        </table>

    </div>
  )
}

export default AllLegs