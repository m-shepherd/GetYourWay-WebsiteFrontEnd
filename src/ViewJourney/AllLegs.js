
import React from 'react'
import Leg from './Leg'

const AllLegs = ({ data, setAllJourneyLegs }) => {

    const dataCopy = data
    
    const legs = data.map(currentLeg => {
        //const leg = new LegModel(currentLeg._id,currentLeg.startLocation,currentLeg.startTime,currentLeg.endLocation,currentLeg.endTime,currentLeg.duration);
        return <Leg id={currentLeg.id} transport={currentLeg.transport} startLocation={currentLeg.startLocation} 
                startTime={currentLeg.startTime} endLocation={currentLeg.endLocation} endTime={currentLeg.endTime}
                duration={currentLeg.duration} key={currentLeg.id} allJourneyLegs={dataCopy} setAllJourneyLegs={setAllJourneyLegs} />
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

export default AllLegs;





// import React, { Component } from 'react'
// import Leg from './Leg'
// import Table from 'react-bootstrap/Table';

// class AllLegs extends Component {
//     constructor(props){
//         super(props);
//         this.state = {dataTemp : this.props.data,
//                       setAllJourneyLegs: this.props.setAllJourneyLegs}
//     }

    
//     // // const legs = data.map(currentLeg => {
//     // //     return <Leg id={currentLeg.id} transport={currentLeg.transport} startLocation={currentLeg.startLocation} 
//     // //             startTime={currentLeg.startTime} endLocation={currentLeg.endLocation} endTime={currentLeg.endTime}
//     // //             duration={currentLeg.duration} key={currentLeg.id} allJourneyLegs={dataCopy} setAllJourneyLegs={setAllJourneyLegs} />
//     // }) 

//     dataCopy = this.state.dataTemp
    

//     render(){
//     return (
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Leg</th>
//                             <th>Transport</th>
//                             <th>Start</th>
//                             <th>StartTime</th>
//                             <th>End</th>
//                             <th>EndTime</th>
//                             <th>duration</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {
//                     this.props.data.map(currentLeg => { 
//                 return( <Leg id={currentLeg.id} transport={currentLeg.transport} startLocation={currentLeg.startLocation} 
//                 startTime={currentLeg.startTime} endLocation={currentLeg.endLocation} endTime={currentLeg.endTime}
//                 duration={currentLeg.duration} key={currentLeg.id} allJourneyLegs={this.dataCopy} setAllJourneyLegs={this.state.setAllJourneyLegs} />)})}
//                     </tbody>
//                 </Table>
//     )}
// }

// export default AllLegs;