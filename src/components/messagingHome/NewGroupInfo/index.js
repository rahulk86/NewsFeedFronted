import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserGroup, faCamera} from "@fortawesome/free-solid-svg-icons";
import { FaCheck} from "react-icons/fa";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import * as MessagingAuth from "../../../AUth/NewFeedAPI/MessagingAuth";
import { useNavigate,useLocation } from "react-router-dom";

const NewGroupInfo = ({ setIsNewGroup,groupMember}) => {
  const [messengerRequest, setMessengerRequest] = useState({});
  const axiosPrivate              = useAxiosPrivate();
  const navigate                  = useNavigate();
  const location                  = useLocation();

  const handleSubmit = async () => {
    
      let groupRequest         = {};
      groupRequest.messenger   = messengerRequest;
      groupRequest.groupMember = groupMember;
      try{
      let response = await MessagingAuth.createGroup(axiosPrivate,groupRequest);
      navigate('/messaging', { state: { from: location }, replace: true });
      }
      catch(err){
        navigate('/signIn', { state: { from: location }, replace: true });
      }

  }

  const buildMessenger = (event) => {
    setMessengerRequest({
      ...messengerRequest,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <HeaderTop>
        <NavList>
          <FontAwesomeIcon icon={faArrowLeft} onClick={()=>{setIsNewGroup(true)}} />
          <span>New Group</span>
        </NavList>
      </HeaderTop>
      <GroupInfo>
        <GroupProfile>
          <GroupProfileImage>
            <FontAwesomeIcon icon={faUserGroup} />
            <Overlay>
              <FontAwesomeIcon icon={faCamera} />
              <div>Add Group Icon</div>
            </Overlay>
          </GroupProfileImage>
        </GroupProfile>
        <SearchArea>
            <Search 
              type="text" 
              name = "name"
              value={messengerRequest.name}
              onChange={(event)=>{buildMessenger(event)}}
              placeholder="Group Subject (Optional)" 
            />  
        </SearchArea>
        <GroupPermission/>
        <IconContainer  onClick={handleSubmit} >
            <FaCheck size={30} />
        </IconContainer>
      </GroupInfo>
    </Container>
  );
};

const Container = styled.div`
  width: 30%;
  background: #f5f5f5;
  overflow-y: hidden;
  overflow-x: hidden;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;

const IconContainer = styled.div`
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    background-clip: content-box;
    background-color: white;
    background-position: center;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 0px solid white;
    border-radius: 20%;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%),0 0 0 rgb(0 0 0 / 20%);
    display: flex;
    position: fixed;
    bottom: 100px;
    left: 300px;
    cursor: pointer;

      
    >img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    >svg {
      margin-top: 15px;
      width: 100%;
      height: 43%;
      object-fit: cover;
    }

`;

const GroupInfo = styled.div`
  background-color: #f5f5f5;
  overflow-y: auto;
  display: grid;
  height: 70vh;
`;
const GroupPermission = styled.div`
  height: 23vh;
  margin-top: 5px;
  background-color: white;
`;

const GroupProfile = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 5px 2px 2px 13px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-size: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

const NavList = styled.li`
  display: flex;
  flex-wrap: nowrap;
  padding: 30px 90px 6px 0px;
  width: 100%;
  justify-content: space-around;
  list-style-type: none;
`;

const GroupProfileImage = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: #f5f5f5;
  background-position: center;
  justify-content: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    color: #dddcdc;
    height: 90%;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > svg {
    margin-bottom: 10px;
    font-size: 24px;
  }
`;

const SearchArea = styled.div`
  background-color: white;
  justify-content: center;
  display: flex;
`;
const Search = styled.input`
  opacity: 1;
  border: 1px solid white;
  box-shadow: none;
  border-radius: 2px;
  width: 350px;
  line-height: 1.75;
  font-weight: 400;
  font-size: 16px;
  height: 34px;
  vertical-align: text-top;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  &:focus {
    outline: none;
    border: 1px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: none;
  }
  
`;
export default NewGroupInfo;
