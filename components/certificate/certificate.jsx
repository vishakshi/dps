import React, { useRef } from 'react'
import './certificate.css'
import pcmc from '../../assets/shivaji-logo.png'
import signature from '../../assets/signature.png'
import { Dialog,Box,DialogTitle,IconButton,DialogContent,DialogActions,Button } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { useAuthContext } from '../../context/authContext';

const options = {
    // default is `save`
    method: 'open',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
       // margin is in MM, default is Margin.NONE = 0
       margin: Margin.SMALL,
       // default is 'A4'
       format: 'A4',
       orientation: 'landscape',
    },
    canvas: {
       // default is 'image/jpeg' for better size performance
       mimeType: 'image/png',
       qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break, 
    // so use with caution.
    overrides: {
       // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
       pdf: {
          compress: true
       },
       // see https://html2canvas.hertzen.com/configuration for more options
       canvas: {
          useCORS: true
       }
    },
 };

function Certificate({onOpen,onClose,contestName}) {
    const targetRef = useRef();
    const {userDetails} = useAuthContext();
    console.log(contestName)
    const getCategory = (type) => {
      switch(type){
        case "englishTagline":
          return "English Tagline";
        case "marathiTagline":
          return "Marathi Tagline";
        case "logo":
          return "Logo Competition";
        default :
          return "Competition"
      }
    }
  return (
    <Dialog
    maxWidth="lg"
    fullWidth
    scroll="body"
     open={onOpen}
     onClose={onClose}
   >
     <DialogTitle>
       <>Download Certificate</>
       <IconButton onClick={onClose}><CloseOutlined/></IconButton>
     </DialogTitle>
     <DialogContent>
    <Box pt={5}>
    <Box >
    <div  ref={targetRef} className='continer'>
      <div className='top'>
      <div className='logo-left'>
        <p style={{fontWeight:"500",textAlign:"center",color:'#1B3360',marginLeft:"-120px",textTransform:'capitalize',lineHeight:1.2}}><span>Pimpri Chinchwad Mahanagar Palika </span><span style={{display:'inline-block',fontWeight:"600"}}> Divyang Bhavan Foundation</span></p>
      </div>
      <div className='logo-right'>
        <img src={pcmc} style={{height:'70px'}} />
      </div>
      </div>
      <div className='title'>
        <p style={{color:'#1B3360'}}>Certificate</p>
        <p style={{fontFamily:"monospace",fontSize:"30px",color:"black",fontWeight:500,letterSpacing:'normal'}}>of Appreciation</p>
      </div>
      <div className='midtext'>
        <p>This certificate is proudly presented to</p>
      </div>
     
      <div className='name'>
        <p style={{fontSize:"40px",fontStyle:"italic"}}> {userDetails?.userType === "company" ? (userDetails?.companyName || "") : ((userDetails?.firstName || "") + " " + (userDetails?.lastName || "")) } </p>
        <p style={{letterSpacing:'-1.5px'}}>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
      </div>
      <div className='content'>
        <p style={{textAlign:'center'}}>We are honoring you for participating in the <span style={{fontWeight:800}}>{getCategory(contestName?.contestType)}</span>, {(contestName?.contestType === "englishTagline" || contestName?.contestType === "englishTagline") && "For Tagline Competition"} which was held during 15/08/2024 to 31/08/2024 and sharing new invention of imagination with us, we appreciate your talent and honor your imagination.</p>
      </div>
      <div className='footer'>
        <div className='date'>
            <p style={{fontWeight:800}}> 21 September 2024</p>
            <p style={{borderBottom:'3px solid black',width:'200px',marginTop:'12px',marginBottom:'12px'}}></p>
            <p>DATE</p>

        </div>
        <div className='sign'>
            <img src={signature} alt="Omprakash Deshmukh" className='signature-img' height='100'/>
            <p style={{borderBottom:'3px solid black',width:'200px',marginBottom:'12px'}}></p>
            <p>Omprakash Deshmukh</p>
            <p style={{fontWeight:700,fontSize:'17px'}}>(IAS Retd.)</p>
            <p style={{fontWeight:700,fontSize:'17px'}}>Managing Director</p>
        </div>
        
      </div>
    </div>
    </Box>
    </Box>
    </DialogContent>
    <DialogActions sx={{borderTop:'1px solid #EFE7EB'}} >
       <Button variant='contained' color='info' type='submit' onClick={() => generatePDF(targetRef, {filename: 'certificate.pdf',page:{orientation:'landscape',margin:Margin.SMALL}})}>Download Certificate</Button>
     </DialogActions>
    </Dialog>
  );
}

export default Certificate;
