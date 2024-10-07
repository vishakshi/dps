import React,{useState,useEffect} from 'react'
import { Box,Typography } from '@mui/material'
import Breadcrumb from '../../components/breadCrumb'
import Table from '../../components/user/table'
import ApiManager from '../../apiManager/apiManager'

const Users = () => {
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState([]);

  useEffect(()=>{
    (async ()=>{
      try {
        const response = await ApiManager.getUsers();
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
   <>
    <Box>
        <Typography variant='h4' fontWeight='700'>Users</Typography>
        <Breadcrumb currentPage="Users"/>
        <Box mt={2}>
        <Table isLoading={isLoading} rowData={data}/>
        </Box>
    </Box>
   </>
  )
}

export default Users
