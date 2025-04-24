import { useContext, useEffect, useState } from "react";
import { details, themeContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF,faXTwitter,faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone,faAt,faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { updateDate } from "../../Util/DateTime";
import Avatar from "antd/es/avatar/avatar";
import { Tooltip } from 'antd';
import CreateBlog from "./CreateBlog";
import EditBlog from "./EditBlog";
import Follow from "./Follow";



function Profile() {
    const [clickedBlog,setClickedBlog]=useState(null);
    const [followerPop,setFollowerPop]=useState(false);
    const [followingPop,setFollowingPop]=useState(false);
    const [isEditingBlog,setIsEditingBlog]=useState(false);
    const [isCreateBlog,setIsCreateBlog]=useState(false);
    const [notFollowing,setNotFollowing]=useState([]);
    const [skip,setSkip]=useState(0);
    const [blogList,setBlogList]=useState([]);
    const [hasMore,setHasMore]=useState(true);
    const [loading, setLoading] = useState(false);
    const {setIsLogin,loginData}=useContext(details);
    const {theme,colors}=useContext(themeContext);
    let limit=6;
    const navigate=useNavigate();
    let token=localStorage.getItem("Token");
    
// Logout API
    const logoutFun=async (e) => {
    
        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/auth/logout-from-all-device`,
                method: "POST",
                headers: {Authorization: token}
            });
    
            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }
    
            localStorage.removeItem("Token");
            localStorage.removeItem("User");
            setIsLogin(Boolean(localStorage.getItem("Token")));
            navigate("/");
    
        } catch (error) {
            alert("An error occured")
        }
    };


// Fetch My Blogs
    const fetchMyBlogsData=async () => {

        setLoading(true);
        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/blog/get-my-blogs?skip=${skip}`,
                method: "GET",
                headers: {Authorization: token},
            });

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }
            
            const prevData=response.data.data;

            if (prevData.length === 0) {
                setHasMore(false);
            } else {
                setBlogList((blogList) => [...blogList, ...prevData]);
            }

        } catch (error) {
            alert("An error occured to fetch the blogs");
            setHasMore(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMyBlogsData();
    },[skip]);

    const handelScroll=() => {
        if(loading || !hasMore) return;

        if(window.innerHeight + document.documentElement.scrollTop >= document.scrollingElement.scrollHeight - 200 && hasMore) {
            setSkip(skip + limit);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll",handelScroll);
        return () => window.removeEventListener("scroll",handelScroll);
    },[loading,hasMore]);


// Fetch not following users list    
    useEffect(() => {
        const fetchNotFollowingUsers=async () => {

            try {
                const response=await axios({
                    url: `${process.env.REACT_APP_API_URL}/follow/notfollowing-user-list`,
                    method: "GET",
                    headers: {Authorization: token},
                })

                const data=response.data.data;
                const List=data.filter(user => user._id !== loginData.userId);
                
                setNotFollowing(List);
                
            } catch (error) {
            }
        }

        fetchNotFollowingUsers();
    },[]);
  
// Follow - Unfollow
    const btnClick=async (e) => {
        let followingId=e.target.parentElement.id;
        console.log("Follow",followingId);
       
        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/follow/follow-user`,
                method: "POST",
                data: {followingId: followingId},
                headers: {Authorization: token},
            });

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }
            console.log(response.data);
           // navigate('/profile');
           
            window.location.reload();

        } catch (error) {
            alert("Can't follow users, please try after sometime");
        }
            
    }

// Create Blog
    const showPopCreateBlog=(e) => {
       setIsCreateBlog(true);
    }    


//Edit Blog    
    function editBlogPop(blog) {
        setIsEditingBlog(true);
        setClickedBlog(blog);
    }


//Delete Blog
    const deleteBlogAPIFun=async (e) => {
        const blogId=e.target.parentElement.parentElement.parentElement.id;
        const data={blogId};
        
        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/blog/delete-blog`,
                method: "POST",
                headers: {Authorization: token},
                data,
            })

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            console.log(response);
            window.location.reload();

        } catch (error) {
            alert("An error occured to delete the blogs");
        }

    }

//Followers List 
    function followersListPop() {
        setFollowerPop(true);
    } 
