import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF,faXTwitter,faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone,faAt,faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { updateDate } from "../../Util/DateTime";
import { Avatar } from "antd";

function UserAccount() {
    const [skip,setSkip]=useState(0);
    const [blogList,setBlogList]=useState([]);
    const [hasMore,setHasMore]=useState(true);
    const [loading, setLoading] = useState(false);
    const [isFollowingUser,setIsFollowingUser]=useState(false);
    let limit=6;
    let token=localStorage.getItem("Token");
    const location=useLocation();
    const user=location.state?.user;
    const {userId}=useParams();
    

// Follow Button
const btnClick=async (e) => {
   
    try {
        const response=await axios({
            url: `${process.env.REACT_APP_API_URL}/follow/follow-user`,
            method: "POST",
            data: {followingId: userId},
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

    const fetchFollowingUser=async () => {
        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/follow/following-user-list`,
                method: "GET",
                headers: {Authorization: token},
            });
  
            const followingList=response.data.data || []; 
            const isFollowing = followingList.some(user => user._id === userId);
            setIsFollowingUser(isFollowing);

        } catch (error) {
            console.log(error)
        }
    }

    const PostFollowingUser=async () => {
        if(!isFollowingUser) return;  // Only fetch if following

        setLoading(true);  
        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/blog/get-user-blogs?userId=${userId}&skip=${skip}`,
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
            alert("An error occured to fetch the blogs of the user");
            setHasMore(false);
        }
        setLoading(false);
        
    };

    useEffect(() => {
        fetchFollowingUser();
    },[userId, token]);

    useEffect(() => {
        if (isFollowingUser) {
            PostFollowingUser();
        } else {
            setBlogList([]); // Clear posts if not following
        }
    },[skip, isFollowingUser, userId, token]);

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



    return (<>
                <div id="account">
                    <div id="user-account">
                        <div id="username">{user.username}</div>
                        <div id="pro">
                            <div id="image-area"><img src={`${process.env.REACT_APP_API_URL}/${user.image?.path}`} /></div>
                            <div id="intro">
                                    <div id="name">{user.name}</div>
                                    <div className="add"><FontAwesomeIcon icon={faAt} size="l" /><span>{user.email}</span></div>
                                    <div className="add"><FontAwesomeIcon icon={faPhone} size="l" /><span>xxx-xxx-xxxx</span></div>
                                    <div className="add"><FontAwesomeIcon icon={faLocationDot} size="l" /><span>Xxxxxx, Yyyyyyyyyy, Zzzzzzz</span></div>
                                    <div className="add"><FontAwesomeIcon icon={faInstagram} size="l" /><span>Aaaaaaa</span></div>
                                    <div className="add"><FontAwesomeIcon icon={faFacebookF} size="l" /><span>Bbbbbbbb</span></div>    
                                    <div className="add"><FontAwesomeIcon icon={faXTwitter} size="l" /><span>Ccccccc</span></div>    
                            </div>
                        </div>
                    </div>

                    <div id="post">
                    {   isFollowingUser ? (blogList.length !== 0 ? (blogList.map(blog => {
                                                                        return (<div className="blogList" key={blog._id} id={blog._id}>
                                                                                    <div className="user-fstln">
                                                                                        <div className="user-pic">
                                                                                            <Avatar src={user.image  && <img src={`${process.env.REACT_APP_API_URL}/${user.image?.path}`} />} />
                                                                                            <div>
                                                                                                <div className="username">{user.name}</div>
                                                                                                <div className="updatetm">{updateDate(blog.creationDateTime)}</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div> 
                                                                                    <div className="blog-cnt">
                                                                                        <div className="blog-txt">{blog.textBody}</div>
                                                                                        <div className="blog-img">
                                                                                            {blog.image && <img src={`${process.env.REACT_APP_API_URL}/${blog.image?.path}`} />}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="like-cmt-share">
                                                                                        <span className="material-icons-outlined like ldcs">thumb_up</span>
                                                                                        <span className="material-icons-outlined dis-like ldcs">thumb_down</span>
                                                                                        <FontAwesomeIcon className="comnt ldcs" icon={faComment} size="xl" />
                                                                                        <span className="material-icons-outlined share ldcs">send</span>
                                                                                    </div>
                                                                                </div>);
                                                                    }))  :  (<div>No Post </div>))
                                        :   (<div id="private-profile">
                                                <FontAwesomeIcon className="lock" icon={faLock} size="2xl" />
                                                <div>This account is private</div>
                                                <div className="flw-line">Follow to see their photos and videos.</div>
                                                <button onClick={btnClick}>Follow</button>
                                            </div>)
                    }
                    </div>
                </div>
            </>)
}

export default UserAccount;