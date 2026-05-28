import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { details } from "../../App";
import axios from "axios";
import { Avatar, message } from "antd";
import PersonImage from "../../Assets/PersonImage.jpg";
import { useRecoilState } from "recoil";
import { themeState } from "../../Recoil/Atoms/ThemeAtom";

export function Navbar() {
  const [searchedUser, setSearchedUser] = useState([]);
  const [srchBox, setSrchBox] = useState(false);
  const { isLogin } = useContext(details);
  const [theme, setTheme] = useRecoilState(themeState);
  const searchInputRef = useRef(null);
  const searchBoxRef = useRef(null);
  let navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("User"));

  // Fetch Search Users
  const fetchSearchUsers = async (e) => {
    let search = e.target.value;
    setSrchBox(true);

    if (!search) setSrchBox(false);

    try {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/auth/searchusers?search=${search}`,
        method: "GET",
      });

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      setSearchedUser(response.data.UsersDb);
    } catch (error) {
      message.error("search Failed due to some error");
    }
  };

  //Debouncing = to minimise the API call
  const debouncing = (oldFun) => {
    let id;

    return (...par) => {
      clearTimeout(id);

      id = setTimeout(() => {
        oldFun(...par);
      }, 300);
    };
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSrchBox(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef, searchBoxRef]);

  //Profile Fetching
  function clickProfile(user) {
    navigate(`/useraccount/${user._id}`, { state: { user: user } });
    setSrchBox(false);
  }

  //Theme change toggle
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div id="viewport">
        <nav>
          <img
            src="/nexuslogo.jpg"
            alt="NEXUS"
            onClick={() => (isLogin ? navigate("/dashboard") : navigate("/"))}
          />
          <div id="item-box">
            {isLogin ? (
              <div id="login-nav">
                <div id="items">
                  <button className="icon search">
                    <input
                      type="search"
                      id="srch"
                      placeholder="Search"
                      onKeyUp={debouncing(fetchSearchUsers)}
                      autoComplete="off"
                      ref={searchInputRef}
                    />
                    <span className="material-icons-outlined">search</span>
                  </button>
                  {/* <button onClick={() => navigate("/about")}>
                    <span className="material-icons-outlined">info</span>
                    <span className="it-txt">About</span>
                  </button> */}
                  <button onClick={() => navigate("/dashboard")}>
                    <span className="material-icons-outlined">home</span>
                    <span className="it-txt">Home</span>
                  </button>
                  <button className="icon">
                    <span className="material-icons-outlined">
                      notifications
                    </span>
                    <span className="it-txt">Notifications</span>
                  </button>
                  <button className="icon">
                    <span className="material-icons-outlined">chat</span>
                    <span className="it-txt">Messages</span>
                  </button>
                  <button className="icon">
                    <span
                      className="material-icons-outlined tm"
                      onClick={toggleTheme}
                    >
                      {theme === "light" ? "nightlight" : "light_mode"}
                    </span>
                  </button>
                  <button
                    className="icon profile"
                    onClick={() => navigate("/profile")}
                  >
                    <Avatar src={userData?.image || PersonImage} />
                  </button>
                </div>
              </div>
            ) : (
              <div id="logout-nav">
                <div id="items">
                  <button onClick={() => navigate("/about")}>
                    <span className="material-icons-outlined">info</span>
                    <span className="it-txt">About</span>
                  </button>
                  <button onClick={() => navigate("/support")}>
                    <span className="material-icons-outlined">
                      support_agent
                    </span>
                    <span className="it-txt">Support</span>
                  </button>
                  <button onClick={() => navigate("/download")}>
                    <span className="material-icons-outlined">download</span>
                    <span className="it-txt">Download</span>
                  </button>
                  <button onClick={() => navigate("/help")}>
                    <span className="material-icons-outlined">help</span>
                    <span className="it-txt">Get help</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {srchBox && (
          <div id="srch-usr-box" ref={searchBoxRef}>
            {searchedUser.map((user) => {
              return (
                <div
                  className={`usr-dtl ${user._id}`}
                  key={user._id}
                  onClick={() => clickProfile(user)}
                >
                  <Avatar
                    src={
                      <img src={user.image?.path || PersonImage} alt="avatar" />
                    }
                  />
                  <div>{user.name}</div>
                </div>
              );
            })}
          </div>
        )}

        <div id="outlet1">
          <Outlet />
        </div>
      </div>
    </>
  );
}
