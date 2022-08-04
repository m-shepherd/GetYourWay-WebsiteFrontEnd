
import React from 'react'
import AllLegs from './AllLegs'
import { useNavigate } from 'react-router-dom'
import styles from './ViewJourney.css'
import { useRef, useState } from 'react'
import { exportComponentAsJPEG } from 'react-component-export-image';


const ViewJourney = ({ allJourneyLegs, setAllJourneyLegs ,setLegId }) => {

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const fadeOut = async (e, t) => {
    console.log(e.target.getAttribute("id"))
    setIsFadingOut(true)
    await delay(t)
    deleteLeg(e)
  }

  let navigate = useNavigate();

  const printRef = useRef();


  const deleteLeg = (e) => {
    const deleteId = e.target.getAttribute("id")
    let i = 1;
    allJourneyLegs.splice(deleteId - 1, 1)
    allJourneyLegs.map(leg => leg.id = i++)
    setAllJourneyLegs([...allJourneyLegs])
    setIsFadingOut(false)  
    setLegId(allJourneyLegs.length + 1)
  }

  const handleJPEGExport = () => {
    exportComponentAsJPEG(printRef)
    
  }

  return (
    <>
      <AllLegs data={allJourneyLegs} isFadingOut={isFadingOut} fadeOut={fadeOut} deleteLeg={deleteLeg} ref={printRef}/>
      <div>
        <button className={styles.button} onClick={() => { navigate("/MainPage") }}>Back to main page</button>
        <button className={styles.button} onClick={handleJPEGExport}>
        Download as JPEG
      </button> 
      </div>
    </>
  )
}

export default ViewJourney