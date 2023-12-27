import React from "react";
import styled from "styled-components";
import ProfileImage from "../../ProfileImage";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as messagingAuth from "../../../AUth/NewFeedAPI/MessagingAuth";
import { useNavigate,useLocation } from "react-router-dom";


const NewMessenger = ({profileData,setMessenger})=>{
    const axiosPrivate                  = useAxiosPrivate();
    const navigate                      = useNavigate();
    const location                      = useLocation();
    

    const getsetMessenger = async ()=>{
        const response = await messagingAuth.getMessenger(axiosPrivate,profileData);
            if(response.data){
              setMessenger(response.data);
            }
            else{
              navigate('/signIn', { state: { from: location }, replace: true });
            }
    }

    return(
        <Container onClick={getsetMessenger}>
            <GroupProfile>
            <GroupProfileImage>
                <ProfileImage profileData={profileData} />
            </GroupProfileImage>
            <GroupProfileInfo>
                <ProfileName >
                    <span>{profileData.user.name}</span>
                </ProfileName>
            </GroupProfileInfo>
            </GroupProfile>
        </Container>
    );
};

const Container = styled.div`
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
export default NewMessenger;