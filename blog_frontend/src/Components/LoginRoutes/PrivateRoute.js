import { Suspense, useContext } from "react";
import { details } from "../../App";
import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
    const {isLogin}=useContext(details);       //isLogin=true;     

    return (<>

    {
        isLogin ? ( <Suspense fallback={<h1>loading...</h1>}>
                        {children}
                    </Suspense>) : (<Navigate to={"/"} />)
    }
       
    </>);
}


export default PrivateRoute;
// (<h1>Logout</h1>)