import React ,{ useEffect,useState } from "react";
import styled from "styled-components";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";
import * as profileAuth from "../../../AUth/NewFeedAPI/ProfileAuth";
import GroupMember from "../GroupMember";
import SelectedAdmin from "../SelectedAdmin";
import { FaArrowRight } from "react-icons/fa";


const GroupMemberList = ({profileData,setIsNewGroup,setGroupMember})=>{
    const axiosPrivate                          = useAxiosPrivate();
    const navigate                              = useNavigate();
    const location                              = useLocation();
    const [profilesData, setProfilesData]       = useState();
    const [selectedProfile, setSelectedProfile] = useState([]);

    const toggleSelectMessenger = (profile) => {
      if (selectedProfile.includes(profile)) {
        setSelectedProfile((prev) => prev.filter((p) => p !== profile));
      } else {
        setSelectedProfile((prev) => [...prev, profile]);
        setGroupMember((prev) => [...prev, profile]);
      }
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchData = async () => {
          try{
            const profileResponse = await profileAuth.getAllProfile(axiosPrivate,controller);
    
            if(profileResponse.data){
              if(isMounted){
                setProfilesData(profileResponse.data.filter((p) => p.user.name !== profileData.user.name));
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
      }, []);

    return(
       <Container>
        {selectedProfile && selectedProfile.length > 0 && (
            <SelectedListContainer>
              {selectedProfile.map((selectedProfile) => (
                <SelectedAdmin 
                   key={selectedProfile.id} 
                   profileData={selectedProfile}
                   onClose={() => toggleSelectMessenger(selectedProfile)}
                />
              ))}
            </SelectedListContainer>
          )
        }

        {profilesData &&
          (
            <NewMessengerContainer>
              {profilesData.map((profile, index) => (
                !selectedProfile.includes(profile) && <GroupMember
                  key={index}
                  profileData={profile}
                  onSelect={() => toggleSelectMessenger(profile)}
                />
            ))}
          </NewMessengerContainer>
          )
        }

        {selectedProfile && selectedProfile.length > 0 && 
          <IconContainer onClick={()=>{setIsNewGroup(false)}} >
            <FaArrowRight size={30} />
          </IconContainer>
        }

       </Container>
    );



};

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

const Container = styled.div`
  height: 65vh;
`;

const SelectedListContainer = styled.div`
  display: flex;
  overflow-y: auto;
  max-height: 140px;
  flex-wrap: wrap;
  height: 30%; 
`;
const NewMessengerContainer = styled.div`
  overflow-y: auto;
  height: 70%; 
 
`;

export default GroupMemberList;