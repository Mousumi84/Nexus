import { useContext, useEffect, useState } from "react";
import { details, themeContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faAt, faLocationDot, faPersonHalfDress, faPersonDress, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { updateDate } from "../../Util/DateTime";
import { Avatar, Tooltip, message, Modal  } from "antd";
import CreatePost from "../../Components/LoginComponents/CreatePost";
import EditPost from "../../Components/LoginComponents/EditPost";
import Follow from "../../Components/LoginComponents/Follow";
import PersonImage from "../../assets/PersonImage.jpg";

function Profile() {
  const [clickedBlog, setClickedBlog] = useState(null);
  const [followerPop, setFollowerPop] = useState(false);
  const [followingPop, setFollowingPop] = useState(false);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [notFollowing, setNotFollowing] = useState([]);
  const [skip, setSkip] = useState(0);
  const [blogList, setBlogList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openDeletePop, setOpenDeletePop] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openLogoutPop, setOpenLogoutPop] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const { setIsLogin } = useContext(details);
  const { theme, colors } = useContext(themeContext);
  let limit = 6;
  const navigate = useNavigate();
  let token = localStorage.getItem("Token");

  const showLogoutModal = () => {
    setOpenLogoutPop(true);
  };

  const hideLogoutModal = () => {
    setOpenLogoutPop(false);
  };

  const showDeleteModal = (blog) => {
    console.log("blog to delete", blog);
    setSelectedBlog(blog);
    setOpenDeletePop(true);
  };

  const hideDeleteModal = () => {
    setOpenDeletePop(false);
  };

  const logoutFun = async (e) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/auth/logout-from-all-device`,
        method: "POST",
        headers: { Authorization: token },
      });

      console.log(response);

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      localStorage.removeItem("Token");
      localStorage.removeItem("User");
      setIsLogin(Boolean(localStorage.getItem("Token")));
      setOpenLogoutPop(false);
      navigate("/");
    } catch (error) {
      message.error("An error occured");
    }
  };

  // Fetch My Blogs
  const fetchMyBlogsData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/blog/get-my-blogs?skip=${skip}`,
        method: "GET",
        headers: { Authorization: token },
      });

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      const prevData = response.data.data;

      if (prevData.length === 0) {
        setHasMore(false);
      } else {
        setBlogList((blogList) => [...blogList, ...prevData]);
      }
    } catch (error) {
      message.error("An error occured to fetch the blogs");
      setHasMore(false);
    }
    setLoading(false);
  };

  const handelScroll = () => {
    if (loading || !hasMore) return;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.scrollingElement.scrollHeight - 200 &&
      hasMore
    ) {
      setSkip(skip + limit);
    }
  };

  // Follow - Unfollow
  const btnClick = async (e) => {
    let followingId = e.target.parentElement.id;
    console.log("Follow", followingId);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/follow/follow-user`,
        method: "POST",
        data: { followingId: followingId },
        headers: { Authorization: token },
      });

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }
      console.log(response.data);
      // navigate('/profile');

      window.location.reload();
    } catch (error) {
      message.error("Can't follow users, please try after sometime");
    }
  };

  // Create Blog
  const showPopCreatePost = (e) => {
    setIsCreatePost(true);
  };

  //Edit Blog
  function editBlogPop(blog) {
    setIsEditingBlog(true);
    setClickedBlog(blog);
  }

  //Delete Blog
  const deleteBlogAPIFun = async (blog) => {
    const data = { blogId: blog._id };

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/blog/delete-blog`,
        method: "POST",
        headers: { Authorization: token },
        data,
      });      
      console.log(response);

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      setOpenDeletePop(false);
      window.location.reload();
    } catch (error) {
      message.error("An error occured to delete the blogs");
    }
  };

  //Followers List
  function followersListPop() {
    setFollowerPop(true);
  }
  //Following List
  function followingListPop() {
    setFollowingPop(true);
  }

  // Fetch not following users list
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("User"));
    setLoginData(userData);

    const fetchNotFollowingUsers = async () => {

      try {
        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/follow/notfollowing-user-list`,
          method: "GET",
          headers: { Authorization: token },
        });

        console.log(response.data.data);

        const data = response.data.data;
        const List = data.filter((user) => user._id !== userData.userId);

        console.log("not following users", List);

        setNotFollowing(List);
      } catch (error) {}
    };

    fetchNotFollowingUsers();
  }, []);

  useEffect(() => {
    fetchMyBlogsData();
  }, [skip]);

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, [loading, hasMore]);

console.log("not following", notFollowing,loginData);

  return (
    <>
      <div id="profile" className={loginData?.userId}>
        <div id="profile-card">
          <div id="top">
            <div id="usrnm">{loginData?.username}</div>
            <div id="btn">
              <button onClick={() => navigate("/editprofile")}>
                <span className="material-icons-outlined">edit</span>
                <span>Edit profile</span>
              </button>
              <button onClick={showLogoutModal}>
                <span className="material-icons-outlined">logout</span>
                <span>Logout</span>
              </button>
                        {/* //Logout modal */}
                        <Modal title="Logout Confirmation" open={openLogoutPop} onOk={logoutFun} onCancel={hideLogoutModal} okText="Yes, Logout" cancelText="No">
                          <p>Are you sure you want to logout?</p>
                        </Modal>
              <button>
                <span className="material-icons-outlined">share</span>
              </button>
            </div>
          </div>
          <div id="end">
            <div id="image-area">
              <img
                src={loginData?.image ? `${loginData?.image}` : "GirlImage.png"}
                alt={loginData?.username}
              />
            </div>
            <div id="left">
              <div id="intro">
                <div id="name">
                  {loginData?.name}{" "}
                  <span>
                    {loginData?.gender === "Male" ? 
                    ( <FontAwesomeIcon icon={faPerson} className="gender-icon" style={{ backgroundColor: "#77c1f5"}}/> ) : 
                    loginData?.gender === "Female" ? 
                    ( <FontAwesomeIcon icon={faPersonDress} className="gender-icon" style={{ backgroundColor: "#f57781"}} /> ) : 
                    loginData?.gender === "Other" ? 
                    ( <FontAwesomeIcon icon={faPersonHalfDress} className="gender-icon" style={{ backgroundColor: "#f57781"}} /> ) :
                    "-"
                    }
                  </span>
                </div>
                <div id="bio" style={{ padding: "10px"}}>{loginData?.bio}</div>
                <div>
                  <FontAwesomeIcon
                    icon={faAt}
                    size="xl"
                    style={{ width: "30px" }}
                  />
                  <span>{loginData?.email}</span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faPhone}
                    size="xl"
                    style={{ width: "30px" }}
                  />
                  <span>{loginData?.phone ? loginData?.phone : "---"}</span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    size="xl"
                    style={{ width: "30px" }}
                  />
                  <span>{loginData?.location ? loginData?.location : "---"}</span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="xl"
                    style={{ width: "30px" }}
                  />
                  <span>
                    {loginData?.instagram ? loginData?.instagram : "---"}
                  </span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    size="xl"
                    style={{ width: "30px" }}
                  />
                  <span>{loginData?.facebook ? loginData?.facebook : "---"}</span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faXTwitter}
                    size="xl"
                    style={{ width: "30px" }}
                  />
                  <span>{loginData?.twitter ? loginData?.twitter : "---"}</span>
                </div>
              </div>

              <div id="follow">
                <button onClick={followersListPop}>Followers</button>
                <button onClick={followingListPop}>Following</button>
              </div>
            </div>
          </div>
        </div>

        <div id="suggestion">
          <h5>Discover People</h5>
          <div id="sgtn">
            {notFollowing?.map((user) => {

              return (
                <div className="sug-box" key={user._id} id={user._id}>
                  <div
                    id="name-img"
                    onClick={() =>
                      navigate(`/useraccount/${user._id}`, {
                        state: { user: user },
                      })
                    }
                  >
                    <div id="image-area">
                      <img src={user.image ? user.image : PersonImage} alt="user" />
                    </div>
                    <div className="name">{user.name}</div>
                  </div>
                  <button onClick={btnClick}>Follow</button>
                </div>
              );
            })}
          </div>
        </div>

        <div id="post">
          {blogList.length !== 0 ? (
            blogList.map((blog) => {

              return (
                <div className="blogList" key={blog._id} id={blog._id}>
                  <div className="user-fstln">
                    <div className="user-pic">
                      <Avatar src={loginData.image && (<img src={`${loginData.image}`} alt="Profile" />)} />
                      <div>
                        <div className="username">{loginData.name}</div>
                        <div className="updatetm">{updateDate(blog.creationDateTime)}</div>
                      </div>
                    </div>
                    <div className="btn">
                      <button onClick={() => editBlogPop(blog)}>Edit</button>
                      <button onClick={() => showDeleteModal(blog)}>Delete</button>
                    </div>
                  </div>
                  <div className="blog-cnt">
                    <div className="blog-txt">{blog.textBody}</div>
                    <div className="blog-img">{blog.image && <img src={`${blog.image}`} alt="blog" />}</div>
                  </div>
                  <div className="like-cmt-share">
                    <div>
                      <span className="like-count">{blog.likescount}</span>
                      <span className="material-icons-outlined like ldcs">thumb_up</span>
                    </div>
                    <div>
                      <span className="dislike-count">{blog.dislikescount}</span>
                      <span className="material-icons-outlined dis-like ldcs">thumb_down</span>
                    </div>
                    <FontAwesomeIcon className="comnt ldcs" icon={faComment} size="xl"/>
                    <span className="material-icons-outlined share ldcs">send</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Post </div>
          )}

          {/* //Delete modal */}
          <Modal title="Delete Post Confirmation" open={openDeletePop} onOk={() => deleteBlogAPIFun(selectedBlog)} onCancel={hideDeleteModal} okText="Yes, Delete" cancelText="No">
            <p>Are you sure you want to delete this blog post?</p>
          </Modal>
        </div>

        <div id="create-post" onClick={showPopCreatePost}>
          <Tooltip
            placement="leftTop"
            color="rgba(73, 73, 73, 0.65)"
            title="Create a post"
          >
            <button className="crt-pst">
              <FontAwesomeIcon icon={faPlus} size="2xl" />
            </button>
          </Tooltip>
        </div>

        {isCreatePost && (
          <div id="create-post-pop">
            <CreatePost setIsCreatePost={setIsCreatePost} />
          </div>
        )}

        {isEditingBlog && (
          <div id="edit-blog">
            <EditPost
              clickedBlog={clickedBlog}
              setClickedBlog={setClickedBlog}
              setIsEditingBlog={setIsEditingBlog}
            />
          </div>
        )}

        {followerPop && (
          <div id="follower" className="follow-content">
            <div className="follow-box" style={colors[theme]}>
              <div className="follow">
                <h1>Followers</h1>
                <span
                  className="material-icons-outlined cross"
                  onClick={() => {
                    setFollowerPop(false);
                  }}
                >
                  close
                </span>
              </div>
              <Follow
                endpointA={`${process.env.REACT_APP_API_URL}/follow/follower-user-list`}
                endpointB={`${process.env.REACT_APP_API_URL}/follow/following-user-list`}
                button={"Follower"}
              />
            </div>
          </div>
        )}

        {followingPop && (
          <div id="following" className="follow-content">
            <div className="follow-box" style={colors[theme]}>
              <div className="follow">
                <h1>Following</h1>
                <span
                  className="material-icons-outlined cross"
                  onClick={() => {
                    setFollowingPop(false);
                  }}
                >
                  close
                </span>
              </div>
              <Follow
                endpointA={`${process.env.REACT_APP_API_URL}/follow/following-user-list`}
                button={"Following"}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
