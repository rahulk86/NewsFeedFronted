import React, {useState } from "react";
import ProfileImageUpload from "../LeftSide/ProfileImageUpload/index";

import "./index.css";
import styled from "styled-components";
const Leftside = ({profileData}) => {
  const [uploadProfile, setUploadProfile] = useState(false);

  return (
    <div class="leftside">
      <div class="art-card">
        <div class="user-info">
          <div class="card-background"></div>
          <a>
            <UserProfile>
              {
                profileData?.image
                ?<img src={profileData.image.url} alt="Uploaded"/>
                :<img src="/images/photo.svg" alt="Uploaded"/>
              }
            </UserProfile>
            <div class="link">{profileData && 'Welcome,'+profileData.user.name +'!'}</div>
          </a>
          <a>
            <div class="add-photo-text" 
             onClick={()=>{setUploadProfile(true)}} 
             >Add a photo</div>
          </a>
        </div>
        <div class="widget">
          <a>
            <div>
              <span>Connections</span>
              <span>Grow your network</span>
            </div>
            <img src="/images/widget-icon.svg" alt="" />
          </a>
        </div>
        <a class="item">
          <span>
            <img src="/images/item-icon.svg" alt="" />
            My Items
          </span>
        </a>
      </div>

      <div class="art-card community-card">
        <a>
          <span>Groups</span>
        </a>
        <a>
          <span>Events <img src="/images/plus-icon.svg" alt="" /></span>
        </a>
        <a>
          <span>Follow Hashtags</span>
        </a>
        <a>
          <span>Discover more</span>
        </a>
      </div>
      {uploadProfile && <ProfileImageUpload funVal = {setUploadProfile} />}
   </div>

  );
};

const UserProfile = styled.div`
  box-shadow: none;
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
  overflow: hidden;
  >img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  }
`;

export default Leftside;
