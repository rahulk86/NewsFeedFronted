import React ,{ useEffect,useState } from "react";
import styled from "styled-components";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import * as profileAuth from "../../../AUth/NewFeedAPI/ProfileAuth";
import NewMessenger from "../NewMessenger";


const NewChats = ({setMessenger})=>{
    const axiosPrivate                    = useAxiosPrivate();
    const navigate                        = useNavigate();
    const location                        = useLocation();
    const [profilesData, setProfilesData] = useState();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchData = async () => {
          try{
            const profileResponse = await profileAuth.getAllProfile(axiosPrivate,controller);
    
            if(profileResponse.data){
              if(isMounted){
                setProfilesData(profileResponse.data);
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

    return(
       <Container>
         <NewGroup>
          <GroupProfile>
            <GroupProfileImage>
              <FontAwesomeIcon icon={fortawesome.faUserGroup} /> 
            </GroupProfileImage>
            <GroupProfileInfo>
                <ProfileName >
                    <span>New group</span>
                </ProfileName>
            </GroupProfileInfo>
          </GroupProfile>
         </NewGroup>

         <NewGroup>
          <GroupProfile>
            <GroupProfileImage>
              <FontAwesomeIcon icon={fortawesome.faUsers} /> 
            </GroupProfileImage>
            <GroupProfileInfo>
                <ProfileName >
                    <span>New community</span>
                </ProfileName>
            </GroupProfileInfo>
          </GroupProfile>
         </NewGroup>

         {profilesData && profilesData.map((post,index) => (
            <NewMessenger profileData = {post} setMessenger={setMessenger} />
          ))}
       </Container>
    );



};

const Container = styled.div`
   height: 65vh; 
   overflow-y: auto;
`;

const NewGroup = styled.div`
    max-width: 100%;
    background-color: white;
`;
const GroupProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 2px 2px 13px;
`;

const GroupProfileInfo = styled.div`
    padding: 20px;
    flex-direction: column;
    span{
      font-size: 12px;
    }
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

const GroupProfileImage = styled.div`
    width: 60px;
    height: 50px;
    box-sizing: border-box;
    background-clip: content-box;
    background-color: white;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  >svg {
    width: 84%;
    padding-left: 4px;
    height: 94%;
    object-fit: cover;
  }
`;

const ProfileName = styled.div`
  svg{
   padding-left: 11px;
   font-size: 21px;
   color: rgb(105, 103, 103);
  }
  span{
      font-size: 18px;
    }
  
`;
export default NewChats;