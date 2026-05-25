import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { details } from "../../App";
import { message } from "antd";

function Login() {
  const { setIsLogin } = useContext(details);
  const [validationError, isValidationError] = useState({
    userid: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginAPI = async (e) => {
    e.preventDefault();
    let errors = {
      userid: "",
      password: "",
    };

    const userid = e.target.userid.value;
    const password = e.target.password.value;

    userid.length === 0 && (errors.userid = "User Id is required");
    password.length === 0 && (errors.password = "Password is required");

    if (errors.userid || errors.password) {
      isValidationError(errors);
    } else {
      isValidationError({ userid: "", password: "" });

      try {
        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/auth/login`,
          method: "POST",
          data: {
            userId: userid,
            password: password,
          },
        });

        if (response.data.status !== 200) {
          message.error(response.data.message);
          return;
        }

        let token = response.data.jwtToken;
        localStorage.setItem("Token", token);
        localStorage.setItem("User",JSON.stringify(response.data.session.user));
        setIsLogin(true);
        message.success("Login successful!");
        navigate("/dashboard");
      } catch (error) {
        message.error("An error occurred, please try after some time");
      }
    }
  };

  // userid => username or email

  return (
    <div id="login" className="box">
      <div className="form">
        <h3>LOGIN</h3>
        <form onSubmit={loginAPI}>
          <div className="mb-3">
            <label
              htmlFor="userid"
              className="form-label"
              aria-placeholder="enter"
            >
              User Id
            </label>
            <input
              type="text"
              className="form-control  custom-placeholder"
              id="userid"
              placeholder="Enter your username or email"
            />
            {validationError.userid && (
              <div className="text-danger">{validationError.userid}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control custom-placeholder"
              id="password"
              placeholder="Enter your password"
            />
            {validationError.password && (
              <div className="text-danger">{validationError.password}</div>
            )}
          </div>
          <div className="mb-3">
            <Link to={"/forgotpassword"}>Forgot Password?</Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <div>
          Don't have an account?<Link to={"/signup"}>Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
