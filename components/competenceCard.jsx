import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import socialJustice from "../assets/social-justice.png";
import seminar from "../assets/seminar.png";
import { useTranslation } from "react-i18next";

const Card = ({icon,heading,description}) => {
  return (
    <>
    <Box sx={{ display: "flex", py: 2,mx:{xs:2,md:0}, px: 4,bgcolor:'#800080',gap:5,alignItems:'center',borderRadius:5,color:'white',minHeight:200,zIndex:99,position:'relative' }}>
      <Box>
        <Box component="img" width={50} src={icon} />
      </Box>
      <Box sx={{display:'flex',flexDirection:'column',gap:2}}>
        <Typography variant="h5" fontWeight={700}>{heading}</Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
    </Box>
    <Box sx={{paddingY:1,backgroundColor:'#FAD9DA',width:{xs:'85%',md:'95%'},mx:'auto',marginTop:-1,borderRadius:5}}></Box>
    </>
  );
};

const CompetenceCard = () => {
    const {t} = useTranslation();
    const cardData = [
        {
            id:'01',
            icon:socialJustice,
            heading:t('competenceAndSelfEsteem'),
            description:t('empowermentAndSelfEsteemDescription')
        },
        {
            id:'02',
            icon:seminar,
            heading:t('empowermentOfDisabled'),
            description:t('empowermentOfDisabledDescription')
        }
    ]
  return (
    <Grid container sx={{'@media (min-width:768px)':{px:20},pt:3,pb:5,bgcolor:'white'}} spacing={2}>
      {cardData.map(({id,heading,description,icon}) => (
        <Grid sm={6} md={6} item>
          <Card key={id} heading={heading} icon={icon} description={description} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CompetenceCard;
