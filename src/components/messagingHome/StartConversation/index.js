import React ,{ useEffect,useState } from "react";
import styled ,{css} from "styled-components";
import ProfileImage from "../../ProfileImage";
import { useNavigate,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import *  as messagingAuth  from "../../../AUth/NewFeedAPI/MessagingAuth";
import useStompWebSocketPrivate from "../../../hooks/useStompWebSocketPrivate";

const StartConversation = ({messenger})=>{
  const axiosPrivate                         = useAxiosPrivate();
  const [message , setMessage]               = useState();
  const [recieveMessage , setRecieveMessage] = useState([]);
  const navigate                             = useNavigate();
  const location                             = useLocation();
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };

  const recieveMessageToSubscriber = (message) => {
    const data = JSON.parse(message.body);
    setRecieveMessage((prevMessages) => [...prevMessages, data.body]);
  }

  const {sendMessage } = useStompWebSocketPrivate(messenger,recieveMessageToSubscriber);

  const sendMessageToSubscriber=()=>{
    let data = {};
    data.text = message;
    sendMessage(messenger.conversationId,data);
  }

  useEffect( ()  => {
    (async ()=>{
      try{
       let response = await messagingAuth.getAllMessages(axiosPrivate,messenger);
      if(response.data){
        setRecieveMessage(response.data);
      }else{
        
        }
      }
      catch(err){
       
      }
    })();
  }, []);

    return (
        <Container>
           <Header>

            <Profile>
                <UserProfile>
                    <ProfileImage profileData={{image:messenger?.image}} />
                </UserProfile>
                <ProfileInfo>
                  <ProfileName >
                    <span>{messenger?.name}</span>
                  </ProfileName>
                </ProfileInfo>
            </Profile>

            <NavListWrap>
                <NavList>
                    <NavListItem>
                        <FontAwesomeIcon icon={fortawesome.faSearch} /> 
                    </NavListItem>
                </NavList>

                <NavList>
                    <NavListItem>
                        <FontAwesomeIcon icon={fortawesome.faEllipsisVertical} /> 
                    </NavListItem>
                </NavList>
            </NavListWrap>
           </Header>
   
           <ConversationArea>
           {recieveMessage && recieveMessage.length!=0 && recieveMessage.map((message,index) => (
            <Message isSent={message?.messengerId != messenger.id}>
              <MessageContent>{message?.text}</MessageContent>
              <MessageTimestamp>{new Intl.DateTimeFormat('en-US', options).format(new Date(message?.creatAt))}</MessageTimestamp>
            </Message>
           ))
           }
           </ConversationArea>
          
          <ConversationFooter>
            <ConversationNavListWrap>
                <NavList>
                    <NavListItem>
                        <FontAwesomeIcon icon={fortawesome.faFaceSmile} /> 
                    </NavListItem>
                </NavList>

                <NavList>
                    <NavListItem>
                        <FontAwesomeIcon icon={fortawesome.faPlus} /> 
                    </NavListItem>
                </NavList>

                <SearchArea>
                    <Search>
                      <div>
                        <input 
                          onChange={(e) => setMessage(e.target.value)}
                          value={message || ""}
                          id="chat" 
                          type="text" 
                          placeholder="Type a message" 
                        />
                      </div>
                    </Search>
                </SearchArea>
                {
                message && message.length>0?
                <NavList onClick={sendMessageToSubscriber}>
                    <NavListItem>
                        <FontAwesomeIcon icon={fortawesome.faPaperPlane} /> 
                    </NavListItem>
                </NavList>
                :<NavList> 
                    <NavListItem>
                        <FontAwesomeIcon icon={fortawesome.faMicrophone} /> 
                    </NavListItem>
                 </NavList>
                }

                </ConversationNavListWrap>
          </ConversationFooter>

        </Container>
       )
   };
   
   const Container = styled.div`
        width: 70%;
        background: #f5f5f5;
        overflow-y: hidden;
        overflow-x: hidden;
   `;
   
   const NavList = styled.li`
     display: flex;
     align-items: center;
     color: rgba(0, 0, 0, 0.6);
   `;
   
   
   const NavListItem = styled.a`
     align-items: baseline;
     background: transparent;
     display: flex;
     flex-direction: column;
     font-size: 12px;
     font-weight: 400;
     line-height: 1.5;
     min-width: 45px;
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
       @media (max-width: 768px) {
        font-size: 8px;
       }
       padding: 4px;
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
       position: absolute;
       padding: 0;
       margin: 0;
       top: 0;
       display: flex;
       justify-content: center;
     }
   `;
   const ConversationNavListWrap = styled.ul`
     display: flex;
     flex-wrap: nowrap;
     list-style-type: none;
     width: 100%;
     justify-content: space-between;
     @media (max-width: 768px) {
       position: absolute;
       padding: 0;
       margin: 0;
       top: 0;
       display: flex;
       justify-content: center;
     }
   `;
   
   const Header = styled.div`
      display: flex;
      justify-content: space-between;
      background-color: white;
      padding: 5px;
   `;
   
   const UserProfile = styled.div`
     width: 42px;
     height: 42px;
     margin-right: 11px;
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
   `;
   
   const ConversationFooter = styled.div`
      display: flex;
      justify-content: space-between;
      background-color: white;
      border-left: 1px solid rgba(0, 0, 0, 0.15);
   `;


const SearchArea = styled.div`
  background-color: white;
  display: block;
  width: 85%;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  & > div {
    width: 100%;
    input {
        border: none;
        box-shadow: none;
        background-color: #f5f5f5;
        border-radius: 10px;
        color: rgba(0, 0, 0, 0.9);
        width: 98%;
        padding: 0px 0px 0 11px;
        line-height: 1.75;
        font-weight: 400;
        font-size: 14px;
        height: 45px;
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
`;

const ConversationArea =  styled.div`
  height: 40vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 70px;
`;
   
const Message = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) =>
      props.isSent
        ? css`
            background-color: #dcf8c6;
            align-self: flex-end;
            max-width: 70%;
            margin-bottom: 5px;
            padding: 8px;
            border-radius: 8px;
          `
        : css`
            background-color: #fff;
            align-self: flex-start;
            max-width: 70%;
            margin-bottom: 5px;
            padding: 8px;
            border-radius: 8px;
          `
    }
`
const MessageContent = styled.div`

`
const MessageTimestamp = styled.div`
  font-size: 0.6em;
  color: #888;
  align-self: flex-end;
`
const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileInfo = styled.div`
    span{
      font-size: 12px;
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

export default StartConversation;
   