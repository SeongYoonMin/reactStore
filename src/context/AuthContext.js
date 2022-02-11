import { createContext, useState } from "react";
import clayful from "clayful/client-js"
import { useNavigate } from "react-router";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();

    const [isAuth, setIsAuth] = useState(false);

    const isAuthenticated = () => {

        let Customer = clayful.Customer;

        let options = {
            customer: localStorage.getItem("accessToken")
        };

        Customer.isAuthenticated(options, function (err, result) {
            if (err) {
                console.log(err.code);
                setIsAuth(false);
                return;
            }

            let headers = result.headers;
            let data = result.data;
            console.log(data.authenticated)

            if(data.authenticated) {
                setIsAuth(true);
            } else{
                setIsAuth(false);
            }
        });
    };

    const signOut = () => {

        setIsAuth(false);
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    const AuthContextData = {
        isAuth,
        isAuthenticated,
        signOut,
    };

    return (
        <AuthContext.Provider value={AuthContextData} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;