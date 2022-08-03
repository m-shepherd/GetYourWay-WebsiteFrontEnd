import React, { Component } from 'react'
import Leg from './Leg'
import './ViewJourney.css'

class AllLegs extends Component {
    constructor(props) {
        super(props);
        this.state = { data: this.props.data, deleteLeg: this.props.deleteLeg }
    }


    render() {
        return (
            <div>
                <h3 class="jheading">Your Journey</h3>
                <table class="journey-table">
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
                    <tbody>
                        {
                            this.state.data.map(currentLeg => {
                                return (<Leg id={currentLeg.id} transport={currentLeg.transport} startLocation={currentLeg.startLocation}
                                    startTime={currentLeg.startTime} endLocation={currentLeg.endLocation} endTime={currentLeg.endTime}
                                    duration={currentLeg.duration} key={currentLeg.id} deleteLeg={this.state.deleteLeg}/>)
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AllLegs;