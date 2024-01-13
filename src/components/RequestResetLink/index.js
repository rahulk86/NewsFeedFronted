import React, { useState } from 'react';
import styled from 'styled-components';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import { Nav, NavBoady, Container ,FormButton} from "../signin";
import NewFeedLogo from '../../NewFeedLogo';

const RequestResetLink = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await userAuth.passwordResetEmail(email);
            setMessage({ text: response.data.message, error: false });
        } catch (error) {
            let errorMessage ;
            if (!error?.response) {
                errorMessage = 'No Server Response';
            } else if (error.response?.status === 409) {
                let message = error.response.data?.message.split("::");
                errorMessage = message[message.length-1];
            } else {
                errorMessage = 'Failed to request password reset. Please try again.';
            }
            setMessage({ text: errorMessage, error: true });
        }
    };

    return (
        <Container>
            <Nav>
                <NavBoady>
                    <NewFeedLogo />
                </NavBoady>
            </Nav>
            <Content>
                <ForgotPasswordContainer>
                    <Title>Forgot Password</Title>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormButton onClick={handleForgotPassword}>Request Password Reset</FormButton>
                    {message && <Message error={message.error} > {message.text}</Message>}
                </ForgotPasswordContainer>
            </Content>
        </Container>
    );
};

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    background-color: #f4f4f4;
`;

const ForgotPasswordContainer = styled.div`
    background-color: white;
    width: 100%;
    max-width: 399px;
    padding: 36px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    >button{
       display: table;
       margin-inline: auto;
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;



const Message = styled.p`
    margin-top: 10px;
    @media (max-width: 768px) {
        width: 100%;
    }
    color: ${(props) => (props.error ? '#d9534f' : '#5bc0de')};
    text-align: center;
`;

export default RequestResetLink;
