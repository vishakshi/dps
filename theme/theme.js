import { createTheme } from "@mui/material";
import { pxToRem } from "../utiils/utility";

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1f2937',
      light: '#37475B',
      contrastText: '#f1ffff',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f2f4f6',
    },
    text: {
      // primary: '#2c2932',
      primary: '#04072E',
      secondary: '#37475B',
    },
  },
  typography:{
    fontFamily:'Roboto',
    body2:{
      fontSize:pxToRem(18),
      fontWeight:600
    }
  },components:{
    MuiButton:{
      defaultProps:{
        size:'small',
        variant:'contained'
      },
        styleOverrides:{
            root:()=>({
                textTransform:'none',
                borderRadius:8,
            })
        }
    },
    MuiInputLabel:{
        styleOverrides:{
            root:()=>({
                color:"#1f2937",
                fontWeight:'600'
            })
        }
    },
    MuiDialogTitle:{
        styleOverrides:{
            root:()=>({
                fontWeight:'600',
                fontSize:pxToRem(20),
                paddingTop:10,
                paddingBottom:10,
                paddingLeft:15,
                paddingRight:5,
                borderBottom:'1px solid #EFE7EB',
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center'

            })
        }
    },
    MuiTextField:{
      defaultProps:{
        size:'small',
      },
      variants:[
        {
          props:{variant:'standard',size:'small'},
          style: {
            '& .MuiInput-underline:before': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:hover:before': {
              borderBottom: 'none',
            },
            // '& .MuiInput-underline:after': {
            //   borderBottom: 'none',
            // },
          },
        },
        {
          props:{variant:'standard',size:'small',type:'number'},
          style: {
            '& .MuiInputBase-input': {
              textAlign: 'right', // Ensuring input text is right-aligned
              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                WebkitAppearance: 'none',
                margin: 0,
              },
              '&[type=number]': {
                MozAppearance: 'textfield', // Firefox
              },
            },
            '& .MuiInput-underline:before': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:hover:before': {
              borderBottom: 'none',
            },
            // '& .MuiInput-underline:after': {
            //   borderBottom: 'none',
            // },
          },
        }
      ],
    }
  }
});