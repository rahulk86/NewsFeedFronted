import React  from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import ProfileList from "../ProfileList";


const NewChats = ({setMessenger,setGroupState})=>{
    return(
       <Container>
         <NewGroup onClick={()=>{setGroupState('NewGroup')}} >
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

         <NewGroup onClick={()=>{setGroupState('NewCommunity')}} >
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
         
         <ProfileList setMessenger={setMessenger} />
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
    width: 95%;
    @media (max-width: 768px) {
      width: 90%;
    }
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
    width: 70%;
    padding-left: 7px;
    height: 90%;
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