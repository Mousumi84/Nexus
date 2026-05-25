import { Avatar, message } from "antd";
import { useContext, useState } from "react";
import { details } from "../../App";
import { Input } from "antd";
import axios from "axios";
const { TextArea } = Input;

function EditPost({ clickedBlog, setClickedBlog, setIsEditingBlog }) {
  const [content, setContent] = useState(clickedBlog.textBody);
  const { loginData } = useContext(details);
  let token = localStorage.getItem("Token");
  let blogId = clickedBlog._id;

  const hidePopEditPost = () => {
    setClickedBlog(null);
    setIsEditingBlog(false);
  };

  const textchange = (e) => {
    setContent(e.target.value);
  };

  const editBlogFun = async (e) => {
    e.preventDefault();

    let textBody = e.target.textBody.value;

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/blog/edit-blog`,
        method: "POST",
        headers: { Authorization: token },
        data: {
          textBody: textBody,
          blogId: blogId,
        },
      });

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      console.log(response);
      window.location.reload();
    } catch (error) {
      message.error("Can't Edit Now, due to some error");
    }
  };

  return (
    <>
      <div id="edit">
        <div id="heading">
          <h3>Edit Post</h3>
          <span className="material-icons-outlined cross" onClick={hidePopEditPost}>close</span>
        </div>
        {/* <span className="warning">You are only allowed to edit the text</span> */}
        <div id="post-form">
          <div id="dp-nm">
            <Avatar
              src={
                loginData.image && (
                  <img src={`${loginData.image}`} alt="UserImg" />
                )
              }
            />
            <div className="username">{loginData.name}</div>
          </div>
          <form onSubmit={editBlogFun} encType="multipart/form-data">
            <TextArea
              id="textBody"
              rows={4}
              minLength={3}
              maxLength={1000}
              defaultValue={content}
              onChange={textchange}
            />
            <img src={`${clickedBlog.image}`} alt="Blog" />
            <input type="submit" id="editbtn" value="Edit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPost;
