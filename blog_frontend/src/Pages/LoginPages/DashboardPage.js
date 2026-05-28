import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { details } from "../../App";
import { Avatar, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { updateDate } from "../../Util/DateTime";
import PersonImage from "../../Assets/PersonImage.jpg";

function Dashboard() {
  const [skip, setSkip] = useState(0);
  const [blogList, setBlogList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notFollowing, setNotFollowing] = useState([]);
  const { loginData } = useContext(details);

  let limit = 6;
  let token = localStorage.getItem("Token");

  const fetchAllBlogsData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/blog/get-blogs?skip=${skip}`,
        method: "GET",
        headers: { Authorization: token },
      });

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      const prevData = response.data.data.BlogDb;

      if (prevData.length === 0) {
        setHasMore(false);
      } else {
        setBlogList((blogList) => [...blogList, ...prevData]);
      }
    } catch (error) {
      message.error("An error occured");
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllBlogsData();
  }, [skip]);

  // Fetch not following users list
  useEffect(() => {
    const fetchNotFollowingUsers = async () => {
      try {
        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/follow/notfollowing-user-list`,
          method: "GET",
          headers: { Authorization: token },
        });

        const data = response.data.data;
        const List = data.filter((user) => user._id !== loginData.userId);

        setNotFollowing(List);
      } catch (error) {}
    };

    fetchNotFollowingUsers();
  }, []);

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

  const handelScroll = () => {
    if (loading || !hasMore) return;

    if (
      document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.scrollHeight - 200 &&
      hasMore
    ) {
      setSkip(skip + limit);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, [loading, hasMore]);

  return (
    <>
      <div id="dashboard">
        <div className="blogList">
          {blogList.length === 0 ||
            blogList.map((blog) => {
              return (
                <div className="blog" key={blog.item._id}>
                  <div className="user-pic">
                    <Avatar
                      src={
                        blog.UserDetails?.image && (
                          <img src={`${blog.UserDetails?.image}`} alt="user" />
                        )
                      }
                    />
                    <div>
                      <div className="username">{blog.UserDetails?.name}</div>
                      <div className="updatetm">
                        {updateDate(blog.item.creationDateTime)}
                      </div>
                    </div>
                  </div>
                  <div className="blog-cnt">
                    <div className="blog-txt">{blog.item.textBody}</div>
                    <div className="blog-img">
                      {blog.item.image && (
                        <img src={`${blog.item.image}`} alt="Blog" />
                      )}
                    </div>
                  </div>
                  <div className="like-cmt-share">
                    <span className="material-icons-outlined like ldcs">
                      thumb_up
                    </span>
                    <span className="material-icons-outlined dis-like ldcs">
                      thumb_down
                    </span>
                    <FontAwesomeIcon
                      className="comnt ldcs"
                      icon={faComment}
                      size="xl"
                    />
                    <span className="material-icons-outlined share ldcs">
                      send
                    </span>
                  </div>
                </div>
              );
            })}

          {loading && <div className="loading">Loading...</div>}

          <div className="end-msg">{!hasMore && "No blogs to show"}</div>
        </div>

        <div id="suggestion">
          <h5>Discover People</h5>
          <div id="sgtn">
            {notFollowing.map((user) => {
              return (
                <div className="sug-box" key={user._id} id={user._id}>
                  <div id="image-area">
                    {/* <img src={`${user.image}`} alt="user" /> */}
                    <Avatar
                      src={user.image ? user.image : PersonImage}
                      id="avatar"
                    />
                  </div>
                  <div id="name-btn-area">
                    <div className="name">{user.name}</div>
                    <button onClick={btnClick}>Follow</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div id="connection">
          <h5>Connection</h5>
          <div id="cnt">
            {notFollowing.map((user) => {
              return (
                <div className="cn-box" key={user._id} id={user._id}>
                  <div id="image-area">
                    {/* <img src={`${user.image}`} alt="user" /> */}
                    <Avatar
                      src={user.image ? user.image : PersonImage}
                      id="avatar"
                    />
                  </div>
                  <div className="name">{user.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
