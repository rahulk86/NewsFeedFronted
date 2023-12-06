import React ,{ useEffect} from "react";
import StartPost from "./StartPost/index";
import Post from "./post/index";
import styled from "styled-components";
import "./index.css";




const Posts = ({profileData,data,setPostData}) => {
    return (
        <Container>
          <StartPost setPostData = {setPostData} profileData = {profileData}  />
          {data.map((post,index) => (
            <Post data={post} profileData = {profileData} />
           ))}
        </Container>
    );
}
const Container = styled.div`
  width: 100%;
  max-width: 548px;
`;

export default Posts;