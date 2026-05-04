import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [validationError, isValidationError]=useState({ username:"", email:"", password:"" });
    const [credentialConfirmation, setCredentialConfirmation] = useState(false);
    const navigate=useNavigate();

    const forgetPasswordAPI=async (e) => {
        e.preventDefault();
        let errors = {
            username: "",
            email: "",
        };

        const username=e.target.username.value;
        const email=e.target.email.value;

        username.length===0 && (errors.username = "Username is required");
        email.length===0 && (errors.email = "Email is required");

        if(errors.username || errors.email) {
            isValidationError(errors);
        } else {
            isValidationError({ username: "", email: "" });
    
            try {
                const response=await axios({
                    url: `${process.env.REACT_APP_API_URL}/auth/forgetpassword`,
                    method: "POST",
                    data: {
                        username:username,
                        email:email,
                    }
                });

                console.log(response);

                if(response.data.status !== 200) {
                    message.error(response.data.message);
                    return;
                }
    
                let ConfirmationToken=response.data.jwtToken;
                localStorage.setItem("ConfirmationToken",ConfirmationToken);
                setCredentialConfirmation(true);
            } catch (error) {
                message.error("An error occured, please try after some time");
            }
        }
    }

    const changePasswordAPI=async (e) => {
        e.preventDefault();
        let errors = {
            password: "",
        };

        const password=e.target.password.value;

        password.length===0 && (errors.password = "Password is required");

        if(errors.password) {
            isValidationError(errors);
        } else {
            isValidationError({ password: "" });
        
            try {
                const response=await axios({
                    url: `${process.env.REACT_APP_API_URL}/auth/changepassword`,
                    method: "POST",
                    data: {
                        jwttoken: localStorage.getItem("ConfirmationToken"),
                        password: password
                    }
                });

                console.log(response);

                if(response.data.status !== 200) {
                    message.error(response.data.message);
                    return;
                }

                localStorage.removeItem("ConfirmationToken");
                message.success("Password changed successfully!");
                navigate("/");
            } catch (error) {
                console.log(error);
                message.error("An error occured, please try after some time");
            }
        }
    }
    
    return (
        <div id="forgetpassword" className="box">
            <div className="form">
                <h3>FORGOT PASSWORD</h3>
                <form onSubmit={credentialConfirmation ? changePasswordAPI : forgetPasswordAPI}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className={`form-control ${credentialConfirmation ? "submitted-input" : "custom-placeholder"}`} id="username" placeholder="Enter your username" readOnly={credentialConfirmation}/>
                        {validationError.username && <div className="text-danger">{validationError.username}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className={`form-control ${credentialConfirmation ? "submitted-input" : "custom-placeholder"}`} id="email" placeholder="Enter your email" readOnly={credentialConfirmation}/>
                        {validationError.email && <div className="text-danger">{validationError.email}</div>}
                    </div>
                    {credentialConfirmation ? (<>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control custom-placeholder" id="password" placeholder="Enter your password" />
                            {validationError.password && <div className="text-danger">{validationError.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Change Password
                        </button>
                    </>
                    ) : (
                        <button type="submit" className="btn btn-primary">
                            Confirm
                        </button>
                    )}
                </form>
            
                <div className="mb-3">
                    <div>Don't have an account?<Link to={"/signup"}>Signup</Link></div>
                    <div>Have an account<Link to={"/"}>Login</Link></div>
                </div>
           </div>
        </div>
    )
}

export default ForgetPassword;