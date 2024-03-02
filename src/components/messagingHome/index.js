
import React ,{ useEffect,useState } from "react";
import Header from "../FeedHome/Header";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";
import * as profileAuth from "../../AUth/NewFeedAPI/ProfileAuth";
import MessageInfo from "./MessageInfo";
import NewGroupHandler from "./NewGroupHandler";
import StartConversation from "./StartConversation";
import StartGroupConversation from "./StartGroupConversation";

const MessagingHome=(prop)=>{
  const axiosPrivate                    = useAxiosPrivate();
  const navigate                        = useNavigate();
  const [profileData, setProfileData]   = useState();
  const [messenger, setMessenger]       = useState();
  const location                        = useLocation();
  const [isMobile, setIsMobile]         = useState(false);
  const [groupState, setGroupState]     = useState();
  const [currentState, setCurrentState] = useState('chat');

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileView);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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
            navigate('/SignIn', { state: { from: location }, replace: true });
          }
        }
        catch(err){
          navigate('/SignIn', { state: { from: location }, replace: true });
        }
      };
  
      fetchData();
      return () => {
        isMounted = false;
        controller.abort();
      }
    }, [messenger]);

    let getConversation = ()=>{
      if(!messenger){
        return ;
      }
      switch(messenger.type){
        case 'UserMessenger'  : return <StartConversation messenger={messenger} setMessenger={setMessenger} />
        case 'GroupMessenger' : return <StartGroupConversation messenger={messenger} setMessenger={setMessenger} />
        default:return;
      }
    }


    let getCuurentGroupState = ()=>{
      switch(groupState){
        case 'NewGroup'     : return <NewGroupHandler 
                                        profileData = {profileData}  
                                        setGroupState={setGroupState} 
                                        setCurrentState={setCurrentState} 
                                         />
        case 'NewCommunity' : 
        default:return (!messenger || !isMobile )&& <MessageInfo 
                                                      setGroupState = {setGroupState} 
                                                      profileData = {profileData} 
                                                      setMessenger = {setMessenger}
                                                      setCurrentState = {setCurrentState}
                                                      currentState = {currentState}
                                                    />
      }
    }

    return (
        <Container>
            {profileData && !isMobile &&  <Header profileData = {profileData} />}
            <Layout>
            {getCuurentGroupState()}
            {getConversation()}
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
    height: 100vh;
    flex-direction: column;
    padding-top: unset;
    padding-bottom: unset;
  }
`;

export default MessagingHome;