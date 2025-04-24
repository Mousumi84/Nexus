import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [profilePicture, setProfilePicture] = useState(null); 
    const navigate=useNavigate();

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]); 
    };

    const signupAPI=async (e) => {
        e.preventDefault();

        const email=e.target.email.value;
        const name=e.target.name.value;
        const username=e.target.username.value;
        const password=e.target.password.value;

        const formDataToSend = new FormData();
            formDataToSend.append('email', email);
            formDataToSend.append('name', name);
            formDataToSend.append('username', username);
            formDataToSend.append('password', password);

        if (profilePicture) {
            formDataToSend.append('profileimg', profilePicture); 
        }

        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/auth/registration`,
                method: "POST",
                data: formDataToSend,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response);

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            navigate("/");

        } catch (error) {
            alert("An error occured, please try after some time");
        }
    }


    return (
        <div id="Signup" className="box">
            <div className="form">
                <h3>SIGNUP</h3>
                <form onSubmit={signupAPI} encType="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Profile Image</label>
                        <input type="file" className="form-control" id="formFile" name="profileimg" onChange={handleFileChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
                <div>Have an account?<Link to={"/"}>Login</Link></div>
            </div>
        </div>);
}    


export default Signup;