
import React from 'react'
import Flights from '../Flights/Flights'
import AllLegs from './AllLegs'

const ViewJourney = () => {
    const data = [{
        "id": "1",
        "transport": "flight",
        "startLocation": "Leeds",
        "startTime": "12.00",
        "endLocation": "Paris",
        "endTime": "15.00",
        "duration": "3.00"
    }
]



  return (
    <AllLegs data={data}/>
  )
}

export default ViewJourney