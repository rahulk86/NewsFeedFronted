import React, {useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import NewPost from "../newPost/index";
import ProfileImage from "../../../../components/ProfileImage";
import styled from "styled-components";

const StartPost = ({setPostData,profileData}) => {
  const [newPostPopup, setNewPostPopup] = useState(false);

  return (
    <PostBox>
      <Content>
        <UserProfile>
          <ProfileImage profileData={profileData} />
        </UserProfile>
       <button
         onClick={()=>{setNewPostPopup(true)}}
        >
          Start a post
       </button>
      </Content>
      <Footer>
        <FooterButton>
          <FontAwesomeIcon icon={fortawesome.faImage} className="media"/>
          <span>Media</span>
        </FooterButton>

        <FooterButton>
          <FontAwesomeIcon icon={fortawesome.faCalendarDay} className="event"/>
          <span>Event</span>
        </FooterButton>

        <FooterButton>
          <FontAwesomeIcon icon={fortawesome.faNewspaper} className="article"/>
          <span>Write article</span>
        </FooterButton>

      </Footer>
      {newPostPopup && <NewPost funVal = {setNewPostPopup} profileData={profileData} setPostData = {setPostData} />}
    </PostBox>
  );
};


const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  border-color: #958b7b;
  border-radius: 10px;
  background: white;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  @media (max-width: 768px) {
      display: none;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px 0px 16px;
  button {
    margin: 4px 0;
    flex-grow: 1;
    border-radius: 35px;
    color: #484849;
    padding: 15px;
    text-align: left;
    background-color: white;
    display: flex;
    align-items: center;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  }

  button:hover {
    background-color:  rgb(225, 229, 233);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 45%), 0 0 0 rgb(0 0 0 / 20%);
  }

`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 4px;
`;

const FooterButton = styled.div`
  outline: none;
  color: rgba(0, 0, 0, 0.6);
  font-size: 24px;
  line-height: 1.5;
  min-height: 48px;
  background: transparent;
  border: none;
  margin: 4px;
  font-weight: 600;
  >svg {
      margin: 0 4px -3px -2px;
      font-size: 20px;
  }
  >span{
      font-size: 13px; 
      margin: 0 4px 0 8px;
  }

  .media{
    color: #5292eb;

  }
  .event{
    color: #cc9845;
  }
  .article{
    color: rgb(199, 101, 71);
  }

`;

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
    margin-top: 2px;
    height: 76%;
    object-fit: cover;
  }
`;

export default StartPost;
