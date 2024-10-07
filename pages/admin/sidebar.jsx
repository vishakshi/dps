import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import  Collapse  from '@mui/material/Collapse';
import { Home,ChevronRight,Logout,KeyboardArrowDown,DashboardOutlined,AdminPanelSettingsOutlined,CurrencyRupeeOutlined,PaymentOutlined,ArrowOutwardOutlined,PaymentsOutlined, LocalMallOutlined, ContentCutOutlined, EmojiEventsOutlined, PeopleAltOutlined, QueryStatsOutlined} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    // When the route changes, update the current route state
    setCurrentRoute(location.pathname);
    console.log(location.pathname)
  }, [location.pathname]);


  const handleDrawer = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/admin-login',{replace:true})
  }

  const menuItems = [
    {
        id:0,
        title:"Users",
        icon:<DashboardOutlined/>,
        route:'/dashboard',
    },
    {
        id:1,
        title:"Competition",
        icon:<EmojiEventsOutlined/>,
        route:'/competition',
    },
    {
      id:2,
      title:"Participants",
      icon:<PeopleAltOutlined/>,
      route:'/submission',
  },
  {
    id:3,
    title:"Feedback",
    icon:<QueryStatsOutlined/>,
    route:'/feedback',
}
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar variant="outlined" sx={{border:'none',background:'#800080', ...(open ? {width: { sm: `calc(100% - ${drawerWidth}px)` }}:{width: { sm: `calc(100% - ${70}px)` }})
         }} color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              color:'white'
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}   sx={{
            '& .MuiDrawer-paper': { backgroundColor:"#2A323C",color:'white' },
          }}>
        <DrawerHeader>
          {/* <Typography variant='h6'>{open ? "Admin Panel" : "A.P"}</Typography> */}
          <Typography variant="h6" sx={{ my: 3 }}>
        {open ? <Typography component='img' src={logo} alt='Logo' height={open ? 50 : 20} /> : 
        <Typography color="#006ACD" variant='h6'>{"PCMC"}</Typography> }
      </Typography>
        </DrawerHeader>
        <Divider />
        <Box sx={{pt:5,display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <List disablePadding>
          {menuItems.map((item, index) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{display: "block",}}
            >

              {item.subItems ? (
                <>
                <ListItemButton
                  to={item.subItems[0].route}
                  LinkComponent={Link}
                //   sx={{
                //     minHeight: 48,
                //     justifyContent: open ? "initial" : "center",
                //     pl: 2.5,
                //     pr:1
                //   }}
                sx={{ borderRadius: '10px', mx: 1,py:0.4, my: 0.3,'&:hover':{backgroundColor: '#800080'}, ...(currentRoute === item.route && { backgroundColor: '#800080' }) }}
                >
                  <ListItemIcon
                   sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {open ? currentRoute.includes(item.route) ? <KeyboardArrowDown/> : <ChevronRight/> : null}
                </ListItemButton>
                <Collapse in={currentRoute.includes(item.route)} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {item.subItems.map((subItem,ind)=>(
                      <ListItem
                      key={subItem.id}
                      disablePadding
                    //   sx={
                    //     currentRoute === subItem.route // Check if the current route matches the menu item's route
                    //       ? {
                    //           background: ` linear-gradient(90deg, #77429A 0%, #CA79FF 100%); collection Component instance`,
                    //           display: "block",
                    //           color: "white",
                    //         }
                    //       : {
                    //           display: "block",
                    //         }
                    //   }
                    sx={{display:'block'}}
                    >
                       <ListItemButton
                  LinkComponent={Link}
                  to={subItem.route}
                //   sx={{
                //     minHeight: 48,
                //     justifyContent: open ? "initial" : "center",
                //     px: 2.5,
                //     pl:4
                //   }}
                sx={{ borderRadius: '10px',m:0, py:0.4, my: 0.3, ...(open && {m:1} ), ...(currentRoute === subItem.route && { backgroundColor: '#800080' }) }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                      visibility:'hidden'
                    }}
                  >
                    {subItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={subItem.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
                    </ListItem>
                    ))}
                  </List>
                </Collapse>
                </>
              ) : (
                <ListItemButton
                  LinkComponent={Link}
                  to={item.route}
                //   sx={{
                //     minHeight: 48,
                //     justifyContent: open ? "initial" : "center",
                //     px: 2.5,
                //   }}
                  sx={{ py:1, my: 0.3, ...(currentRoute === item.route && { backgroundColor: '#800080','&:hover':{backgroundColor:'#800080'} }) }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                    color='white'
                  />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>

        <List sx={{ width: "100%" }}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={handleLogout}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color:'#545F71'
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0,color:'white' }} />
            </ListItemButton>
          </ListItem>
        </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{width:`calc(100% - ${drawerWidth}px)`, flexGrow: 1,px:3,pt:2 }}>
        <DrawerHeader />
       {children}
      </Box>
    </Box>
  );
}