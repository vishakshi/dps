import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
  console.clear();
}

export default function Breadcrumb({ pages, currentPage }) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
      <Link
          underline="hover"
          to={'/'}
          style={{textDecoration:'none'}}
          color="inherit"
        >
        <HomeOutlined />
        
        </Link>
        {Array.isArray(pages) && pages.map(({ name, path }) => (
          <Link
            underline="hover"
            key={path}
            color="inherit"
            to={path}
          >
            {name}
          </Link>
        ))}
        <Typography color="text.primary">{currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
}
