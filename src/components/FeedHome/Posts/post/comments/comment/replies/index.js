import React, {useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import * as ReplyAuth from "../../../../../../../AUth/NewFeedAPI/ReplyAuth";
import useAxiosPrivate from "../../../../../../../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";
import Reply from "./reply"
import ProfileImage from "../../../../../../ProfileImage";
import styled from "styled-components";

const StartCommentReply = ({setCommetData,comment,replies,profileData}) => {
  const [replyText, setReplyText]     = useState();
  const axiosPrivate                      = useAxiosPrivate();
  const navigate                          = useNavigate();
  const location                          = useLocation();
  const handlePostEvent = async () => {
    let reply = {};
    reply.text = replyText;
    reply.commentId = comment.id;
     try{
      const response = await ReplyAuth.createNewReplyForComment(axiosPrivate,reply);
     }
     catch(err){
        
     }
  };

  return (
    <CommentBox>
      <Content>
      <UserProfile>
        <ProfileImage profileData={profileData} />
      </UserProfile>
      <CommentInput>
       <input
         placeholder="Add a Reply..."
         onChange={(event)=>{setReplyText(event.target.value)}}
         value = {replyText}
        />
        <FontAwesomeIcon icon={fortawesome.faImage}/>
      </CommentInput>

      </Content>
      <PostBtn>
        <button  
        disabled = {!replyText?.length>0} 
        onClick={handlePostEvent}
        >
          Post
        </button>
      </PostBtn>
      <Footer>
      {replies.map((reply,index) => (
            <Reply replyData={reply} profileData = {profileData} />
           ))}
      </Footer>
    </CommentBox>
  );
};


const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  border-radius: 10px;
  background: white;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px 0px 16px;

`;

const CommentInput = styled.div`
    position: relative;
    width: 87%;

    >svg{
        position: absolute;
        right: -14px;
        top: 50%;
        transform: translateY(-50%);
    }

    >input{
        flex-grow: 1;
        border-radius: 35px;
        width: 100%;
        border: 2px solid darkgray;
        color: #484849;
        padding: 11px;
        text-align: left;
        background-color: white;
        display: flex;
        align-items: center;
    }
  `;

const Footer = styled.div`
    padding-left: 20px;
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
  width: 42px;
  height: 42px;
  margin-right: 3px;
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
    margin-top: 2px;
    width: 100%;
    height: 76%;
    object-fit: cover;
  }
`;

const PostBtn = styled.div`
display: flex;
justify-content: flex-start;
  button{
    width: 50px;
    height: 26px;
    margin: 7px;
    margin-left: 62px;
    cursor: pointer;
    background-color: var(--linkedinBlue2);
    border-radius: 18px;
    outline: none;
    border: none;
    font-family: system-ui;
    font-weight: 600;
    color: #ffffff;
    font-size: 16px;
  }
  button:disabled {
    display: none;
    background-color: #ccc; 
    color: #666; 
    cursor: not-allowed; 
  }
`
export default StartCommentReply;
