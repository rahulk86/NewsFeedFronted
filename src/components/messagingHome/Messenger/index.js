import React from "react";
import styled ,{css} from "styled-components";
import ProfileImage from "../../ProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";
import UnreadMessageCount from "../UnreadMessage";

const Messenger = ({messenger,setMessenger})=>{
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return(
        <Container onClick={()=>{setMessenger(messenger);messenger.unreadMessages = 0;}}>
            <GroupProfile>
            <GroupProfileImage>
                {messenger?.type == 'GroupMessenger' && !messenger.image
                ? <FontAwesomeIcon icon={fortawesome.faUserGroup} />
                :<ProfileImage profileData={{image:messenger.image}} />}
            </GroupProfileImage>
            <GroupProfileInfo>
                <ProfileName >
                    <span>{messenger.name}</span>
                </ProfileName>
                <UnreadMessage>
                  <MessageTimestamp unreadCount={messenger.unreadMessages} >{new Intl.DateTimeFormat('en-US', options).format(new Date(messenger?.creatAt))}</MessageTimestamp>
                  <UnreadMessageCount unreadCount={messenger.unreadMessages} />
                </UnreadMessage>
            </GroupProfileInfo>
            </GroupProfile>
        </Container>
    );
};

const MessageTimestamp = styled.div`
  font-size: 0.8em;
  padding: 3px;
  ${(props) =>
    props.unreadCount
      ? css`
          color:  #88d988;
      `
      : css`
         color: #888;
      `
    }
  align-self: flex-end;
`;

const Container = styled.div`
    max-width: 100%;
    background-color: white;

`;
const UnreadMessage = styled.div`
  display: grid;
  padding-bottom: 16px;
`;
const GroupProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 2px 2px 13px;
`;

const GroupProfileInfo = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
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
export default Messenger;