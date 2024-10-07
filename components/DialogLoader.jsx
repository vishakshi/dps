import React from 'react'
import { Dialog,DialogContent,CircularProgress,Typography,Box } from '@mui/material'

const DialogLoader = ({isLoading}) => {
  return (
    <div>
         <Dialog open={isLoading}>
       <DialogContent>
       <Box sx={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
          <CircularProgress />
         <Typography variant="body1">
         Please wait while the data loads...
         </Typography>
       </Box>
        
       </DialogContent>
     </Dialog>
    </div>
  )
}

export default DialogLoader
