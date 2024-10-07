import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box } from "@mui/material";
import d1 from "../../assets/d1.png"
import d2 from "../../assets/d2.jpg"
import d3 from "../../assets/d3.jpg"
import d4 from "../../assets/d4.jpeg"
import d1En from "../../assets/d1_en.png"
import d2En from "../../assets/d2_en.png"
import d3En from "../../assets/d3_en.jpg"
import d4En from "../../assets/d4_en.jpg"
import engWinner from "../../assets/engWinner.jpg"
import matWinner from "../../assets/matWinner.jpg"
import { useTranslation } from "react-i18next";

const MyCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const {i18n} = useTranslation();
  
  const imageArr = i18n.language === "en" ? [d1En,d2En,d3En,d4En] : [d1,d2,d3,d4] 
  

  return (
    <Box sx={{pt:{xs:4,md:7}}} >
    {/* <Carousel
      swipeable={true}
      slidesToSlide={1}
      // draggable={true}
      showDots={true}
      responsive={responsive}   
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={10000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
    //   deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
     {imageArr.map((item,index)=>(
      <Box component='img' width={'100%'} height={'100%'} src={item} key={index} />
     ))}
    </Carousel> */}
    <Box component='img' sx={{width:'100%'}} src={i18n.language === "en" ? engWinner : matWinner} />
    </Box>
  );
};

export default MyCarousel;
