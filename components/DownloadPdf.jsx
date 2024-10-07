import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ApiManager from '../apiManager/apiManager';

const DownloadPdf = ({ imageKey }) => {
    const [url,setUrl] = useState("");
    const [isLoading,setIsLoading] = useState(false);
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
  return (<Button>
    <a href={url} target="_blank" download>
        View PDF
    </a>
  </Button>)
}

export default DownloadPdf
