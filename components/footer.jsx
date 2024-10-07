import React from 'react';
import { AppBar, Box, Toolbar, Typography, Grid, IconButton } from '@mui/material';
import { PhoneAndroid  } from '@mui/icons-material';
import BusinessIcon from '@mui/icons-material/Business';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import youtube from '../assets/youtube.png';
import facebook from '../assets/facebook.png';
import instagram from '../assets/instagram.png';
import linkedin from '../assets/linkedin.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ApiManager from '../apiManager/apiManager';

// import MessageForm from './MessageForm';


const Footer = () => {
  const [data,setData] = React.useState(0);
  React.useEffect(()=>{
    (async ()=>{
      try {
        const response = await ApiManager.visitCounter();
          setData(response.data?.count || 115);
      } catch (error) {
        console.log(error)
      }
    })();
  },[])
  const {t} = useTranslation();
  return (
    <Box >
      <AppBar component={"footer"} position="static" sx={{ bgcolor: "purple", paddingY:'60px',paddingX:{xs:'20px',md:'60px'},paddingBottom:'20px' }}>
        <Toolbar>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  {t('pimpriChinchwadMunicipalCorporation')}
                </Typography>
                <Typography variant="h4" gutterBottom>
                {t('divyangBhavan')}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant="body1" sx={{ marginTop: '5px', paddingLeft: '30px', paddingRight: '30px' }}>

                  "{t('committedEmpowerment')} -<br/> {t('pimpriChinchwadMunicipalCorporation')}"
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                <Typography variant="body1" sx={{ marginTop: '5px' }}>
                {t('connectWithUs')}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <IconButton component='a' href="https://www.facebook.com/profile.php?id=61563587007236" target="_blank">
                  <Typography component='img' src={facebook} height={30} />
                </IconButton>
                <IconButton component='a' href="https://www.instagram.com/divyang_bhavan_pcmc/" target="_blank">
                  <Typography component='img' src={instagram} height={30} />
                </IconButton>
                <IconButton component='a' href="https://linkedin.com/company/divyang-bhavan-pcmc" target="_blank">
                  <Typography component='img' src={linkedin} height={30} />
                </IconButton>
                <IconButton component='a' href="https://www.youtube.com/@DivyangBhavanPCMC" target="_blank">
                  <Typography component='img' src={youtube} height={30} />
                </IconButton>
              </Box>


            </Grid>


            {/* Second Grid - Services */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                {t('quickLinks')}
                </Typography>

              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ marginTop: '8px' }}>
                   {t('home')}</Typography>
                <Typography variant="body1" sx={{ marginTop: '8px' }}>
                   {t('aboutUs')}</Typography>
                <Typography variant="body1" sx={{ marginTop: '8px' }}>
                <Link to='/contact-us' style={{textDecoration:'none',color:'white'}}>
                   {t('contactUs')}
                   </Link>
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '8px' }}>
                  <Link to='/privacy-policy' style={{textDecoration:'none',color:'white'}}>
                   {t('privacyPolicy')}
                   </Link>
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '8px' }}>
                   {t('advertisementInfo')}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '8px' }}>
                 {t('rightToInformation')}
                </Typography>
              </Box>
            </Grid>

            {/* Third Grid - Legal */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="h6" gutterBottom>
                {t('contact')}
                </Typography>

              </Box>
              <Typography variant="body1" sx={{ marginTop: '10px',display:'flex',alignItems:'center' }}>< PhoneAndroid fontSize='large' sx={{paddingRight:'10px'}}/>  +919604810938 </Typography>
              <Typography variant="body1" sx={{ marginTop: '10px',display:'flex',alignItems:'center' }}>< PhoneAndroid fontSize='large' sx={{paddingRight:'10px'}}/> +918007182510 </Typography>
              <Typography variant="body1" sx={{ marginTop: '10px',display:'flex',alignItems:'center' }}> <MailOutlineIcon fontSize='large' sx={{paddingRight:'10px'}}/>divyang.bhavan@pcmcindia.gov.in</Typography>
              <Typography variant="body1" sx={{ marginTop: '10px',display:'flex',alignItems:'center' }}> <BusinessIcon fontSize='large' sx={{paddingRight:'10px'}}/> {t('pcmcAddress')}</Typography>
               
            </Grid>

            {/* Fourth Grid - Map */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
              {t('accessibleGuide')}
              </Typography>
              <Box sx={{ height: '150px', bgcolor: 'lightgray',marginBottom:'20px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60490.87740930302!2d73.72488644863284!3d18.633464800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b900278ee283%3A0x39128fd40130e550!2sPimpri%20Chinchwad%20Divyang%20Bhawan%20Foundation!5e0!3m2!1sen!2sin!4v1723469601637!5m2!1sen!2sin"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
              {/* <MessageForm/> */}
              <Typography variant="body1" gutterBottom>
              {t('siteVisits')}: {data}
              </Typography>
            </Grid>
           
          </Grid>
        
        </Toolbar>
        <Box
            sx={{
          
              display: 'flex',
           marginLeft:'10%',
              width: '80%',
             
             justifyContent:'center',
             alignContent:'center',
             alignItems:'center',
              height: '1px',
              bgcolor: 'white',
              marginY: '40px',
            }}
          ></Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%', paddingTop: '0px' }}>
          <Typography>
            All Rights Reserved Powered By Azown
          </Typography>
        </Box>

      </AppBar>
    </Box>
  );
}

export default Footer;

