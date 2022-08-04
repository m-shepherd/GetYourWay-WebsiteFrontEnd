import React, {useEffect} from 'react'
import AllLegs from './AllLegs'
import { useNavigate } from 'react-router-dom'
import styles from './ViewJourney.module.css'
import './ViewJourney.css'
import { useRef, useState } from 'react'
import { exportComponentAsJPEG } from 'react-component-export-image';


const ViewJourney = ({ allJourneyLegs, setAllJourneyLegs ,setLegId }) => {

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const fadeOut = async (e, t) => {
    setIsFadingOut(true)
    await delay(t)
    deleteLeg(e)
  }

  let navigate = useNavigate();

  const printRef = useRef();


  const deleteLeg = (e) => {
    const deleteId = e.target.parentElement.parentElement.parentElement.getAttribute("id")
    let i = 1;
      allJourneyLegs.splice(deleteId - 1, 1)
    allJourneyLegs.map(leg => leg.id = i++)
    setAllJourneyLegs([...allJourneyLegs])
      e.target.parentElement.parentElement.parentElement.className="item"
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

  useEffect(() => {
      if (allJourneyLegs.length > 0) {
          document.getElementById("allJourneyLegs").style.display = "block";
          document.getElementById("jpeg").style.display = "inline-block";
      } else {
          document.getElementById("allJourneyLegs").style.display = "none";
          document.getElementById("jpeg").style.display = "none";
      }
  }, [allJourneyLegs])

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
        <div className={styles.wrapper}>
            <div id="allJourneyLegs">
                <AllLegs data={allJourneyLegs} isFadingOut={isFadingOut} fadeOut={fadeOut} deleteLeg={deleteLeg} ref={printRef}/>
            </div>
            <div className={styles.center}>
                <div className={`${styles.field} ${styles.btn}`}>
                    <div className={styles.btn_layer}></div>
                    <input type="submit" href="#" onClick={() => { navigate("/MainPage") }} value="Back To Main Page"/>
                </div>

                <div id="jpeg" className={`${styles.field} ${styles.btn}`}>
                    <div className={styles.btn_layer}></div>
                    <input type="submit" href="#" onClick={handleJPEGExport} value="Download as JPEG"/>
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewJourney