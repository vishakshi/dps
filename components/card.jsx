import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getFormatDate, isEndGreaterFromToday, todayDate } from '../utiils/dateFormatter';
import { CircularProgress, Grid,IconButton,InputLabel,MenuItem,Select,TextField } from '@mui/material';
import CustomAlert from './customAlert';
import { getDecodedToken } from "../utiils/utility";
import Participate from './participate';
import ConfirmDialog from './confirmDialog';
import { useAuthContext } from '../context/authContext';

export default function CompetitionCard({data,recall,submissionData}) {
    const [open,setOpen] = React.useState(false);
    const [alertData,setAlertData] = React.useState({severity:'',message:''});
    const [successDialog,setSuccessDialog] = React.useState(false);
    const {userDetails} = useAuthContext()
    const [successData,setSuccessData] = React.useState(`Hey, ${userDetails?.firstName || "User"} You have successfully participated in the Competition`)
    const userData = React.useMemo(()=>getDecodedToken(),[]) 
    
    // console.log(submissionData,data)
    const isApplied = React.useMemo(()=>Array.isArray(submissionData) ? submissionData?.find(submission=>submission?.contest?._id === data?._id) : undefined,[recall])


    const getCompetetionType = (type) => {
      switch(type){
       case "logo":
         return "Logo";
       case "englishTagline":
         return "English tagline"
       case "marathiTagline":
         return "Marathi tagline"
       default:
         return "NA" 
      } 
     }

    const handleConfirmation = (responseData) => {
      const name = responseData?.firstName || "" + " " + responseData?.lastName || "";
      const message = `Hey, ${userDetails?.firstName || "User"}! You have successfully participated in the ${getCompetetionType(data?.contestType)} Competition on ${todayDate()}`;
      setSuccessData(message);
      setSuccessDialog(true);
      console.log(responseData)
    }

  return (
    <>
    {alertData.message && <CustomAlert severity={alertData.severity} onOpen={Boolean(alertData.message)} onClose={()=>setAlertData({...alertData,message:null})} message={alertData.message}/>}
    <Grid item md={6} xs={12}>
    <Card sx={{ display: 'flex',flexWrap: {xs:'wrap',md:'nowrap'}}}>
          <CardMedia
        component="img"
        sx={{ height:{xs:'auto',md:200},width:{xs:'100%',md:150} }}
        image={data?.icon}
        alt="Image"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column',width:'100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {data?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
           Competition Type: <span style={{fontWeight:700,textTransform:'capitalize'}}> {getCompetetionType(data?.contestType)}</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Start Date: <span style={{fontWeight:700}}>{getFormatDate(data?.startDate)}</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            End Date: <span style={{fontWeight:700}}>{getFormatDate(data?.endDate)}</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Prize Money: <span style={{fontWeight:700}}> ₹{data?.prizeValue}</span>
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'flex-end', pl: 1, pb: 1,pr:1 }}>
         {isEndGreaterFromToday(data?.endDate) ? <Button color='error'>Competition has been ended</Button> : <Button color='info' disabled={isApplied} onClick={()=>setOpen(true)} sx={{px:5}} variant='contained'>Participate</Button>}
        </Box>
      </Box>
    </Card>
    </Grid>
   {open && <Participate onOpen={open} handleConfirmation={handleConfirmation} onClose={()=>setOpen(false)} setAlertData={setAlertData} contestId={data?._id} recall={recall} competetionType={data?.contestType || "logo"}/>}
   <ConfirmDialog onOpen={successDialog} onClose={()=>setSuccessDialog(false)} onConfirm={()=>setSuccessDialog(false)} title="Success" message={successData}/>
    </>
  );
}