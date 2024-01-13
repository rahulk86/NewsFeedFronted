import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import urls from '../../AUth/NewFeedAPI/NewFeedUrl';
import styled from 'styled-components';
import { Nav, NavBoady, Container } from "../signin";
import NewFeedLogo from '../../NewFeedLogo';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const EmailVerification = () => {
    const location                         = useLocation();
    const [success, setSuccess]            = useState(false);
    const [errorMessage, setErrorMessage]  = useState("");
    const [stompClient, setStompClient]    = useState(null);

    useEffect(() => {
        const socket = new SockJS(urls.webSocketURL);
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            setStompClient(stomp);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token');
        const handleVerification = async () => {
            try{
                let response = await userAuth.verifyEmail(token);
                if(response.data){
                    setSuccess(true);  
                    stompClient.send(urls.sendSuccess+`/${token}`);
                }
                else{
                    setSuccess(false);
                    console.error('Email verification failed');  
                }
            }
            catch(error){
                if (!error?.response) {
                    setErrorMessage('No Server Response');
                } else if (error.response?.status === 409) {
                    let message = error.response.data?.message;
                    message = message.split("::");
                    setErrorMessage(message[message.length-1]);
                } else {
                    setErrorMessage('Oops! Something went wrong.')
                }
                setSuccess(false);
                console.error(error);
            }
       }

        if (stompClient) {
            handleVerification();
        }

    }, [location.search,stompClient]);

    return (
        <Container>
            <Nav>
                <NavBoady>
                    <NewFeedLogo />
                </NavBoady>
            </Nav>
            {
            success?
            <WelcomeContainer>
                <WelcomeCard>
                    <h2>Welcome to NewFeed!</h2>
                    <p>Your account has been successfully activated.</p>
                </WelcomeCard>
            </WelcomeContainer>
            :
            <ErrorContainer>
                <ErrorCard>
                    <h2>{errorMessage}</h2>
                    <p>We apologize for the inconvenience. Please try again later.</p>
                </ErrorCard>
            </ErrorContainer>
            }
        </Container>
    );
};


const WelcomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

const WelcomeCard = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    h2 {
       color: #333;
    }
    p {
       color: #666;
    }
 `;

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
`;

const ErrorCard = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    h2 {
     color: #d9534f; /* Bootstrap's danger color */
    }
    p {
     color: #333;
    }
  `;




export default EmailVerification;
