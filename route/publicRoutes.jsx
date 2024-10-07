import { GoogleOAuthProvider } from "@react-oauth/google"
import AdminLogin from "../pages/admin/admin-login"
import UserLogin from "../pages/user/user-login"
import UserSignUp from "../pages/user/user-signup"
import LandingPage from "../pages/landing"
import ResetPassword from "../pages/user/reset-password"
import ResetPassRequest from "../pages/user/resetPass"
import PrivacyPolicy from "../pages/user/privacy-policy"
import ForgotPassword from "../pages/forgotPassword"
import Contact from "../pages/contact"
import Navbar from "../components/navbar"
import Carrier from "../pages/carrier"

export const publicRoutes = [
    {
        path:'/',
        element:<LandingPage/>
    },
    {
        path:'/*',
        element:<div>404 Page Not Found</div>
    },
    {
        path:'/forgot-password',
        element:<ForgotPassword/>
    },
    {
        path:'/privacy-policy',
        element:<PrivacyPolicy/>
    },
    {
        path:'/contact-us',
        element:<Navbar><Contact/></Navbar>
    }, 
    {
        path:'/career',
        element:<Navbar><Carrier/></Navbar>
    }   
]

export const authRoutes = [
    {
        path:'/user-login',
        element:<GoogleOAuthProvider clientId='628932087895-3derv1ft2t9lq3uvie425s9ulmgni5a4.apps.googleusercontent.com'><UserLogin /></GoogleOAuthProvider>
    },
    {
        path:'/admin-login',
        element:<AdminLogin/>
    },
    {
        path:'/user-signup',
        element:<GoogleOAuthProvider clientId='628932087895-3derv1ft2t9lq3uvie425s9ulmgni5a4.apps.googleusercontent.com'><UserSignUp /></GoogleOAuthProvider>
    }
]