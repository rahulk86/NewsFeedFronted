import React ,{ useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";
import * as UserAuth from "../../AUth/NewFeedAPI/UserAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ProfileImage from "../../components/ProfileImage";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import "./index.css";


const SignOut = ({ handleCloseSignOut,profileData }) => {
  const axiosPrivate      = useAxiosPrivate();
  const navigate          = useNavigate();
  const location          = useLocation();

  const handleSignOut = async () => {
    await UserAuth.signOut(axiosPrivate);
    navigate('/', { state: { from: location }, replace: true });
  };


    return (
      <div className="signoutContainer" onClick={handleCloseSignOut}>
        <div className="signoutContent" onClick={(evenet)=>{ evenet.stopPropagation()} }>
          <div className="signoutBoxProfile">
            <UserProfile>
              <ProfileImage profileData={profileData} />
            </UserProfile>
            <div className="nav__content_people">
                <div >
                  <span>{profileData && profileData.user.name}</span>
                </div>
                <span className="">Post to Connections only</span>
            </div>
          </div>
          <div  className="view-profile" >
              <button  > view profile </button>
          </div>
          <div className="account">
              <div>
                <span>Account</span>
              </div>
              <div>
                <span>Try Premium for ₹0</span>
              </div>
              <div>
                <span>Settings & Privacy</span>
              </div>
              <div>
                <span>Help</span>
              </div>
              <div>
                <span>Language</span>
              </div>
            </div>
            <div className="manage">
              <div>
                <span>Manage</span>
              </div>
              <div>
                <span>Posts & Activity</span>
              </div>
              <div>
                <span>Job Posting Account</span>
              </div>
            </div>
              <div className="sgnout" onClick={handleSignOut}>
                <span>Sign Out</span>
              </div>
        </div>
      </div>
      );
}

const UserProfile = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 0px solid white;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  >svg {
    width: 100%;
    margin-top: 4px;
    height: 73%;
    object-fit: cover;
  }
`;
export default SignOut;