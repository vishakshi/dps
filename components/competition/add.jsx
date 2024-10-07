import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers';
import { InputLabel,TextField,IconButton, CircularProgress, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import { CloseOutlined, X } from '@mui/icons-material';
import ApiManager from '../../apiManager/apiManager';
import { competitionSchema } from '../../utiils/validationSchema';


const Add = ({onOpen,onClose,recall,setAlertData}) => {
  const [isSubmitting,setIsSubmitting] = useState(false);
    const handleSubmit = async (values) => {
      setIsSubmitting(true)
        console.log(values);
        try {
          let formData = new FormData();
          for(const key in values){
            formData.append(key,values[key]);
          }
          const response = await ApiManager.addCompetetion(formData);
          console.log(response)
          if(response.data?.status){
            console.log(response.data);
            setAlertData({severity:'success',message:response?.data?.message});
            recall();
            onClose();
          }else{
            setAlertData({severity:'error',message:response?.data?.message});
          }
        } catch (error) {
          
        }finally{
          setIsSubmitting(false)
        }
    }
    
    const formik = useFormik({
        initialValues:{
          contestType:'logo',
          name:'',
          startDate:null,
          endDate:null,
          icon:'',
          prizeType:'',
          prizeValue:'',
          prizeDescription:'',
        },
        onSubmit:handleSubmit,
        validationSchema:competitionSchema
    })

    const getErrorProps = (field) => {
      return {
        helperText: formik.touched[field] && formik.errors[field],
        error: formik.touched[field] && Boolean(formik.errors[field])
      };
    };
  return (
    <React.Fragment>

    <Dialog
     maxWidth="sm"
     fullWidth
      open={onOpen}
      onClose={onClose}
    >
      <DialogTitle>
        <>Add Competition</>
        <IconButton onClick={onClose}><CloseOutlined/></IconButton>
      </DialogTitle>
      <form autoComplete='off' onSubmit={formik.handleSubmit}> 
      <DialogContent>
        <Grid container spacing={1} >
        <Grid item sm={12} xs={12}>
          <InputLabel>Competition Type</InputLabel>
          <RadioGroup
        row
        sx={{gap:5}}
        {...formik.getFieldProps('contestType')}
      >
        <FormControlLabel value="logo" control={<Radio size='small' />} label='Logo' />
        <FormControlLabel value="englishTagline" control={<Radio size='small' />} label='English Tagline' />
        <FormControlLabel value="marathiTagline" control={<Radio size='small' />} label='Marathi Tagline' />
      </RadioGroup>
          </Grid>
          <Grid item sm={12}>
          <InputLabel>Competition Name</InputLabel>
          <TextField fullWidth size='small' {...formik.getFieldProps("name")} {...getErrorProps("name")} />
          </Grid>
          <Grid item sm={6}>
          <InputLabel>Start Date</InputLabel>
          <DatePicker format='DD/MM/YYYY' slotProps={{textField:{size:'small',fullWidth:true,...getErrorProps('startDate')}}} onChange={(e)=>formik.setFieldValue('startDate',e.format())}/>
          </Grid>
          <Grid item sm={6}>
          <InputLabel>End Date</InputLabel>
          <DatePicker format='DD/MM/YYYY' slotProps={{textField:{size:'small',fullWidth:true,...getErrorProps('endDate')}}} onChange={(e)=>formik.setFieldValue('endDate',e.format('YYYY-MM-DDTHH:mm:ss'))} />
          </Grid>
          {/* <Grid item sm={6}>
          <InputLabel>Total Contestants</InputLabel>
          <TextField fullWidth size='small' {...formik.getFieldProps("maxContestant")} {...getErrorProps("maxContestant")} />
          </Grid> */}
          {/* <Grid item sm={6}>
          <InputLabel>Joining Fee</InputLabel>
          <TextField fullWidth size='small' {...formik.getFieldProps("joiningFee")} {...getErrorProps("joiningFee")} />
          </Grid> */}
          <Grid item sm={12}>
          <InputLabel>Prize Description</InputLabel>
          <TextField multiline rows={2} fullWidth size='small' {...formik.getFieldProps("prizeDescription")} {...getErrorProps("prizeDescription")} />
          </Grid>
          <Grid item sm={6}>
          <InputLabel>Prize Value</InputLabel>
          <TextField fullWidth size='small' {...formik.getFieldProps("prizeValue")} {...getErrorProps("prizeValue")} />
          </Grid>
          <Grid item sm={6}>
          <InputLabel>Icon</InputLabel>
          <TextField fullWidth type="file" size='small' onChange={(event)=>formik.setFieldValue('icon',event.currentTarget.files[0])} {...getErrorProps("icon")} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='info' disabled={isSubmitting} type='submit'>{isSubmitting ? <CircularProgress size={22}/> : "Submit"}</Button>
      </DialogActions>
      </form>
    </Dialog>
  </React.Fragment>
  )
}

export default Add
