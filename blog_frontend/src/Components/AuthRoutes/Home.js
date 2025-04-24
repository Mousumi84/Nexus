import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { details, themeContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import Avatar from "antd/es/avatar/avatar";
import axios from "axios";


export function Home() {
    const [searchedUser,setSearchedUser]=useState([]);
    const [srchBox,setSrchBox]=useState(false);
    const {isLogin,loginData}=useContext(details);
    const {theme,setTheme}=useContext(themeContext);
    const searchInputRef=useRef(null);
    const searchBoxRef=useRef(null); 
    let navigate=useNavigate();   

// Fetch Search Users
    const fetchSearchUsers=async (e) => {
        let search=e.target.value;
        setSrchBox(true);

        if(!search) setSrchBox(false);

        try {
            const response=await axios({
                url: `${process.env.REACT_APP_API_URL}/auth/searchusers?search=${search}`,
                method: "GET",
            })

            if(response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            setSearchedUser(response.data.UsersDb);
            
        } catch (error) {
            alert("search Failed due to some error");
        }
    };

//Debouncing = to minimise the API call 
    const debouncing=(oldFun) => {
        let id;

        return ((...par) => {
            clearTimeout(id);

            id=setTimeout(() => {
                oldFun(...par);
            },300);
        });
    }
    
    useEffect(() => {
        function handleClickOutside(event) {
          if ( searchInputRef.current && !searchInputRef.current.contains(event.target) && searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
            setSrchBox(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [searchInputRef, searchBoxRef]);
    
//Profile Fetching
    function clickProfile(user) {
        navigate(`/useraccount/${user._id}`,{state: { user:user }});   
        setSrchBox(false);
    };    

//Theme change toggle
    const toggleTheme=() => {
      setTheme(theme === "light" ? "dark" : "light");
    };


    return (
    <>
        <div id="home">
            <nav>
                <img src="/nexuslogo.jpg" alt="NEXUS" onClick={() => navigate("/dashboard")} />
                <div id="item-box">
                   { isLogin ? (
                                <div id="login-nav">
                                        <div className="icon search">
                                            <input type="search" id="srch" placeholder="Search" onKeyUp={debouncing(fetchSearchUsers)} autoComplete="off" ref={searchInputRef} />
                                            <span className="material-icons-outlined">search</span>
                                        </div>
                                        <div className="icon"><FontAwesomeIcon icon={faHeart} size="2xl" /><span className="it-txt">Notifications</span></div>
                                        <div className="icon"><FontAwesomeIcon icon={faMessage} size="2xl" /><span className="it-txt">Messages</span></div>
                                        <div className="icon"><span className="material-icons-outlined tm" onClick={toggleTheme}>{theme === "light" ? "nightlight" : "light_mode"}</span></div>
                                        <div className="icon profile" onClick={() => navigate("/profile")}>
                                            <Avatar src={`${loginData.userimage}`} />
                                        </div>
                                </div>
                               ) : ( 
                                <div id="logout-nav">
                                    <div id="items">
                                        <div><span className="material-icons-outlined">home</span><span className="it-txt">Home</span></div>
                                        <div><span className="material-icons-outlined">support_agent</span><span className="it-txt">Support</span></div>
                                        <div><span className="material-icons-outlined">download</span><span className="it-txt">Download</span></div>
                                        <div><span className="material-icons-outlined">help</span><span className="it-txt">Get help</span></div>
                                    </div>
                                </div>)
                    }
                </div>
            </nav>

            {srchBox  &&    <div id="srch-usr-box" ref={searchBoxRef}>
                                {
                                    searchedUser.map(user => {
                                        return (
                                                <div className={`usr-dtl ${user._id}`} key={user._id} onClick={() => clickProfile(user)}>
                                                    <Avatar  src={user.image  && <img src={`${process.env.REACT_APP_API_URL}/${user.image?.path}`} alt="image" />} />                                
                                                    <div>{user.name}</div>
                                                </div>)
                                    })
                                }
                            </div>
            }

            <div id="outlet1">
                <Outlet />
            </div>
        </div>     
    </>);
}