import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box,Typography } from "@mui/material";
import { Margin } from "@mui/icons-material";
import pdf1 from '../assets/Recruitment 12.09.2024.pdf'
import { useTranslation } from "react-i18next";

const ImageSlider = ({ items }) => {
    return (
        <Carousel>
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </Carousel>
    );
};

const Item = ({ item }) => {
    const {t} = useTranslation();
    return (
        <Paper>
            <img src={item.image} alt={item.title} style={{ width: "100%", height: "auto" }} />
            <h2 style={{color:'purple',padding:'20px'}}>{t(item.title)}</h2>
            <p style={{fontSize:'20px',padding:'10px'}}>{t(item.description)}</p>
            <Box sx={{mx:'auto',textAlign:'center'}}><Typography sx={{bgcolor:'#AD41AE',color:'white',py:1,cursor:'pointer'}} variant='h6'><a style={{textDecoration:'none',color:'white'}} href={pdf1} download>{t('vacanciesInformation')}</a></Typography></Box>
        </Paper>
    );
};

export default ImageSlider;
