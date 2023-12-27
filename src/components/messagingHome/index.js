
import React ,{ useEffect,useState } from "react";
import Header from "../FeedHome/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import * as profileAuth from "../../AUth/NewFeedAPI/ProfileAuth";
import MessageInfo from "./MessageInfo";
import StartConversation from "./StartConversation";

const MessagingHome=(prop)=>{
  const axiosPrivate                  = useAxiosPrivate();
  const navigate                      = useNavigate();
  const [profileData, setProfileData] = useState();
  const [messenger, setMessenger]     = useState();
  const location                      = useLocation();



    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const fetchData = async () => {
        try{
          const profileResponse = await profileAuth.getProfile(axiosPrivate,controller);
  
          if(profileResponse.data){
            if(isMounted){
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
    }, []);


    return (
        <Container>
            {profileData && <Header profileData = {profileData} />}
            <Layout>
              <MessageInfo profileData = {profileData} setMessenger={setMessenger} />
              {messenger && <StartConversation messenger={messenger}/>}
            </Layout>
        </Container>
    );
};

const Container = styled.div`
  max-width: 100%;
  background: #f5f5f5;
`;
const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 85vh;
  justify-content: space-between;
  padding-top: 6%;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-top: 18%;
    padding-bottom: 60px;
  }
`;

export default MessagingHome;