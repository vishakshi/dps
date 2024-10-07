import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userDetails,setUserDetails] = useState({});
    return(
        <AuthContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}


