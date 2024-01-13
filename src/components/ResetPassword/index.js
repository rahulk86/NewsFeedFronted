import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Nav, NavBoady, Container,FormButton } from "../signin";
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import NewFeedLogo from '../../NewFeedLogo';


const ResetPassword = () => {
    const [password, setPassword]                 = useState('');
    const [confirmPassword, setConfirmPassword]   = useState('');
    const [validatePassword, setValidatePassword] = useState(false);
    const [message, setMessage]                   = useState('');
    const location                                = useLocation();


    useEffect(() => {
        setValidatePassword(password!=='' && password === confirmPassword);
      }, [confirmPassword]);

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setMessage({ text: 'Passwords do not match', error: true });
            return;
        }
        const token = new URLSearchParams(location.search).get('token');
        try {
            let data       = {};
            data.token     = token;
            data.password  = password;
            const response = await userAuth.forgetPassword(data);
            setMessage({ text: response.data.message, error: false });
        } catch (error) {
            let errorMessage ;
            if (!error?.response) {
                errorMessage = 'No Server Response';
            } else if (error.response?.status === 409) {
                let message = error.response.data?.message.split("::");
                errorMessage = message[message.length-1];
            } else {
                errorMessage = 'Failed to reset password. Please try again.';
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
        <ResetPasswordContainer>
            <Title>Reset Password</Title>
            <FormGroup>
                <Label>New Password:</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label>Confirm Password:</Label>
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </FormGroup>
            <FormButton disabled={!validatePassword} onClick={handleResetPassword}>Reset Password</FormButton>
            {message && <Message error={message.error}>{message.text}</Message>}
        </ResetPasswordContainer>
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


const ResetPasswordContainer = styled.div`
    background-color: white;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 36px;
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
    color: ${(props) => (props.error ? '#d9534f' : '#5bc0de')};
    text-align: center;
`;

export default ResetPassword;
