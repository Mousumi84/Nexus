import { Avatar } from "antd";
import { useContext, useState } from "react";
import { details, themeContext } from "../../App";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import { Input, message } from "antd";
import axios from "axios";
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });

function CreatePost({ setIsCreatePost }) {
  let { loginData } = useContext(details);
  let { theme, colors } = useContext(themeContext);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  //-------------------------------------------------------------------------------------------------------------------------------------------------
  const hidePopCreatePost = () => {
    setIsCreatePost(false);
  };

  const enablePostBtn = (e) => {
    let postbtn = document.getElementById("postbtn");

    if (e.target.value !== "") {
      postbtn.disabled = false;
      postbtn.style.cursor = "pointer";
    } else if (e.target.value === "") {
      postbtn.disabled = true;
      postbtn.style.cursor = "no-drop";
    }
  };

  const createBlogFun = async (e) => {
    e.preventDefault();

    let textBody = e.target.textBody.value;
    // let image = fileList[0].originFileObj;
    let token = localStorage.getItem("Token");

    const formdata = new FormData();
    formdata.append("textBody", textBody);
    
    // if (fileList) {
    if (fileList.length > 0) {
      let image = fileList[0].originFileObj;
      console.log(image);
      formdata.append("image", image);
    }

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/blog/create-blog`,
        method: "POST",
        data: formdata,
        headers: { Authorization: token },
      });

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      window.location.reload();
    } catch (error) {
      message.error(
        "An error occured to create a post, please try after some time",
      );
    }
  };

  return (
    <>
      <div id="crt-pop" style={colors[theme]}>
        <div id="heading">
          <h2>Create Post</h2>
          <span
            className="material-icons-outlined cross"
            onClick={hidePopCreatePost}
          >
            close
          </span>
        </div>
        <div id="post-form">
          <div id="dp-nm">
            <Avatar
              src={
                loginData.image && (
                  <img src={`${loginData.image}`} alt="profile pic" />
                )
              }
            />
            <div className="username">{loginData.name}</div>
          </div>
          <form onSubmit={createBlogFun} encType="multipart/form-data">
            <TextArea
              id="textBody"
              rows={4}
              minLength={3}
              maxLength={1000}
              placeholder={`What's on your mind, ${loginData.name}?`}
              onInput={enablePostBtn}
            />

            <ImgCrop rotationSlider>
              <Upload
                id="image"
                listType="picture-circle"
                name="image"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </ImgCrop>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}

            <input type="submit" id="postbtn" value="Post" disabled />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
