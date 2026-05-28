import { useRef, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const loginData = JSON.parse(localStorage.getItem("User"));
  const [initialFormData, setInitialFormData] = useState({
    userId: loginData.userId || "",
    name: loginData.name || "",
    username: loginData.username || "",
    email: loginData.email || "",
    phone: loginData.phone || "",
    bio: loginData.bio || "",
    gender: loginData.gender || "",
    location: loginData.location || "",
    instagram: loginData.instagram || "",
    facebook: loginData.facebook || "",
    twitter: loginData.twitter || "",
  });
  const [validationError, isValidationError] = useState({
    email: "",
    name: "",
    username: "",
    phone: "",
  });
  const [newpassword, setNewPassword] = useState("");
  const [profileImg, setProfileImg] = useState(loginData.image || "");
  const [profileImgPreview, setProfileImgPreview] = useState(loginData.image || "");
  const [changePasswordPop, setChangePasswordPop] = useState(false);
  let token = localStorage.getItem("Token");
  const navigate = useNavigate();

  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    console.log(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      console.log(file, imageUrl);
      setProfileImg(file);
      setProfileImgPreview(imageUrl);
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setInitialFormData({ ...initialFormData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  // ✅ Submit updated data
  const EditProfileAPI = async (e) => {
    e.preventDefault();
    let errors = {
      email: "",
      name: "",
      username: "",
      phone: "",
    };

    initialFormData.email.length === 0 && (errors.email = "Email is required");
    initialFormData.name.length === 0 && (errors.name = "Name is required");
    initialFormData.username.length === 0 &&
      (errors.username = "Username is required");

    !validateEmail(initialFormData.email) &&
      (errors.email = "Please enter a valid email");
    initialFormData.phone &&
      !validatePhone(initialFormData.phone) &&
      (errors.phone = "Please enter a valid phone number");

    if (Object.values(errors).some((error) => error)) {
      isValidationError(errors);
      return;
    } else {
      isValidationError({ email: "", name: "", username: "" });

      try {
        console.log(profileImg);
        
        const formDataToSend = new FormData();

        formDataToSend.append("userId", initialFormData.userId);
        formDataToSend.append("name", initialFormData.name);
        formDataToSend.append("username", initialFormData.username);
        formDataToSend.append("email", initialFormData.email);
        formDataToSend.append("phone", initialFormData.phone);
        formDataToSend.append("bio", initialFormData.bio);
        formDataToSend.append("gender", initialFormData.gender);
        formDataToSend.append("location", initialFormData.location);
        formDataToSend.append("instagram", initialFormData.instagram);
        formDataToSend.append("facebook", initialFormData.facebook);
        formDataToSend.append("twitter", initialFormData.twitter);

        if (profileImg) {
          formDataToSend.append("image", profileImg);
        }

        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/auth/edit-profile`,
          method: "POST",
          data: formDataToSend,
          headers: { Authorization: token },
        });

        console.log(response.data);

        if (response.data.status !== 200) {
          message.error(response.data.message);
          return;
        }

        message.success("Profile updated successfully!");
        navigate("/profile");
        localStorage.setItem("User", JSON.stringify(response.data.data));
      } catch (err) {
        console.log(err);
        message.error("Update failed");
      }
    }
  };

  const changePasswordFunction = async () => {
    // setChangePasswordPop(true);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/auth/forgetpassword`,
        method: "POST",
        data: {
          username: initialFormData.username,
          email: initialFormData.email,
        },
        headers: { Authorization: token },
      });

      console.log(response);

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      let ConfirmationToken = response.data.jwtToken;
      localStorage.setItem("ConfirmationToken", ConfirmationToken);
      setChangePasswordPop(true);
    } catch (error) {
      message.error("An error occured, please try after some time");
    }
  };

  const changePasswordAPI = async (e) => {
    e.preventDefault();
    console.log(newpassword);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/auth/changepassword`,
        method: "POST",
        data: {
          jwttoken: localStorage.getItem("ConfirmationToken"),
          password: newpassword,
        },
        headers: { Authorization: token },
      });

      console.log(response);

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      localStorage.removeItem("ConfirmationToken");
      message.success("Password changed successfully!");
    } catch (error) {
      console.log(error);
      message.error("An error occured, please try after some time");
    }
  };

  return (
    <div id="edit-profile">
      <h2>Edit Profile</h2>
      <div id="profile-picture-container">
        {/* Profile Image */}
        <img src={profileImgPreview} alt="Profile" className="profile-picture" />

        {/* Edit Badge */}
        <button
          className="edit-badge"
          onClick={() => fileInputRef.current.click()}
        >
          <span className="material-icons-outlined">edit</span>
        </button> 

        {/* Hidden File Input */}
        <input
          type="file"
          // accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
      <form onSubmit={EditProfileAPI} className="edit-form">
        <div className="edit-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control custom-placeholder"
              id="name"
              name="name"
              value={initialFormData.name}
              onChange={handleChange}
              autoComplete="off"
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
              name="username"
              value={initialFormData.username}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your username"
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control custom-placeholder"
              id="email"
              name="email"
              value={initialFormData.email}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your email"
            />
            {validationError.email && (
              <div className="text-danger">{validationError.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="phone"
              className="form-control custom-placeholder"
              id="phone"
              name="phone"
              value={initialFormData.phone}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your phone number"
            />
            {validationError.phone && (
              <div className="text-danger">{validationError.phone}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              type="text"
              className="form-control custom-placeholder"
              id="bio"
              name="bio"
              value={initialFormData.bio}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your Bio"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-select form-select-sm"
              id="gender"
              name="gender"
              value={initialFormData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="Not Prefer to Say">Not Prefer to Say</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              {" "}
              Location{" "}
            </label>
            <input
              type="text"
              className="form-control custom-placeholder"
              id="location"
              name="location"
              value={initialFormData.location}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your location"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="instagram" className="form-label">
              Instagram{" "}
            </label>
            <input
              type="text"
              className="form-control custom-placeholder"
              id="instagram"
              name="instagram"
              value={initialFormData.instagram}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your instagram username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="facebook" className="form-label">
              {" "}
              Facebook
            </label>
            <input
              type="text"
              className="form-control custom-placeholder"
              id="facebook"
              name="facebook"
              value={initialFormData.facebook}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your facebook username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="twitter" className="form-label">
              Twitter
            </label>
            <input
              type="text"
              className="form-control custom-placeholder"
              id="twitter"
              name="twitter"
              value={initialFormData.twitter}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your Twitter username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control custom-placeholder"
              id="password"
              name="password"
              value={initialFormData.password}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your password"
              disabled
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={
                changePasswordPop ? changePasswordAPI : changePasswordFunction
              }
            >
              Change Password
            </button>
          </div>
          {changePasswordPop && (
            <div className="mb-3">
              <label htmlFor="newpassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control custom-placeholder"
                id="newpassword"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
              {/* {validationError.password && <div className="text-danger">{validationError.password}</div>} */}
            </div>
          )}
        </div>

        <button id="form-submit" type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
