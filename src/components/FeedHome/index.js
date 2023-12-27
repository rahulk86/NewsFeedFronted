import React ,{ useEffect,useState } from "react";
import Leftside from "./LeftSide";
import Posts from "./Posts/index";
import Header from "./Header/index";
import Rightside from "./Rightside";
import * as postAuth from "../../AUth/NewFeedAPI/PostAuth";
import * as profileAuth from "../../AUth/NewFeedAPI/ProfileAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";



const FeedHome = (props) => {
  const [postData, setPostData]       = useState(null);
  const [profileData, setProfileData] = useState();
  const navigate                      = useNavigate();
  const axiosPrivate                  = useAxiosPrivate();
  const location                      = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      try{
        const response        = await postAuth.getPosts(axiosPrivate,controller);
        const profileResponse = await profileAuth.getProfile(axiosPrivate,controller);

        if(response.data && profileResponse.data){
          if(isMounted){
            setPostData(response.data) ;
            setProfileData(profileResponse.data);
          }
        }
        else{
          navigate('/signIn', { state: { from: location }, replace: true });
        }
      }
      catch(err){
        navigate('/signIn', { state: { from: location }, replace: true });
      }
    };

    fetchData();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [axiosPrivate,location]);


  return (
    <Container>
      <Header profileData = {profileData} />
      <Layout>
        <Leftside profileData={profileData} />
        {postData && <Posts profileData = {profileData} data={postData} setPostData = {setPostData} />}
        <Rightside />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
max-width: 100%;
background: #f5f5f5;
`;
const Layout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-top: 6%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding-top: 18%;
    padding-bottom: 60px;
  }
`;
export default FeedHome;
