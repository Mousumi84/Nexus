import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { details } from "../../App";
import { useNavigate } from "react-router-dom";
import Avatar from "antd/es/avatar/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { updateDate } from "../../Util/DateTime";

function Dashboard() {
    const [skip,setSkip]=useState(0);
    const [blogList,setBlogList]=useState([]);
    const [hasMore,setHasMore]=useState(true);
    const [loading, setLoading] = useState(false);
    let limit=6;
    let token=localStorage.getItem("Token");

    const fetchAllBlogsData=async () => {

        setLoading(true);
        try {
            const response=await axios({
                url: `http://localhost:8000/blog/get-blogs?skip=${skip}`,
                method: "GET",
                headers: {Authorization: token}
            });

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            const prevData=response.data.data.BlogDb;

            if (prevData.length === 0) {
                setHasMore(false);
            } else {
                setBlogList((blogList) => [...blogList, ...prevData]);
            }
                
        } catch (error) {
            alert("An error occured");
            setHasMore(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllBlogsData();
    },[skip]);

    
    const handelScroll=() => {
        if(loading || !hasMore) return;

       // console.log(document.documentElement.scrollTop , window.innerHeight , document.documentElement.scrollTop +  window.innerHeight , document.documentElement.scrollHeight -200 );
       // if(window.innerHeight + document.documentElement.scrollTop >= document.scrollingElement.scrollHeight - 10 && hasMore) {
        if(document.documentElement.scrollTop +  window.innerHeight >= document.documentElement.scrollHeight -200 && hasMore ) { 
           setSkip(skip + limit);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll",handelScroll);
        return () => window.removeEventListener("scroll",handelScroll);
    },[loading,hasMore]);


    return (<>
            <div id="dashboard" >
                {
                    blogList.length === 0 || (blogList.map(blog => {


                        return (
                                <div className="blogList" key={blog.item._id}>
                                    <div className="user-pic">
                                        <Avatar  src={blog.UserDetails?.image?.path  && <img src={`http://localhost:8000/${blog.UserDetails?.image?.path}`} alt="user" />} />
                                        <div>
                                            <div className="username">{blog.UserDetails?.name}</div>
                                            <div className="updatetm">{updateDate(blog.item.creationDateTime)}</div>
                                        </div>
                                    </div> 
                                    <div className="blog-cnt">
                                        <div className="blog-txt">{blog.item.textBody}</div>
                                        <div className="blog-img">
                                            {blog.item.image && <img src={`http://localhost:8000/${blog.item.image?.path}`} alt="Blog Image" />}
                                        </div>
                                    </div>
                                    <div className="like-cmt-share">
                                        <span className="material-icons-outlined like ldcs">thumb_up</span>
                                        <span className="material-icons-outlined dis-like ldcs">thumb_down</span>
                                        <FontAwesomeIcon className="comnt ldcs" icon={faComment} size="xl" />
                                        <span className="material-icons-outlined share ldcs">send</span>
                                    </div>
                                </div>);
                    }))
                }
            </div>
            </>)
}


export default Dashboard;