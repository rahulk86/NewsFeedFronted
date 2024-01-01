import React ,{ useEffect,useState } from "react";
import styled from "styled-components";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";
import * as profileAuth from "../../../AUth/NewFeedAPI/ProfileAuth";
import NewMessenger from "../NewMessenger";


const ProfileList = ({setMessenger})=>{
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
         {profilesData && profilesData.map((post,index) => (
            <NewMessenger profileData = {post} setMessenger={setMessenger} />
          ))}
       </Container>
    );



};

const Container = styled.div`
   height: 65vh; 
`;

export default ProfileList;