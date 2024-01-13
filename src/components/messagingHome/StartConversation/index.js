import React ,{ useEffect,useState } from "react";
import styled ,{css} from "styled-components";
import ProfileImage from "../../ProfileImage";
import CoversationMessageTimestamp from "../CoversationMessageTimestamp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import *  as messagingAuth  from "../../../AUth/NewFeedAPI/MessagingAuth";
import useStompWebSocketPrivate from "../../../hooks/useStompWebSocketPrivate";


const StartConversation = ({messenger,setMessenger})=>{
  const axiosPrivate                         = useAxiosPrivate();
  const [message , setMessage]               = useState();
  const [recieveMessage , setRecieveMessage] = useState([]);
  const [messengerDate , setMessengerDate]   = useState([]);
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };

  const recieveMessageToSubscriber = (message) => {
    const userMessageResponse = JSON.parse(message.body).body;
    setRecieveMessage((prevMessages) => [...prevMessages, userMessageResponse.message]);
    if(messenger.id == userMessageResponse.messenger.id){
      messenger.creatAt = userMessageResponse.messenger.creatAt;
    }
  }

  const receiveUpdateTime = (message) => {
    const response = JSON.parse(message.body).body;

    if(messenger.id == response.receiver.id){
      messenger.creatAt = response.receiver.creatAt;
    }

    if(messenger.id == response.sender.id){
      messenger.creatAt = response.sender.creatAt;
    }
    setMessengerDate(messenger.creatAt);
  }

const {sendMessage,updateTime} = useStompWebSocketPrivate(messenger,recieveMessageToSubscriber,receiveUpdateTime,axiosPrivate);

const sendMessageToSubscriber=()=>{
    let data = {};
    data.text = message;
    sendMessage(messenger.conversationId,data);
    setMessage("");
}

const handleChangeMessage = async (e)=>{
  setMessage(e.target.value);
  updateTime(messenger);
};

useEffect( ()  => {},[message]);

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
  }, [messenger]);

    return (
        <Container>
           <Header>
            <Profile>

                <ArrowNavListWrap onClick={() => setMessenger(null)}>
                  <NavList>
                    <NavListItem>
                        <FontAwesomeIcon icon={fortawesome.faArrowLeft} /> 
                    </NavListItem>
                  </NavList>
                </ArrowNavListWrap>

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
              <CoversationMessageTimestamp
                 createdAt={message?.creatAt}
                 isSelf={message?.messengerId != messenger.id}
                 isUnread={messenger.creatAt>message?.creatAt}
              />
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
                          onChange={handleChangeMessage}
                          onClick={handleChangeMessage}
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
        @media (max-width: 768px) {
          width:unset
        }
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
       padding: 0;
       margin: 0;
       top: 0;
       display: flex;
       justify-content: center;
     }
   `;
   const ArrowNavListWrap = styled.ul`
     display: none;
     @media (max-width: 768px) {
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
  @media (max-width: 768px) {
    height: 82vh;
    padding: 15px;
  }
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

`;

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
   