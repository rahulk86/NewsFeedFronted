
import React ,{useState } from "react";
import styled ,{css} from "styled-components";
import NewGroup from "../NewGroup";
import NewGroupInfo from "../NewGroupInfo";

const NewGroupHandler = ({profileData,setGroupState,setCurrentState})=>{
  const [isNewGroup, setIsNewGroup] = useState(true);
  const [groupMember, setGroupMember] = useState([]);
    return (
     <Container>
      {isNewGroup
        ?<NewGroup 
          setGroupState = {setGroupState} 
          setCurrentState = {setCurrentState} 
          setIsNewGroup = {setIsNewGroup}
          setGroupMember = {setGroupMember} 
          profileData = {profileData} />
        :<NewGroupInfo  setIsNewGroup={setIsNewGroup} groupMember={groupMember}/>
      }
     </Container>
    )
};

const Container = styled.div`
    width: 100%;
`;

export default NewGroupHandler;
