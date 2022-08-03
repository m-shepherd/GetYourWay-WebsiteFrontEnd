
import React from 'react'
import AllLegs from './AllLegs'
import { useNavigate } from 'react-router-dom'
import styles from './ViewJourney.css'
// import { useRef, useEffect } from 'react'
// import html2canvas from 'html2canvas';
//import { jsPDF } from 'jspdf';

const ViewJourney = ({ allJourneyLegs, setAllJourneyLegs }) => {

  let navigate = useNavigate();

  // const print = useRef();

  // useEffect(() => {}, [print])

  // const handleDownloadPdf = async () => {
  //     const canvas = await html2canvas(print);
  //     const image = canvas.toDataURL("image/png", 1.0);
  //     downloadImage(image, "Journey");
  //     };const downloadImage = (blob, fileName) => {
  //     const fakeLink = window.document.createElement("a");
  //     fakeLink.style = "display:none;";
  //     fakeLink.download = fileName;
      
  //     fakeLink.href = blob;
      
  //     document.body.appendChild(fakeLink);
  //     fakeLink.click();
  //     document.body.removeChild(fakeLink);
      
  //     fakeLink.remove();
  // };

  return (
    <>
      <AllLegs data={allJourneyLegs} setAllJourneyLegs={setAllJourneyLegs}/>
      <div>
        <button className={styles.button} onClick={() => { navigate("/MainPage") }}>Back to main page</button>
        {/* <button type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button> */}
      </div>
    </>
  )
}

export default ViewJourney