
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

  function logOut() {
    localStorage.removeItem('auth');
    navigate('/')
  }

  return (
    <>
    <div className='padding'>
        <div className='wrapper'>
            <div className='title_text'>
                <div className='title'>DAMM - Get Your Way</div>
            </div>
            <div className='headerBar'>
                <div className='pass_link' onClick={logOut}><a href="">Log Out</a></div>
                <div className='pass_link'><a href="#" onClick={() => navigate("/MainPage")}>Map</a></div>
                <div className='pass_link'><a href="#" onClick={() => navigate("/MainPage")}>Find Flights</a></div>
                <div className='pass_link'><a href="#" onClick={() => navigate("/ViewJourney")}>View Journey</a></div>
            </div>
        </div>
    </div>
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