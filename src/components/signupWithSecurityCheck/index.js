import React, { useRef,useState ,useEffect} from 'react';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import styled,{css} from "styled-components";
import {useNavigate,useLocation } from "react-router-dom";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import urls from '../../AUth/NewFeedAPI/NewFeedUrl';
import useAuth from '../../hooks/useAuth';
import {  Container,
          Content,
          Nav,
          NavBoady,
          NavImage,
          AuthInputs,
          AuthInputsLabel,
          CommonInput,
          Errmsg,
          Form,
          FormButton,
          FormInner
        }                                  from "../signin";
import {  BigMedidaSubtitle,
          SmallMedidaSubtitle,
          Instructions
        }                                  from "../signup";
import NewFeedLogo from '../../NewFeedLogo';

function SignupWithSecurityCheck() {
  const verifyCodRef                    = useRef();
  const userRef                         = useRef();
  const errRef                          = useRef();
  const verifyCodeErrRef                = useRef();
  const [firstName, setFirstName]       = useState('');
  const [lastName, setLastName]         = useState('');
  const [errMsg, setErrMsg]             = useState('');
  const [success, setSuccess]           = useState(false);
  const navigate                        = useNavigate();
  const location                        = useLocation();
  const { setAuth }                     = useAuth(); 
  const [stompClient, setStompClient]   = useState(null);
  const [code, setCode]                 = useState('');
  const [validateCode, setValidateCode] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState(location?.state?.emailOrPhone);
  const [password, setPassword]         = useState(location?.state?.password);
  const [token, setToken]               = useState('');
    


useEffect(() => {
  if(success){
    verifyCodRef.current.focus();
  }
  else{
    userRef.current.focus();
  }
}, [success]);

useEffect(() => {
  if (stompClient) {
    stompClient.disconnect();
  }
    const socket = new SockJS(urls.webSocketURL);
    const stomp = Stomp.over(socket);

    stomp.connect({}, () => {
        setStompClient(stomp);
        stomp.subscribe(urls.recievSuccess+`/${token}`, (message) => {
            handleEmailVerificationSuccess(message);
        });
    });

    return () => {
        if (stompClient) {
            stompClient.disconnect();
        }
    };
}, [token]);

const handleEmailVerificationSuccess = async (message)=>{
  let authRespnse =  await userAuth.signInWithEmailAndPassword(emailOrPhone,password);
  responsehandler(authRespnse,emailOrPhone,password);
  if (stompClient) {
    stompClient.disconnect();
  }
};

useEffect(() => {
  setValidateCode(code.length==6);
}, [code])

  const handleCodeChange = (value) => {
    const formattedCode = value.replace(/\D/g, '').slice(0, 6);
    setCode(formattedCode);
  };

  let responsehandler = function(response,eamil,password){
    const accessToken = response?.data?.accessToken;
    const roles       = response?.data?.roles;
    setAuth({eamil, password, roles, accessToken });
    navigate("/feed", { replace: true });
  }

  let errorhandler = function(err){
    if (!err?.response) {
      setErrMsg('No Server Response');
    } else if (err.response?.status === 409) {
      setErrMsg(err.response.data?.message);
    } else {
      setErrMsg('Registration Failed')
    }
    errRef.current.focus();
  }
  let verifyCodeErrorhandler = function(err){
    if (!err?.response) {
      setErrMsg('No Server Response');
    } else if (err.response?.status === 409) {
      let message = err.response.data?.message;
      message = message.split("::");
      setErrMsg(message[message.length-1]);
    } else {
      setErrMsg('Registration Failed')
    }
    verifyCodeErrRef.current.focus();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      let respnse = await userAuth.verifyEmailByCode(code);
      let authRespnse =  await userAuth.signInWithEmailAndPassword(emailOrPhone,password);
      responsehandler(authRespnse,emailOrPhone,password);
    }
    catch(err){
      verifyCodeErrorhandler(err);
    }
  };

  const handleContinue = async (event) => {
    event.preventDefault();
    try {
      const respnse    = await userAuth.createNewUser(
                                  emailOrPhone,
                                  password,
                                  firstName+' ' +lastName
                              );
      if(respnse.data){
        try{
          setSuccess(true);
          setToken(respnse.data.token);
          setFirstName('');
          setFirstName('');
        }
        catch(err){
          errorhandler(err);
        }
      }
  } catch (err) {
    errorhandler(err);
  }
  };

  return (
  <Container>
    <Nav>
      <NavBoady>
        <NewFeedLogo/>
      </NavBoady>
    </Nav>
    <BigMedidaSubtitle>Make the most of your professional life</BigMedidaSubtitle>
    <SmallMedidaSubtitle>Join Linkdin Now - it's free!</SmallMedidaSubtitle>
    {!success ?
    <Content>
    <Errmsg ref={errRef} enabled={errMsg} aria-live="assertive">{errMsg}</Errmsg>          
      <Form onSubmit={handleContinue} >
        <FormInner>
          <AuthInputs>
            <CommonInput
              onChange={(e) => setFirstName(e.target.value)}
              type="name"
              ref={userRef}
              aria-describedby="uidnote"
              placeholder="First name"
              id="firstName" 
              value={firstName || ""}
            />
            <AuthInputsLabel enabled={ firstName&& firstName.length>0 }>
                First name
            </AuthInputsLabel>
          </AuthInputs>

          <AuthInputs>
            <CommonInput
              id="lastName"
              value={lastName || ""}
              onChange={(e) => setLastName(e.target.value)} 
              aria-describedby="pwdnote"
              type="name"
              placeholder="Last name"
            />
            <AuthInputsLabel enabled={ lastName&& lastName.length>0}>
              Last name
            </AuthInputsLabel>
          </AuthInputs>
           <FormButton>Continue</FormButton>
        </FormInner>
      </Form>
    </Content>
:
    <Content>
      <Header>
        <Heading>Code Confirmation</Heading>
        <Subheading>An email has been sent to your address with a 6-digit confirmation code.</Subheading>
      </Header>
      <Errmsg ref={verifyCodeErrRef} enabled={errMsg} aria-live="assertive">{errMsg}</Errmsg>  
      <Form onSubmit={handleSubmit} >
        <CodeConfirmationInput
          type="text"
          ref={verifyCodRef}
          placeholder="______"
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          maxLength="6"
          pattern="[0-9]{6}"
          title="Please enter a 6-digit code"
        />
        <FormButton disabled={!validateCode} >Submit </FormButton>
      </Form>
    </Content>
}
  </Container>
  );
}

const CodeConfirmationInput = styled.input`
  width: 100%;
  padding: 6px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  letter-spacing: 27px;
`;

const Strong  = styled.strong `
 font-weight: bold;
  font-size: 16px;
`;

const Header = styled.div`
 width: 100%;
`;

const Heading = styled.p`
  font-size: 1.8rem;
  line-height: 0.5;
  font-weight: 600;
  color: rgba(0,0,0,0.9);
`;

const Subheading = styled.h1`
  font-size: 1.1rem;
  padding: 12px;
  font-weight: 500;
  color: rgba(0,0,0,0.9);
`;

const codeInputContainer = styled.div`
  display: flex;
  gap: 5px;
`;
export default SignupWithSecurityCheck;
