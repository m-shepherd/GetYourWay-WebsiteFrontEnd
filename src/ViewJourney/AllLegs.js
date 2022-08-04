import React, { Component } from 'react'
import Leg from './Leg'
import './ViewJourney.css'

class AllLegs extends Component {
    constructor(props) {
        super(props);
        this.state = { data: this.props.data, deleteLeg: this.props.deleteLeg,
                       isFadingOut: this.props.isFadingOut, fadeOut: this.props.fadeOut}
    }


    render() {
        return (
            <div>
                <h3 className="jheading">Your Journey</h3>
                <table className="journey-table">
                    <thead>
                        <tr>
                            <th>Leg</th>
                            <th>Transport</th>
                            <th>Start</th>
                            <th>StartTime</th>
                            <th>End</th>
                            <th>EndTime</th>
                            <th>duration</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(currentLeg => {
                                return (<Leg id={currentLeg.id} transport={currentLeg.transport} startLocation={currentLeg.startLocation}
                                    startTime={currentLeg.startTime} endLocation={currentLeg.endLocation} endTime={currentLeg.endTime}
                                    duration={currentLeg.duration} key={currentLeg.id}
                                    isFadingOut={this.props.isFadingOut} fadeOut={this.state.fadeOut}/>)
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AllLegs;