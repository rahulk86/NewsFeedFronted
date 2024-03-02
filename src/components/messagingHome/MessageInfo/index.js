
import React ,{ useEffect,useState } from "react";
import styled ,{css} from "styled-components";
import ProfileImage from "../../ProfileImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import { useNavigate,useLocation } from "react-router-dom";
import NewChats from "../NewChats"
import Messengers from "../Messengers"

const MessageInfo = ({profileData,setMessenger,setGroupState,setCurrentState,currentState})=>{
  const navigate                        = useNavigate();
  const location                        = useLocation();

  const navigateFeed = ()=>{
    navigate('/feed', { state: { from: location },replace: true  });
  };

  let getCuurentMessageInfo = ()=>{
    switch(currentState){
       case 'newchats' : return <NewChats setMessenger={setMessenger} setGroupState={setGroupState}/>
       case 'chat'     : 
      case 'status': 
      default:return <Messengers setMessenger={setMessenger} setCurrentState={setCurrentState} />
    }
  }
  useEffect(() => {

  }, [currentState]);;
    return (
     <Container>
      <HeaderTop>
      <SmallMediaNavList>
        <FontAwesomeIcon icon={fortawesome.faArrowLeft} onClick={navigateFeed} />
        <span>NewFeedChats</span>
        <FontAwesomeIcon icon={fortawesome.faCamera} />
        <FontAwesomeIcon icon={fortawesome.faSearch} />
        <FontAwesomeIcon icon={fortawesome.faEllipsisVertical} /> 
      </SmallMediaNavList>
      </HeaderTop>
        <Header>
            <UserProfile>
                <ProfileImage profileData={profileData} />
            </UserProfile>
            <NavListWrap>
               <NavList onClick={()=>{setCurrentState('chat')}}>
                 <NavListItem>
                    <FontAwesomeIcon icon={fortawesome.faComment} />
                 </NavListItem>
               </NavList>

               <NavList onClick={()=>{setCurrentState('community')}}>
                 <NavListItem>
                    <FontAwesomeIcon icon={fortawesome.faUsers} /> 
                 </NavListItem>
               </NavList>

               <NavList onClick={()=>{setCurrentState('status')}} >
                 <NavListItem>
                  <NavBoady>
                   <NavImage src="/home/images/whatstatus.png" alt=""/>
                  </NavBoady>
                 </NavListItem>
               </NavList>

               <NavList  onClick={()=>{setCurrentState('newchats')}}>
                 <NavListItem>
                   <FontAwesomeIcon icon={fortawesome.faSquarePlus} /> 
                 </NavListItem>
               </NavList>

               <NavList >
                 <NavListItem>
                   <FontAwesomeIcon icon={fortawesome.faEllipsisVertical} /> 
                 </NavListItem>
               </NavList>

            </NavListWrap>

            <SmallMediaNavList>
               <NavList isCurrentState={currentState=='community'}  onClick={()=>{setCurrentState('community')}}>
                    <FontAwesomeIcon icon={fortawesome.faUsers} /> 
               </NavList>


               <NavList isCurrentState={currentState=='chat'} onClick={()=>{setCurrentState('chat')}}>
                    <span>Chats</span> 
               </NavList>


               <NavList isCurrentState={currentState=='Updates'} onClick={()=>{setCurrentState('Updates')}}>
                    <span>Updates</span> 
               </NavList>

               <NavList isCurrentState={currentState=='Call'} onClick={()=>{setCurrentState('Call')}}>
                    <span>Call</span> 
               </NavList>

            </SmallMediaNavList>
        </Header>

        <MessengersData>
          <SearchArea>
            <Search>
              <div>
                <input type="text" placeholder="Search" />
              </div>
              <SearchIcon>
                <FontAwesomeIcon icon={fortawesome.faSearch} className="faSearch" />
              </SearchIcon>
              <FontAwesomeIcon icon={fortawesome.faFilter} /> 
            </Search>
          </SearchArea>
          {getCuurentMessageInfo()}
        </MessengersData>
     </Container>
    )
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

const NavList = styled.li`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  @media (max-width: 768px) {
    ${(props) =>
    props.isCurrentState
      ? css`transform: scaleX(1);
            border-bottom: 2px solid var(--white, #fff);
            bottom: 0;
            left: 0;
            transition: transform 0.2s ease-in-out;
            border-color: rgba(0, 0, 0, 0.9);
            color: unset;
            padding-bottom: 3px;
          `
      : css`
      `
    }
  }
`;

const NavImage = styled.img`
  width: 25px;
  height: 25px;

`;

const NavBoady = styled.a`
   color: #f5f5f5;

`;
const NavListItem = styled.a`
  align-items: center;
  background: transparent;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  line-height: 1.5;
  min-width: 60px;
  position: relative;
  text-decoration: none;

  svg {
    font-size: 20px;
  }

  img {
    font-size: 20px;
  }

  span {
    display: flex;
    align-items: center;
    padding: 4px;
    color: rgba(0, 0, 0, 0.9);
  }

  &:hover{
    color: rgba(0, 0, 0, 0.9);
  }

`;
const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  @media (max-width: 768px) {
      display: none;
  }
`;
const SmallMediaNavList = styled.ul`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: nowrap;
    padding: 0px 10px 0 10px;
    width: 100%;
    justify-content: space-between;
    list-style-type: none;
  }
`;

const Header = styled.div`
   display: flex;
   justify-content: space-between;
   background-color: white;
   border-right: 1px solid rgba(0, 0, 0, 0.15);
   border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

const HeaderTop = styled.div`
  display: none;
 @media (max-width: 768px) {
   display: flex;
   justify-content: space-between;
   background-color: white;
   font-size: 20px;
 }
`;

const UserProfile = styled.div`
  width: 42px;
  height: 42px;
  margin-left: 19px;
  margin-top: 10px;
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
    height: 100%;
    object-fit: cover;
  }

  >svg {
    margin-top: 4px;
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
  @media (max-width: 768px) {
        display: none;
  }
`;

const MessengersData = styled.div`
   height: 100vh;
   background-color: white;
`;
const Nochats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const SearchArea = styled.div`
  background-color: white;
  display: block;
`;
const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #f5f5f5;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 295px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    &:focus { 
      @media (max-width: 768px) {
        width: 200px;
        
      }
    }
    @media (max-width: 768px) {
        width: 200px;
    }

    }
  }
  @media (max-width: 768px) {
        display: none;
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 11px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MessageInfo;
