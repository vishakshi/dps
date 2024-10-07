import React,{useState,useEffect} from "react";
import { Typography, Box } from "@mui/material";
import Breadcrumb from "../../components/breadCrumb";
import SubmissionCard from "../../components/submissionCard";
import ApiManager from "../../apiManager/apiManager";
import { useParams } from "react-router-dom";
import { getFormatDate } from "../../utiils/dateFormatter";

const CompetetionDetail = () => {
    const {id} = useParams()
    const [data, setData] = useState({});
    const [isLoading,setIsLoading] = useState(false);
    const [recall,setRecall] = useState(1);
  
    useEffect(() => {
      (async () => {
        try {
          const response = await ApiManager.getCompetetionDetail(id);
          if (response.data?.status) {
            setData(response.data?.data);
            console.log(response.data?.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }, [recall]);
    if(isLoading){
      return <CircularProgress/>
    }

  return (
    <>
      <Box>
        <Typography variant="h4" fontWeight="700">
          Competition Details
        </Typography>
        <Breadcrumb
          pages={[{ name: "Competition", path: "/competition" }]}
          currentPage="Competition Details"
        />
      </Box>
      <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 5,mt:2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body2" sx={{ color: "grey" }}>
              Name:{" "}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {data?.name}
            </Typography>
          </Box>
          <Typography variant="body2">
            {getFormatDate(data?.startDate)} to {getFormatDate(data?.endDate)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{display:'flex',gap:2}}>
            <Typography variant="body2" sx={{ color: "grey" }}>
              Prize Money:{" "}
            </Typography>
            <Typography variant="body2">
              {data?.prizeValue || 0}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body2" sx={{ color: "grey" }}>
              Total Applicants
            </Typography>
            <Typography variant="body2">
              {Array.isArray(data?.participants) ? data?.participants?.length : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography my={2} variant="body2">Submissions Lists</Typography>
      {data?.submissions?.map((data,index)=>(
        <SubmissionCard serialNo={index+1} data={data} key={data?._id}/>
      ))}
    </>
  );
};

export default CompetetionDetail;
