import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [validationError, isValidationError] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const signupAPI = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    let errors = {
      email: "",
      name: "",
      username: "",
      password: "",
    };

    email.length === 0 && (errors.email = "Email is required");
    name.length === 0 && (errors.name = "Name is required");
    username.length === 0 && (errors.username = "Username is required");
    password.length === 0 && (errors.password = "Password is required");

    if (errors.email || errors.name || errors.username || errors.password) {
      isValidationError(errors);
      return;
    } else {
      isValidationError({ email: "", name: "", username: "", password: "" });

      const formDataToSend = new FormData();
      formDataToSend.append("email", email);
      formDataToSend.append("name", name);
      formDataToSend.append("username", username);
      formDataToSend.append("password", password);

      if (profilePicture) {
        formDataToSend.append("profileimg", profilePicture);
      }

      console.log(formDataToSend);

      try {
        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/auth/registration`,
          method: "POST",
          data: formDataToSend,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);

        if (response.data.status !== 200) {
          message.error(response.data.message);
          return;
        }

        navigate("/");
      } catch (error) {
        message.error("An error occured, please try after some time");
      }
    }
  };

  return (
    <div id="Signup" className="box">
      <div className="form">
        <h3>SIGNUP</h3>
        <form onSubmit={signupAPI} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control custom-placeholder"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
            {validationError.email && (
              <div className="text-danger">{validationError.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control custom-placeholder"
              id="name"
              placeholder="Enter your name"
            />
            {validationError.name && (
              <div className="text-danger">{validationError.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control custom-placeholder"
              id="username"
              placeholder="Enter your username"
            />
            {validationError.username && (
              <div className="text-danger">{validationError.username}</div>
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
            <label htmlFor="formFile" className="form-label">
              Profile Image
            </label>
            <input
              type="file"
              className="form-control custom-placeholder"
              id="formFile"
              name="profileimg"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
        <div>
          Have an account?<Link to={"/"}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

/*
email: mousumi@gmail.com
name: Mousumi Das
username: Mousumi123
password: mousumi@123
*/
