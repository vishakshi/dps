import React from 'react'
import { Box,Dialog,DialogTitle,DialogContent,IconButton,Typography } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'

const Detail = ({onOpen,onClose,details}) => {
    console.log(details)
  return (
    <Dialog
    maxWidth="sm"
    fullWidth
     open={onOpen}
     onClose={onClose}
   >
     <DialogTitle>
       <>Feedback Details</>
       <IconButton onClick={onClose}><CloseOutlined/></IconButton>
     </DialogTitle>
    <Box>
    <DialogContent>
        <Box>
            {[{key:'name',heading:'Name'},{key:'email',heading:'Email'},{key:'message',heading:'Message'}].map(({key,heading})=>(
                <Box key={key} sx={{display:'flex',alignItems:'center',gap:1,mb:0.5}}><Typography variant='body1' color='grey'>{heading} :</Typography><Typography variant='body1' fontWeight={600}>{details?.[key] || "NA"}</Typography></Box>
            ))}            
        </Box>
    </DialogContent>
    </Box>
    </Dialog>
  )
}

export default Detail
