
import React from 'react'
import AllLegs from './AllLegs'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';

// import { useRef, useEffect } from 'react'
// import html2canvas from 'html2canvas';
//import { jsPDF } from 'jspdf';

const ViewJourney = ({ allJourneyLegs, setAllJourneyLegs }) => {

  let navigate = useNavigate();

  const printRef = useRef();

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

  const deleteLeg = (e) => {
    const deleteId = e.target.getAttribute("id")
    let i = 1;

    allJourneyLegs.splice(deleteId - 1, 1)
    allJourneyLegs.map(leg => leg.id = i++)
    setAllJourneyLegs([...allJourneyLegs])    

  }




  return (
    <>
      <AllLegs data={allJourneyLegs} deleteLeg={deleteLeg} ref={printRef}/>
      <div>
        <button onClick={() => { navigate("/MainPage") }}>Back to main page</button>
        <button type="button" onClick={() => exportComponentAsJPEG(printRef)}>
        Download as JPEG
      </button> 
      </div>
    </>
  )
}

export default ViewJourney