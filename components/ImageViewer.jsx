import { Box, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ApiManager from '../apiManager/apiManager';

const ImageViewer = ({ imageKey,width }) => {
    const [url,setUrl] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
       const getUrl = async () => {
          try {
            const response = await ApiManager.getSignedUrl(imageKey);
            if (response.data?.status) {
                setUrl(response.data?.data);
              console.log("QWErt",response.data?.data);
            }
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }
        if(imageKey){
            getUrl();
        }
      }, []);
      if(isLoading){
        return(
        <Box sx={{display:'flex',justifyContent:'center'}} width={width}>
        <CircularProgress/>
        </Box>
    )
      }
  return (<Box component='img' width={width} src={url}  />)
}

export default ImageViewer
