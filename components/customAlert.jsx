import React from "react";
import { Snackbar, Alert } from "@mui/material";
const CustomAlert = ({ onOpen, onClose, severity, message,position }) => {
  return (
    <>
      <Snackbar
        open={onOpen}
        autoHideDuration={4000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: position || "right" }}
      >
        <Alert onClose={onClose} severity={severity} sx={{fontSize:14,py:0}} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomAlert;
