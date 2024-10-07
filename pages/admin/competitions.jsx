import React, { useState,useEffect } from 'react'
import { Box,Typography,Button } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import Breadcrumb from '../../components/breadCrumb'
import Add from '../../components/competition/add'
import Table from '../../components/competition/table'
import ApiManager from '../../apiManager/apiManager'
import CustomAlert from '../../components/customAlert'

const Competition = () => {
  const [addOpen,setAddOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState([]);
  const [recall,setRecall] = useState(1);
  const [alertData,setAlertData] = React.useState({severity:'',message:''});

  useEffect(()=>{
    (async ()=>{
      try {
        const response = await ApiManager.getCompetetions();
        if(response.data?.status){
          setData(response.data?.data);
        }
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    })();
  },[recall])
  return (
   <>
   {alertData.message && <CustomAlert severity={alertData.severity} onOpen={Boolean(alertData.message)} onClose={()=>setAlertData({...alertData,message:null})} message={alertData.message}/>}
    <Box>
        <Typography variant='h4' fontWeight='700'>Competition</Typography>
        <Breadcrumb currentPage="Competition"/>
        <Box display='flex' justifyContent='flex-end' mb={2} alignItems='center'>
        <Button sx={{float:'right'}} onClick={()=>setAddOpen(true)} variant='contained' endIcon={<AddOutlined />}>Add Competition</Button>
        </Box>
        {addOpen && <Add onOpen={addOpen} onClose={()=>setAddOpen(false)} recall={()=>setRecall(recall + 1)} setAlertData={setAlertData} />}
        <Table isLoading={isLoading} rowData={data}/>
    </Box>
   </>
  )
}

export default Competition
