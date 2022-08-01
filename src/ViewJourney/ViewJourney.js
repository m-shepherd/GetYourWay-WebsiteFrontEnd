
import React from 'react'
import Flights from '../Flights/Flights'
import AllLegs from './AllLegs'
import { useNavigate } from 'react-router-dom'

const ViewJourney = ({allJourneyLegs}) => {

  let navigate = useNavigate();

  return (
    <>
    <AllLegs data={allJourneyLegs}/>
    <button onClick={() => {navigate("/MainPage")}}>Back to main page</button>
    </>
  )
}

export default ViewJourney