import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';
import urls from '../AUth/NewFeedAPI/NewFeedUrl';

const useWebSocket = (messenger,recieveMessageToSubscriber) => {
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
        () => {
          console.log('WebSocket connected');
          setIsConnected(true);
          setStompClient(client);
          client.subscribe(urls.conversation + `/${messenger.conversationId}`, recieveMessageToSubscriber);
        },
        async (error) => {
          if (error?.response?.status === 401) {
            const newAccessToken = await refresh();
            client.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            client.reconnect({}, () => {
              console.log('WebSocket reconnected after token refresh');
            });
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
  }, []);

  const sendMessage = (conversationId,message) => {
    if (isConnected) {
      stompClient.send(urls.sendMessage+'/'+conversationId,  {
                                            Authorization: `Bearer ${auth?.accessToken}`,
                                          }, JSON.stringify(message));
    } else {
      console.error('WebSocket not connected. Unable to send message.');
    }
  };

  return {sendMessage };
};

export default useWebSocket;
