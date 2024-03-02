import React, { useState } from "react";
import useAxiosPrivate from "../../../../../../../../hooks/useAxiosPrivate";
import * as ReplyAuth from "../../../../../../../../AUth/NewFeedAPI/ReplyAuth";
import StartReplyOnReply from "../reply/replies";
import { useNavigate,useLocation } from "react-router-dom";
import ProfileImage from "../../../../../../../ProfileImage";
import styled from "styled-components";

const Reply = ({ replyData,profileData }) => {
  const [reply, setReply]       = useState(replyData?replyData:{});
  const axiosPrivate            = useAxiosPrivate();
  const navigate                = useNavigate();
  const [replies, setReplies]   = useState(null);
  const location                = useLocation();

  const loadReply = async () => {
    try {
      const response = await ReplyAuth.getRepliesByReplyId(axiosPrivate,replyData.id);
      if (response.data) {
        setReplies(response.data);
        console.log('Reply loaded to the server');
      }
      else{
        console.error('Error loading Reply:');
        navigate('/SignIn', { state: { from: location }, replace: true });
      }
    } catch (error) {
      console.error('Error loading Reply:', error);
      navigate('/SignIn', { state: { from: location }, replace: true });
    }
  };

  const handleReplyToggle = () => {
    loadReply();
  };
 
  return (
    <Container>
      <Profile>
        <UserProfile>
          <ProfileImage profileData={reply.userProfile} />
        </UserProfile>
        <CommentFeed>
          <CommentInfo>
            <UserInfo>
              <span>{reply.userProfile.user.name}</span>
            </UserInfo>
            <CommentText>
              {reply.text}
            </CommentText>
          </CommentInfo>
          <CountArea>
            <button>Like</button>
            <span> {`${reply?.upVote? reply.upVote+'': ''}`} </span> 
            <span>|</span>
            <button onClick={handleReplyToggle} >Reply</button>
            <span> {`${reply?.reply? reply.replies + ' reply' : ''}`}</span> 
          </CountArea>
          {replies && <StartReplyOnReply replies ={replies} profileData={profileData} reply={replyData} ></StartReplyOnReply>}
        </CommentFeed>
      </Profile>

     
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Profile = styled.div`
    margin: 4px 0;
    flex-grow: 1;
    color: #484849;
    text-align: left;
    display: flex;
    align-items: center;

   > svg {
    width: 30px;
    height: 31px;
    border-radius: 52%;
    padding: 8px;
    margin-right: 3px;
    font-size: 36px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  }

  >button {
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
  @media (max-width: 900px) {
    margin: 4px;
  }
`;

const CommentInfo = styled.div`
  background: #f5f5f5;
  border-radius: 0px 7px 7px 7px;
  width: auto;
  padding: 9px;
  @media (max-width: 900px) {
    width: auto;
  }
`;
const CommentFeed = styled.div`
  padding-left: 10px;
  width: 85%;
  @media (max-width: 900px) {
    padding-right : unset;
  }
`;

const CountArea = styled.div`
  padding: 5px;
  font-size: 12px;
  >span{
    padding: 3px
  }
  >button{
    background: none;
    cursor: pointer;
    color: unset;
    padding: 3px
  }
  >button:hover{
    background: #f5f5f5;
    border-radius: 5px;
  }
`;

const CommentText = styled.div`

`;



const UserProfile = styled.div`
  width: 42px;
  height: 42px;
  margin-bottom: auto;
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
    width: 73%;
    padding-left: 5px;
    height: 89%;
    object-fit: cover;
  }
`;
const UserInfo = styled.div`
 display: flex;

`;
export default Reply;
