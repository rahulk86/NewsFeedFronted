import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";
import * as PostAuth from "../../../../AUth/NewFeedAPI/PostAuth";
import * as CommentAuth from "../../../../AUth/NewFeedAPI/CommentAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ProfileImage from "../../../../components/ProfileImage";
import StartComments from "../post/comments/index";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";

const Post = ({ data,profileData }) => {
  const [isLike, setLike]       = useState(data?.liked || false);
  const [post, setPost]         = useState(data?data:{});
  const [comments, setComments] = useState(null);
  const axiosPrivate            = useAxiosPrivate();
  const navigate                = useNavigate();
  const location                = useLocation();

  const updateLikeStatusOnServer = async (isLike) => {
      try {
        const response = await PostAuth.vote(axiosPrivate, { ...data, liked: isLike });
        if (response.data) {
          setPost(response.data);
          setLike(isLike);
          console.log('Like status updated on the server');
        }
        else{
          console.error('Error updating like status:');
          navigate('/signIn', { state: { from: location }, replace: true });
        }
      } catch (error) {
        console.error('Error updating like status:', error);
        navigate('/signIn', { state: { from: location }, replace: true });
      }
    };

    const loadComment = async () => {
      try {
        const response = await CommentAuth.getComments(axiosPrivate, data.id);
        if (response.data) {
          setComments(response.data);
          console.log('Comment loaded to the server');
        }
        else{
          console.error('Error loading comment:');
          navigate('/signIn', { state: { from: location }, replace: true });
        }
      } catch (error) {
        console.error('Error loading comment:', error);
        navigate('/signIn', { state: { from: location }, replace: true });
      }
    };

  const handleLikeToggle = () => {
    updateLikeStatusOnServer(!isLike);
  };
  const handleComponetToggle = () => {
    loadComment();
  };

  
  return (
    <PostBox>
      <Profile>
        <UserProfile>
          <ProfileImage profileData={post.userProfile} />
        </UserProfile>
        <span>{post.userProfile.user.name}</span>
      </Profile>

      <TextFeed>
         {post.text}
      </TextFeed>
      {post.image && <img src={post.image.url} alt="Uploaded" />}
      <CountArea>
         <span> {`${post?.upVote? post.upVote+'': ''}`} </span> 
         <span> {`${post?.comments? post.comments + ' comments' : ''}`}</span> 
      </CountArea>

      <Footer>
        <FooterButton onClick={handleLikeToggle}>
          <FontAwesomeIcon icon={fortawesome.faThumbsUp} className={`${isLike ? 'like' : ''}`} />
          <span>Like</span>
        </FooterButton>

        <FooterButton onClick={handleComponetToggle}>
          <FontAwesomeIcon icon={fortawesome.faCommentDots} />
          <span>Comment</span>
        </FooterButton>

        <FooterButton>
          <FontAwesomeIcon icon={fortawesome.faRetweet} />
          <span>Repost</span>
        </FooterButton>

        <FooterButton>
          <FontAwesomeIcon icon={fortawesome.faPaperPlane} />
          <span>Send</span>
        </FooterButton>
      </Footer>
      {
       comments && <StartComments comments ={comments} profileData={profileData} post={data}></StartComments>
      }
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
`;

const Profile = styled.div`
  margin: 4px 0;
  flex-grow: 1;
  border-radius: 35px;
  color: #484849;
  padding: 15px;
  text-align: left;
  background-color: white;
  display: flex;
  align-items: center;

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
`;

const TextFeed = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
`;

const CountArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
  justify-content: space-between;
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
    object-fit: cover;
  }

  >svg {
    margin-top: 2px;
    width: 100%;
    height: 76%;
    object-fit: cover;
  }
`;
export default Post;
