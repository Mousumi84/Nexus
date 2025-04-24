import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { details } from "../../App";

function Login() {
    const {setIsLogin}=useContext(details);
    const navigate=useNavigate();

    const loginAPI=async (e) => {
        e.preventDefault();

        const userid=e.target.userid.value;
        const password=e.target.password.value;

        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/auth/login`,
                method: "POST",
                data: {
                    userId:userid,
                    password:password,
                }
            });

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            let token=response.data.jwtToken;
            localStorage.setItem("Token",token);
            localStorage.setItem("User",JSON.stringify(response.data.session.user));
            setIsLogin(true);

            navigate("/dashboard");
            
        } catch (error) {
            alert("An error occured, please try after some time");
        }
    }


    return (
        <div id="login" className="box">
            <div className="form">
                <h3>LOGIN</h3>
                <form onSubmit={loginAPI}>
                    <div className="mb-3">
                        <label htmlFor="userid" className="form-label">User Id</label>
                        <input type="text" className="form-control" id="userid" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            
                <div>Don't have an account?<Link to={"/signup"}>Signup</Link></div>
           </div>
        </div>);
}


export default Login;