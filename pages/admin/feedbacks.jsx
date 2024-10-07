import React, { useState,useEffect } from 'react'
import { Box,Typography,Button } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import Breadcrumb from '../../components/breadCrumb'
import Add from '../../components/competition/add'
import Table from '../../components/feedback/table'
import ApiManager from '../../apiManager/apiManager'
import CustomAlert from '../../components/customAlert'

const Feedback = () => {
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState([]);

  useEffect(()=>{
    (async ()=>{
      try {
        const response = await ApiManager.getFeedbacks();
        if(response.data?.status){
          setData(response.data?.data);
        }
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    })();
  },[])
  return (
    <Box>
        <Typography variant='h4' fontWeight='700'>Feedback</Typography>
        <Breadcrumb currentPage="Feedback"/>
        <Box display='flex' justifyContent='flex-end' mb={2} alignItems='center'>
        </Box>
        <Table isLoading={isLoading} rowData={data}/>
    </Box>
  )
}

export default Feedback
