
import React from "react";
import styled ,{css} from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import GroupMemberList from "../GroupMemberList";

const NewGroup = ({setGroupState,setCurrentState,profileData,setGroupMember,setIsNewGroup})=>{
    return (
     <Container>
      <HeaderTop>

        <NavList>
          <FontAwesomeIcon icon={fortawesome.faArrowLeft} onClick={()=>{setGroupState('');setCurrentState('newchats');}}/>
          <span>Add group members</span>
        </NavList>

        <SmallMediaNavList >
          <FontAwesomeIcon icon={fortawesome.faArrowLeft} onClick={()=>{setGroupState('');setCurrentState('newchats');}} />
          <span>New Group</span>
          <FontAwesomeIcon icon={fortawesome.faSearch} />
        </SmallMediaNavList>
      </HeaderTop>

        <MessengersData>
          <SearchArea>
            <Search>
              <div>
                <input type="text" placeholder="Search name or number" />
              </div>
            </Search>
          </SearchArea>
         <GroupMemberList profileData = {profileData} setIsNewGroup = {setIsNewGroup} setGroupMember = {setGroupMember} />
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

const HeaderTop = styled.div`
   display: flex;
   justify-content: space-between;
   background-color: white;
   font-size: 20px;
`;

const NavList = styled.li`
  display: flex;
  flex-wrap: nowrap;
  padding: 30px 90px 6px 0px;
  width: 100%;
  justify-content: space-around;
  list-style-type: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MessengersData = styled.div`
   height: 100vh;
   background-color: white;
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
      border-radius: 2px;
      width: 295px;
      padding: 5px 0px 0px 20px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      vertical-align: text-top;
    }
  }
  @media (max-width: 768px) {
        display: none;
  }
`;
const Header = styled.div`
   display: flex;
   justify-content: space-between;
   background-color: white;
   border-right: 1px solid rgba(0, 0, 0, 0.15);
   border-bottom: 1px solid rgba(0, 0, 0, 0.15);
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

export default NewGroup;
