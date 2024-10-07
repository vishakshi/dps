import React,{useState,useEffect} from 'react'
import { Typography,Box, CircularProgress,InputLabel, Autocomplete, TextField, Button } from '@mui/material'
import Breadcrumb from '../../components/breadCrumb'
import SubmissionCard from '../../components/submissionCard';
import ApiManager from '../../apiManager/apiManager';
import DialogLoader from '../../components/DialogLoader';
import CustomAlert from '../../components/customAlert';

const Submission = () => {
  const [data, setData] = useState({});
  const [contestData,setContestData] = useState([])
  const [singleContestData,setSingleContestData] = useState([])
  const [isLoading,setIsLoading] = useState(true);
  const [isDataLoading,setIsDataLoading] = useState(false)
  const [recall,setRecall] = useState(1);
  const [selectedValue,setSelectedValue] = useState("");
  const [alertData,setAlertData] = React.useState({severity:'',message:''});

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiManager.getCompetetions();
        // const response = await ApiManager.getSubmissions();
        if (response.data?.status) {
          setContestData(response.data?.data);
          console.log(response.data?.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleChange  = async (_,selectedVal) => {
    if(selectedVal){
      setSelectedValue(selectedVal);
      setSingleContestData(()=>[]);  
      console.log(selectedVal?._id)
      setIsDataLoading(true);
  // const response = await ApiManager.getSubmissionByContest(selectedVal?._id);
  const response = await ApiManager.getCompetetionDetail(selectedVal?._id);
  if (response.data?.status) {
    setData(()=>(response.data?.data));
    setSingleContestData(()=>(response.data?.data?.submissions));
    console.log('Single Contest',response.data?.data?.submissions,singleContestData);
  }
  setIsDataLoading(false);
    }
  }

  const handleDownload = () => {
    console.log(singleContestData)
    const csvData = singleContestData;
        const fileName = "contest_data.csv";
        const fileType = "text/csv;charset=utf-8;";
        const fileHeaders = ["user.firstName", "user.lastName", "user.email", "type", "tagline"];
        const fileHeadings = ["First Name", "Last Name", "Email", "Type", "Tagline"];

        const csvContent = csvData.map((row) => {
          return fileHeaders.map((field) => {
              const [object, property] = field.split('.'); 
              if (property) {
                  return JSON.stringify(row[object][property] || "", (key, value) => (value === null ? "" : value));
              } else {
                  return JSON.stringify(row[object] || "", (key, value) => (value === null ? "" : value));
              }
          }).join(",");
      });
        csvContent.unshift(fileHeadings.join(","));
        const csvArray = csvContent.join("\r\n");

        const blob = new Blob([csvArray], { type: fileType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
  }


  useEffect(()=>{
    handleChange("",selectedValue);
  },[recall])

  if(isLoading){
    return <CircularProgress/>
  }

  return (
    <Box mb={5}>
      {alertData.message && <CustomAlert severity={alertData.severity} onOpen={Boolean(alertData.message)} onClose={()=>setAlertData({...alertData,message:null})} message={alertData.message}/>}
    <DialogLoader isLoading={isDataLoading} />
    <Typography variant='h4' fontWeight='700'>Participants</Typography>
    <Breadcrumb currentPage="Participants"/>
    <Box my={3}>
      <InputLabel>Select Competition</InputLabel>
      <Autocomplete
      options={contestData}
      getOptionLabel={(option)=>option?.name}
      fullWidth
      size='small'
      renderInput={(params) => <TextField {...params} placeholder='Please select Competition' />}
      onChange={handleChange}
    />
    </Box>
    {/* <Button  onClick={handleDownload} variant="contained">Download CSV</Button> */}
      <Box >
    {singleContestData && singleContestData?.map((cardData,index)=>(
        <SubmissionCard recall={()=>setRecall(recall + 1)} competetionData={data} setAlertData={setAlertData} serialNo={index+1} data={cardData} key={data?._id}/>
      ))}
      </Box>
    </Box>
  )
}

export default Submission
