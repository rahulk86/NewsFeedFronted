import React ,{ useEffect,useState } from "react";
import styled from "styled-components";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate,useLocation } from "react-router-dom";
import * as messagingAuth from "../../../AUth/NewFeedAPI/MessagingAuth";
import Messenger from "../Messenger";


const Messengers = ({setMessenger})=>{
    const axiosPrivate                        = useAxiosPrivate();
    const navigate                            = useNavigate();
    const location                            = useLocation();
    const [messengersData, setMessengersData] = useState();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchData = async () => {
          try{
            const response = await messagingAuth.getAllMessenger(axiosPrivate,controller);
    
            if(response.data){
              if(isMounted){
                setMessengersData(response.data);
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
         {messengersData && messengersData.length!=0? messengersData.map((messenger,index) => (
            <Messenger messenger = {messenger} setMessenger={setMessenger} />
          ))
          :
          <Nochats>No chats</Nochats>
          }
       </Container>
    );



};

const Container = styled.div`
   height: 65vh; 
   overflow-y: auto;
`;

const Nochats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export default Messengers;