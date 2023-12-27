import React ,{ useEffect,useState } from "react";
import LinkedinLogo from "./linkedin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import  SignOut from "../../signout/index";
import  ProfileImage from "../../ProfileImage";
import NewPost from "../Posts/newPost";
import {Link, useNavigate,useLocation } from "react-router-dom";
import styled,{css} from "styled-components";

const Header = ({profileData}) => {

  const [showSignOut, setShowSignOut]   = useState(false);
  const [newPostPopup, setNewPostPopup] = useState(false);
  const navigate                        = useNavigate();
  const location                        = useLocation();

  const handleMeClick = () => {
    setShowSignOut(!showSignOut);
  };

  const handleCloseSignOut = () => {
    setShowSignOut(false);
  };
  

  const navigateMessaging = ()=>{
    navigate('/messaging', { state: {  from: location},replace: true });
  };

  const navigateFeed = ()=>{
    navigate('/feed', { state: { from: location },replace: true  });
  };

  return (
    <Container>
      <Content>

        <Logo>
          <a href="/home">
            <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
          </a>
        </Logo>

          <UserSmallMedia isSmallMedia={true}>
            <UserProfile>
              <ProfileImage profileData={profileData} />
            </UserProfile>
          </UserSmallMedia>

        <Search>
          <div>
            <input type="text" placeholder="Search" />
          </div>
          <SearchIcon>
             <FontAwesomeIcon icon={fortawesome.faSearch} className="faSearch" />
          </SearchIcon>
        </Search>

        <SmallMediaNavList active={"/messaging"==location.pathname}  isSmallMedia={true} onClick={navigateMessaging}>
          <NavListItem>
            <FontAwesomeIcon icon={fortawesome.faMessage} /> 
            <span>Messaging</span>
          </NavListItem>
        </SmallMediaNavList>

        <Nav>
          <NavListWrap>
            <NavList active={"/feed"==location.pathname} isSmallMedia={true} onClick={navigateFeed}>
              <NavListItem>
                <FontAwesomeIcon icon={fortawesome.faHome} /> 
                <span>Home</span>
              </NavListItem>
            </NavList>

            <NavList isSmallMedia={true}>
              <NavListItem>
                <FontAwesomeIcon icon={fortawesome.faPeopleGroup} /> 
                <span>My Network</span>
              </NavListItem>
            </NavList>

            <SmallMediaNavList 
                isSmallMedia={true} 
                onClick={()=>{setNewPostPopup(true)}}
               >
              <NavListItem>
                <FontAwesomeIcon icon={fortawesome.faPlusSquare} /> 
                <span>Post</span>
              </NavListItem>
            </SmallMediaNavList>

            <NavList isSmallMedia={true}>
              <NavListItem>
                <FontAwesomeIcon icon={fortawesome.faBriefcase} /> 
                <span>Jobs</span>
              </NavListItem>
            </NavList>

            <NavList active={"/messaging"==location.pathname}  isSmallMedia={false} onClick={navigateMessaging}>
              <NavListItem>
                <FontAwesomeIcon icon={fortawesome.faMessage} /> 
                <span>Messaging</span>
              </NavListItem>
            </NavList>

            <NavList isSmallMedia={true}>
              <NavListItem>
                <FontAwesomeIcon icon={fortawesome.faBell} /> 
                <span>Notifications</span>
              </NavListItem>
            </NavList>

            <NavList onClick={handleMeClick} isSmallMedia={false} >
              <User>
                <UserProfile>
                  <ProfileImage profileData={profileData} />
               </UserProfile>
                <div>
                  <span>Me</span>
                  <FontAwesomeIcon icon={fortawesome.faCaretDown} />
                </div>
              </User>
            </NavList>

            <NavList isSmallMedia={false}>
            <Work>
              <a>
                <img src="/images/nav-work.svg" alt="" />
                <span>
                  Work
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
            </NavList>
          </NavListWrap>
        </Nav>
      </Content>
      {showSignOut && <SignOut profileData = {profileData} handleCloseSignOut={handleCloseSignOut} />}
      {newPostPopup && <NewPost funVal = {setNewPostPopup} profileData={profileData} />}
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  padding: 0 24px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
  @media (max-width: 768px) {
    padding: unset;
  }
`;

const Content = styled.div`
  max-height: 56px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 1180px;
  @media (max-width: 768px) {
    margin: 6px 0 0 -6px;
    max-height: 65px;
  }
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    &:focus {
      width: 320px; 
      @media (max-width: 768px) {
        width: 200px;
      }
    }
    @media (max-width: 768px) {
        width: 200px;
    }

    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  width: 100%;
  max-width: 779px;
  height: 100%;
  margin-top: 3px;
  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    max-height: 56px;
    bottom: 0;
    max-width: 559px;
    background: white;
  }
`;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;
  @media (max-width: 768px) {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 0;
    display: flex;
    justify-content: center;
  }
`;

const SmallMediaNavList = styled.li`
  display: none;
  align-items: center;
  @media (max-width: 768px) {
  ${(props) =>
    props.isSmallMedia
      ? css`
         display: flex;
        `
      : css`
       display: none;
      `
    }

  ${(props) =>
        props.active
          ? css`
              color: rgba(0, 0, 0, 0.9);
            `
          : css`
          
          `

    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);

  ${(props) =>
      props.active
        ? css`
            span:after {
              content: "";
              transform: scaleX(1);
              border-bottom: 2px solid var(--white, #fff);
              bottom: 0;
              left: 0;
              position: absolute;
              transition: transform 0.2s ease-in-out;
              width: 100%;
              border-color: rgba(0, 0, 0, 0.9);
            }
            color: rgba(0, 0, 0, 0.9);
          `
        : css`
        
        `
    }
 
  
  @media (max-width: 768px) {
    
  ${(props) =>
      props.active
        ? css`
            span:after {
              content: "";
              transform: scaleX(1);
              border-top: 2px solid var(--white, #fff);
              border-bottom: none;
              bottom: 0;
              top: 0;
              left: 0;
              position: absolute;
              transition: transform 0.2s ease-in-out;
              width: 100%;
              border-color: rgba(0, 0, 0, 0.9);
            }
            color: rgba(0, 0, 0, 0.9);
          `
        : css`
        
        `
  }

  ${(props) =>
    props.isSmallMedia
      ? css`
        `
      : css`
       display: none;
      `
    }
  }
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
  min-width: 75px;
  position: relative;
  text-decoration: none;

  svg {
    font-size: 20px;
  }

  span {
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
     font-size: 8px;
    }
    padding: 4px;
  }

  &:hover{
    color: rgba(0, 0, 0, 0.9);
  }

`;

const User = styled.a`
  align-items: center;
  background: transparent;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  line-height: 1.5;
  min-height: 52px;
  min-width: 80px;
  position: relative;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;



  span {
    display: flex;
    align-items: center;
    padding: 4px;
  }

  @media (max-width: 768px) {
    min-width: 70px;
  }

  &:hover,
  &:active {
    color: rgba(0, 0, 0, 0.9);
  }

  div{
    display: flex;
    justify-content: space-around;
    svg{
      padding: unset;
      padding-top: 3px;
      font-size: 15px;
      box-shadow: none;
    }
  }
`;

const UserSmallMedia = styled.a`
  align-items: center;
  background: transparent;
  flex-direction: column;
  display: none;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  line-height: 3;
  min-width: 56px;
  position: relative;
  color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  @media (max-width: 768px) {
  ${(props) =>
    props.isSmallMedia
      ? css`
         display: flex;
        `
      : css`
      `
    }
  }
`;

const UserProfile = styled.div`
  margin: -5px;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
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
    width: 100%;
    height: 70%;
    object-fit: cover;
  }
`;
const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);
`;

export default Header;
