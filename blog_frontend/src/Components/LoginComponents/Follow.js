import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import PersonImage from "../../Assets/PersonImage.jpg";

function Follow({ endpointA, endpointB, button }) {
  const [followList, setFollowList] = useState([]);
  const [listB, setListB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  //  const userId=loginData.userId;
  let token = localStorage.getItem("Token");

  // Follower List - Following List
  const fetchFollowList = useCallback(async (e) => {
    setIsLoading(true);

    try {
      const response = await axios({
        url: endpointA,
        method: "GET",
        headers: { Authorization: token },
      });

      if (response.data.status !== 200) {
        message.error(response.data.message);
        return;
      }

      setFollowList(response.data.data);
    } catch (error) {
      message.error("Can't fetch follow users, please try after sometime");
    }

    if (button === "Follower" && endpointB) {
      try {
        const response = await axios({
          url: endpointB,
          method: "GET",
          headers: { Authorization: token },
        });

        if (response.data.status !== 200) {
          message.error(response.data.message);
          return;
        }

        setListB(response.data.data);
      } catch (error) {
        message.error("Can't fetch follow users, please try after sometime");
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  },  [endpointA, endpointB, token, button]);

  useEffect(() => {
    fetchFollowList();
  }, [fetchFollowList]);

  // Follow - Unfollow
  const btnClick = async (e) => {
    if (e.target.classList[1] === "Follow") {
      let followingId = e.target.parentElement.parentElement.id;
      console.log("Follow", e.target.parentElement.parentElement.id);

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

        navigate("/profile");
        window.location.reload();
        // setFollowList(response.data.data);              // comment
      } catch (error) {
        message.error("Can't follow users, please try after sometime");
      }
    } else if (e.target.classList[1] === "Unfollow") {
      let followingId = e.target.parentElement.parentElement.id;
      console.log("Unfollow", e.target.parentElement.parentElement.id);

      try {
        const response = await axios({
          url: `${process.env.REACT_APP_API_URL}/follow/unfollow`,
          method: "POST",
          data: { followingId: followingId },
          headers: { Authorization: token },
        });

        if (response.data.status !== 200) {
          message.error(response.data.message);
          return;
        }

        navigate("/profile");
        window.location.reload();
      } catch (error) {
        message.error("Can't follow users, please try after sometime");
      }
    }
  };

  return (
    <>
      <div className="flw">
        {isLoading ? (
          <p>Loading followers...</p>
        ) : followList.length > 0 ? (
          followList.map((flw) => {
            return (
              <div className="flw-usr" key={flw._id} id={flw._id}>
                <div
                  className="usr-dtl"
                  onClick={() =>
                    navigate(`/useraccount/${flw._id}`, {
                      state: { user: flw },
                    })
                  }
                >
                  <div className="image-area">
                    <img src={flw.image || PersonImage} alt={flw.name[0]} />
                  </div>
                  <div className="usr">
                    <div className="usr-nm">{flw.name}</div>
                    <div className="usr-usrnm">{flw.username}</div>
                  </div>
                </div>
                {button === "Follower" &&
                  (listB.length > 0 ? (
                    listB.some((userB) => userB._id === flw._id) ? null : (
                      <div className="flw-btn">
                        <button className="btn Follow" onClick={btnClick}>
                          Follow
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="flw-btn">
                      <button className="btn Follow" onClick={btnClick}>
                        Follow
                      </button>
                    </div>
                  ))}
                {button === "Following" && (
                  <div className="flw-btn">
                    <button className="btn Unfollow" onClick={btnClick}>
                      Unfollow
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div>{`No ${button.toLowerCase()}s`}</div>
        )}
      </div>
    </>
  );
}

export default Follow;
