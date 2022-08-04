import React, { Component } from 'react'
import Leg from './Leg'
import styles from './ViewJourney.module.css'
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
                <div className="padding">
                    <div className={styles.title_text}>
                        <div className={styles.title}>Your Journey</div>
                    </div>
                </div>
                <div className={styles.tableFixHead}>
                    <table>
                        <thead>
                            <tr>
                                <th>Leg Number</th>
                                <th>Transport</th>
                                <th>Start</th>
                                <th>Start Time</th>
                                <th>End</th>
                                <th>End Time</th>
                                <th>Duration</th>
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
            </div>
        )
    }
}

export default AllLegs;