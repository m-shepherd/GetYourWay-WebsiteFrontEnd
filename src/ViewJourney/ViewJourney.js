
import React from 'react'
import Flights from '../Flights/Flights'
import AllLegs from './AllLegs'
import { useNavigate } from 'react-router-dom'

const ViewJourney = ({allJourneyLegs, setAllJourneyLegs}) => {

  let navigate = useNavigate();

  return (
    <>
    <AllLegs data={allJourneyLegs} setAllJourneyLegs={setAllJourneyLegs}/>
    <div>
    <button onClick={() => {navigate("/MainPage")}}>Back to main page</button>
    </div>
    </>
  )
}

export default ViewJourney