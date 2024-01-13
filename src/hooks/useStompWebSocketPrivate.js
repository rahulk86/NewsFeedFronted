import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';
import urls from '../AUth/NewFeedAPI/NewFeedUrl';
import *  as messagingAuth  from "../AUth/NewFeedAPI/MessagingAuth";

const useWebSocket = (messenger,recieveMessageToSubscriber,receiveUpdateTime,axiosPrivate) => {
  const refresh                       = useRefreshToken();
  const { auth }                      = useAuth();
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connectWebSocket = async () => {
      const accessToken = auth?.accessToken;
      if (!accessToken) {
        console.error('Access token is missing. Unable to connect to WebSocket.');
        return;
      }
      const socket = new SockJS(urls.webSocketURL);
      const client = Stomp.over(socket);
      client.connect(
        {
          Authorization: `Bearer ${accessToken}`,
        },
        async () => {
          console.log('WebSocket connected');
          let response  = await messagingAuth.getUpdatedMessenger(axiosPrivate,messenger);
          messenger.creatAt = response.data.receiver.creatAt;
          setIsConnected(true);
          setStompClient(client);
          client.subscribe(urls.conversation + `/${messenger.conversationId}`, recieveMessageToSubscriber);
          client.subscribe(urls.receiveUpdateTime + `/${messenger.conversationId}`, receiveUpdateTime);
        },
        async (error) => {
          if (error?.headers?.message) {
            const newAccessToken = await refresh();
            auth.accessToken = newAccessToken;
          } else {
            console.error('WebSocket connection error:', error);
          }
        }
      );
    };

    connectWebSocket();

    return () => {
      if (isConnected) {
        stompClient.disconnect();
        setIsConnected(false);
        console.log('WebSocket disconnected');
      }
    };
  }, [messenger,auth.accessToken]);

  const sendMessage = (conversationId,message) => {
    if (isConnected) {
      stompClient.send(urls.sendMessage+'/'+conversationId,  {
                                            Authorization: `Bearer ${auth?.accessToken}`,
                                          }, JSON.stringify(message));
    } else {
      console.error('WebSocket not connected. Unable to send message.');
    }
  };

  const updateTime = (messenger) => {
    if (isConnected) {
      stompClient.send(urls.updateTime+'/'+messenger.conversationId,  {
                                            Authorization: `Bearer ${auth?.accessToken}`,
                                          }, JSON.stringify(messenger));
    } else {
      console.error('WebSocket not connected. Unable to send message.');
    }
  };

  

  return {sendMessage,updateTime};
};

export default useWebSocket;
