import { useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF,faXTwitter,faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone,faAt,faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { updateDate } from "../../Util/DateTime";
import { Avatar, message } from "antd";
import PersonImage from "../../Assets/PersonImage.jpg";
import { faPerson, faPersonDress, faPersonHalfDress } from "@fortawesome/free-solid-svg-icons";

function UserAccount() {
  const [skip, setSkip] = useState(0);
  const [blogList, setBlogList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  let limit = 6;
  let token = localStorage.getItem("Token");
  const location = useLocation();
  const user = location.state?.user;
  const { userId } = useParams();

  console.log("User data in UserAccount:", user);
  
  // Follow Button
  const btnClick = async (e) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/follow/follow-user`,
        method: "POST",
        data: { followingId: userId },
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

  const fetchFollowingUser = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/follow/following-user-list`,
        method: "GET",
        headers: { Authorization: token },
      });

      const followingList = response.data.data || [];
      const isFollowing = followingList.some((user) => user._id === userId);
      setIsFollowingUser(isFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const PostFollowingUser = async () => {
    if (!isFollowingUser) return; // Only fetch if following

    setLoading(true);
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/blog/get-user-blogs?userId=${userId}&skip=${skip}`,
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
      message.error("An error occured to fetch the blogs of the user");
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFollowingUser();
  }, [userId, token]);

  useEffect(() => {
    if (isFollowingUser) {
      PostFollowingUser();
    } else {
      setBlogList([]); // Clear posts if not following
    }
  }, [skip, isFollowingUser, userId, token]);

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

  useEffect(() => {
    window.addEventListener("scroll", handelScroll);
    return () => window.removeEventListener("scroll", handelScroll);
  }, [loading, hasMore]);

  return (
    <>
      <div id="account">
        <div id="user-account">
          <div id="username">{user.name}</div>
          <div id="pro">
            <div id="image-area">
              <img src={user?.image || PersonImage}  alt="User Avatar" />
            </div>
            <div id="intro">
              <div id="name">
                {user?.username}{" "}
                <span>
                  {user?.gender === "Male" ? 
                  ( <FontAwesomeIcon icon={faPerson} className="gender-icon" style={{ backgroundColor: "#77c1f5"}}/> ) : 
                  user?.gender === "Female" ? 
                  ( <FontAwesomeIcon icon={faPersonDress} className="gender-icon" style={{ backgroundColor: "#f57781"}} /> ) : 
                  user?.gender === "Other" ? 
                  ( <FontAwesomeIcon icon={faPersonHalfDress} className="gender-icon" style={{ backgroundColor: "#fbbc5e"}} /> ) :
                  "-"
                  }
                </span>
              </div>
              <div id="bio" style={{ padding: "10px"}}>{user?.bio}</div>
              <div className="add">
                <FontAwesomeIcon icon={faAt} size="xl" style={{ width: "30px" }} />
                <span>{user?.email}</span>
              </div>
              <div className="add">
                <FontAwesomeIcon icon={faPhone} size="xl" style={{ width: "30px" }} />
                <span>{user?.phone ? user?.phone : "---"}</span>
              </div>
              <div className="add">
                <FontAwesomeIcon icon={faLocationDot} size="xl" style={{ width: "30px" }} />
                <span>{user?.location ? user?.location : "---"}</span>
              </div>
              <div className="add">
                <FontAwesomeIcon icon={faInstagram} size="xl" style={{ width: "30px" }} />
                <span> {user?.instagram ? user?.instagram : "---"}
                </span>
              </div>
              <div className="add">
                <FontAwesomeIcon icon={faFacebookF} size="xl" style={{ width: "30px" }} />
                <span>{user?.facebook ? user?.facebook : "---"}</span>
              </div>
              <div className="add">
                <FontAwesomeIcon icon={faXTwitter} size="xl" style={{ width: "30px" }} />
                <span>{user?.twitter ? user?.twitter : "---"}</span>
              </div>
            </div>
          </div>
        </div>

        <div id="post">
          {isFollowingUser ? (
            blogList.length !== 0 ? (
              blogList.map((blog) => {
                return (
                  <div className="blogList" key={blog._id} id={blog._id}>
                    <div className="user-fstln">
                      <div className="user-pic">
                        <Avatar
                          src={
                            user.image && (
                              <img
                                src={`${process.env.REACT_APP_API_URL}/${user.image?.path}`}
                                alt="User Avatar"
                              />
                            )
                          }
                        />
                        <div>
                          <div className="username">{user.name}</div>
                          <div className="updatetm">
                            {updateDate(blog.creationDateTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="blog-cnt">
                      <div className="blog-txt">{blog.textBody}</div>
                      <div className="blog-img">
                        {blog.image && (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${blog.image?.path}`}
                            alt="Blog"
                          />
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
              })
            ) : (
              <div>No Post </div>
            )
          ) : (
            <div id="private-profile">
              <FontAwesomeIcon className="lock" icon={faLock} size="2xl" />
              <div>This account is private</div>
              <div className="flw-line">
                Follow to see their photos and videos.
              </div>
              <button onClick={btnClick}>Follow</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserAccount;
