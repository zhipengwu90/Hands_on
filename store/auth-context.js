import { createContext, useState } from "react";


export const AuthContext = createContext({
    respondData: [],
    setRespondData: ()=>{},
    token: '',
    isAuthenticated: false,
    authenticate: ()=>{},
    logout: () =>{},
});

const AuthContextProvider =({children})=>{
    const [authToken, setAuthToken] = useState();
    const [data, setData] = useState([])

    function authenticateData(respond){
        setData(respond);
    }

    function authenticate(token){
        setAuthToken(token);
    };
    function logout(){
        setAuthToken(null);
    }

    const value = {
        respondData: data,
        setRespondData: authenticateData,
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }



    return (
        <AuthContext.Provider value ={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;