//Following List 
    function followingListPop() {
        setFollowingPop(true);
    } 



    return (<> 
            <div id="profile" className={loginData.userId}>
                <div id="profile-card">
                    <div id="top">
                        <div id="usrnm">{loginData.username}</div>
                        <div id="btn">
                            <button><span className="material-icons-outlined">edit</span><span>Edit profile</span></button>
                            <button onClick={logoutFun}><span className="material-icons-outlined">logout</span><span>Logout</span></button>
                            <button><span className="material-icons-outlined">share</span></button>
                        </div>
                    </div>
                    <div id="end">
                        <div id="image-area"><img src={`${loginData.userimage}`} alt={loginData.userimage.name} /></div>
                        <div id="left">
                            <div id="intro">
                                <div id="name">{loginData.name}</div>
                                <div><FontAwesomeIcon icon={faAt} size="xl"/><span>{loginData.useremail}</span></div>
                                <div><FontAwesomeIcon icon={faPhone} size="xl" /><span>xxx-xxx-xxxx</span></div>
                                <div><FontAwesomeIcon icon={faLocationDot} size="xl" /><span>Xxxxxx, Yyyyyyyyyy, Zzzzzzz</span></div>
                                <div><FontAwesomeIcon icon={faInstagram} size="xl" /><span>Aaaaaaa</span></div>
                                <div><FontAwesomeIcon icon={faFacebookF} size="xl" /><span>Bbbbbbbb</span></div>    
                                <div><FontAwesomeIcon icon={faXTwitter} size="xl" /><span>Ccccccc</span></div>    
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
                        {
                            notFollowing.map(user => {

                                return (<div className="sug-box" key={user._id} id={user._id}>
                                            <div id="image-area"><img src={`${user.image}`} /></div>
                                            <div className="name">{user.name}</div>
                                            <button onClick={btnClick}>Follow</button>
                                        </div>)
                            })
                        }
                    </div>
                    
                </div>

                <div id="post">
                    {
                        blogList.length !== 0 ? (blogList.map(blog => {
                            return (<div className="blogList" key={blog._id} id={blog._id}>
                                        <div className="user-fstln">
                                            <div className="user-pic">
                                                <Avatar  src={loginData.userimage  && <img src={`${loginData.userimage}`} />} />
                                                <div>
                                                    <div className="username">{loginData.name}</div>
                                                    <div className="updatetm">{updateDate(blog.creationDateTime)}</div>
                                                </div>
                                            </div>
                                            <div className="btn">
                                                <button onClick={() => editBlogPop(blog)}>Edit</button>
                                                <button onClick={deleteBlogAPIFun}>Delete</button>
                                            </div>
                                        </div> 
                                        <div className="blog-cnt">
                                            <div className="blog-txt">{blog.textBody}</div>
                                            <div className="blog-img">
                                                {blog.image && <img src={`${blog.image}`} />}
                                            </div>
                                        </div>
                                        <div className="like-cmt-share">
                                            <span className="material-icons-outlined like ldcs">thumb_up</span>
                                            <span className="material-icons-outlined dis-like ldcs">thumb_down</span>
                                            <FontAwesomeIcon className="comnt ldcs" icon={faComment} size="xl" />
                                            <span className="material-icons-outlined share ldcs">send</span>
                                        </div>
                                    </div>);
                        })) :   (<div>No Post </div>)
                    }
                </div>

                <div id="create-post" onClick={showPopCreateBlog} >
                    <Tooltip placement="leftTop" color="rgba(73, 73, 73, 0.65)" title="Create a post">
                        <button className="crt-pst">
                            <FontAwesomeIcon icon={faPlus} size="2xl" />
                        </button>
                    </Tooltip>
                </div>

                {isCreateBlog  &&   <div id="create-post-pop">
                                        <CreateBlog setIsCreateBlog={setIsCreateBlog}  />
                                    </div>}

                {isEditingBlog &&   <div id="edit-blog">
                                        <EditBlog clickedBlog={clickedBlog} setClickedBlog={setClickedBlog} setIsEditingBlog={setIsEditingBlog} />
                                    </div>}

                {followerPop && <div id="follower" className="follow-content">
                                    <div className="follow-box" style={colors[theme]}>
                                        <div className="follow">
                                            <h1>Followers</h1>
                                            <span className="material-icons-outlined cross" onClick={() => {setFollowerPop(false)}}>close</span>
                                        </div>
                                        <Follow endpointA={`${process.env.REACT_APP_API_URL}/follow/follower-user-list`} endpointB={`${process.env.REACT_APP_API_URL}/follow/following-user-list`} button={"Follower"} />
                                    </div>
                                </div>}
                {followingPop &&    <div id="following" className="follow-content">
                                        <div className="follow-box" style={colors[theme]}>
                                            <div className="follow">
                                                <h1>Following</h1>
                                                <span className="material-icons-outlined cross" onClick={() => {setFollowingPop(false)}}>close</span>
                                            </div>
                                            <Follow endpointA={`${process.env.REACT_APP_API_URL}/follow/following-user-list`} button={"Following"} />
                                        </div>
                                    </div>}

            </div>
            </>);
}


export default Profile; 