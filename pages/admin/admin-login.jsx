import React,{useState} from 'react'
import { Box,Typography,TextField,InputAdornment,Button,CircularProgress } from '@mui/material'
import { Lock,Mail } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import CustomAlert from '../../components/customAlert'
import ApiManager from '../../apiManager/apiManager'

const AdminLogin = () => {
    const [formData,setFormData] = useState({userName:"",password:""})
    const [isLoading,setIsLoading] = useState(false);
    const [alertData,setAlertData] = useState({severity:'',message:''});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        setIsLoading(true)
        const response = await ApiManager.adminLogin(formData);
        setIsLoading(false)
        if(response?.data?.status){
        const token = response?.data?.data?.authToken;
        sessionStorage.setItem('@authToken',token);
        sessionStorage.setItem('@userType','admin')
        navigate('/dashboard')
        window.location.reload();
        }else{
            setAlertData({severity:'error',message:response?.data?.message});
        }
    }
    catch(err){
        console.log(err)
        setIsLoading(false)
    }
    }
  return (
    <Box
    sx={{
      backgroundColor: "#ECECEC",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    {alertData.message && <CustomAlert severity={alertData.severity} onOpen={Boolean(alertData.message)} onClose={()=>setAlertData({...alertData,message:null})} message={alertData.message}/>}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: "white",
        gap: 5,
        padding:5,
        borderRadius: 5,
      }}
    >
      <Box>
        <form autoComplete='off' onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" justifyContent='center'>
          {/* <img src={'logo'} style={{ width: "2rem" }} /> */}
          <Typography variant="h4" fontWeight='700' >
            Admin Login
          </Typography>
        </Box>
        <Typography mb={2} color="secondary" variant="body1">
          Enter your username and password to login
        </Typography>
        <TextField
          sx={{ display: "block", mb: 2 }}
          fullWidth
          required
          size="small"
          placeholder="Username"
          variant="outlined"
          value={formData.userName}
          onChange={(e)=>setFormData({...formData,userName:e.target.value})}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail size={15} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          fullWidth
          required
          size="small"
          placeholder="Password"
          variant="outlined"
          type="password"
          value={formData.password}
          onChange={(e)=>setFormData({...formData,password:e.target.value})}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={15} />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" type='submit' disabled={isLoading} fullWidth={true} >
          {isLoading ? <CircularProgress size={24} /> : "Log In"}
        </Button>
        </form>
      </Box>
    </Box>
  </Box>
  )
}

export default AdminLogin
