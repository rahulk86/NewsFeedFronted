import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import * as ReplyAuth from "../../../../../../AUth/NewFeedAPI/ReplyAuth";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import StartCommentReply from "../comment/replies/index";
import ProfileImage from "../../../../../ProfileImage";

const Comment = ({ data,profileData }) => {
  const [isLike, setLike]       = useState(data?.liked || false);
  const [post, setPost]         = useState(data?data:{});
  const [replies, setReplies]   = useState(null);
  const axiosPrivate            = useAxiosPrivate();
  const navigate                = useNavigate();
  const location                = useLocation();
  const [comment, setComment]   = useState(data?data:{});

  const loadReply = async () => {
    try {
      const response = await ReplyAuth.getRepliesByCommentId(axiosPrivate, data.id);
      if (response.data) {
        setReplies(response.data);
        console.log('Reply loaded to the server');
      }
      else{
        console.error('Error loading Reply:');
        navigate('/signIn', { state: { from: location }, replace: true });
      }
    } catch (error) {
      console.error('Error loading Reply:', error);
      navigate('/signIn', { state: { from: location }, replace: true });
    }
  };

  const handleReplyToggle = () => {
    loadReply();
  };
 
  return (
    <Container>
      <Profile>
        <UserProfile>
          <ProfileImage profileData={profileData} />
        </UserProfile>
        <CommentFeed>
          <CommentInfo>
            <UserInfo>
              <span>{comment.userProfile.user.name}</span>
            </UserInfo>
            <CommentText>
              {comment.text}
            </CommentText>
          </CommentInfo>
          <CountArea>
            <button>Like</button>
            <span> {`${comment?.upVote? comment.upVote+'': ''}`} </span> 
            <span>|</span>
            <button onClick={handleReplyToggle} >Reply</button>
            <span> {`${comment?.comments? comment.comments + ' comments' : ''}`}</span> 
          </CountArea>
          {replies && <StartCommentReply replies ={replies} profileData={profileData} comment={data} ></StartCommentReply>}
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
`;

const CommentInfo = styled.div`
  background: #f5f5f5;
  border-radius: 0px 7px 7px 7px;
  width: 450px;
  padding: 9px;
`;
const CommentFeed = styled.div`
  padding-right: 15px;
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
const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-top: 0.1px solid #e2e9df;
`;

const FooterButton = styled.button`
  outline: none;
  color: rgba(0, 0, 0, 0.6);
  font-size: 24px;
  line-height: 1.5;
  min-height: 48px;
  background: transparent;
  border: none;
  margin: 4px;
  font-weight: 600;
  .like {
    color: #5292eb;
  }
  >svg {
      margin: 0 4px -3px -2px;
      font-size: 20px;
  }
  >span{
      font-size: 13px; 
      margin: 0 4px 0 8px;
      
  }
`;

const UserProfile = styled.div`
  width: 42px;
  height: 42px;
  margin-right: auto;
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
export default Comment;
