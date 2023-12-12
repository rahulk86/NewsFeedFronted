import React, { useRef,useState,useEffect } from 'react';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import useAuth from '../../hooks/useAuth';
import {Link, useNavigate,useLocation } from "react-router-dom";
import {toast } from 'react-toastify';
import styled,{css} from "styled-components";
function SignIn() {
  const errRef                          = useRef();
  const userRef                         = useRef();
  const navigate                        = useNavigate();
  const location                        = useLocation();
  const { setAuth }                     = useAuth(); 
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword]         = useState('');
  const [errMsg, setErrMsg]             = useState('');

  const from = location.state?.from?.pathname || "/feed";
  useEffect(  () => {

    let  getUrlParameter = function(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    if(location.search){
      let token = getUrlParameter('token');
      try{
        let respnse =   userAuth.oauth2(token);
        responsehandler(respnse);
      }
      catch (error){
        errorhandler(error);
        userRef.current.focus();
      }

    }
    else{
      userRef.current.focus();
    }
  }, []);

  
  useEffect(() => {
    setErrMsg('');
  }, [emailOrPhone, password]);


  let responsehandler = function(response){
    toast.success("Signed In to Linkdin")
    const accessToken = response?.data?.accessToken;
    const roles       = response?.data?.roles;
    const eamil       = emailOrPhone;
    setAuth({eamil, password, roles, accessToken });
    setEmailOrPhone('');
    setPassword('');
    navigate(from, { replace: true });
  }

  let errorhandler = function(error){
    if (!error?.response) {
      setErrMsg('No Server Response');
    } else if (error.response?.status === 400) {
      setErrMsg(error.response.data?.message);
    } else if (error.response?.status === 401) {
      setErrMsg('Unauthorized : '+error.response.data);
    } else {
      setErrMsg('Login Failed');
    }
    errRef.current.focus();
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      let respnse =  await userAuth.signInWithEmailAndPassword(emailOrPhone,password);
      responsehandler(respnse);
    }
    catch (error){
      errorhandler(error);
    }
  };

  return (
  <Container>
    <Nav>
      <NavBoady>
      <NavImage src="/images/login-logo.svg" alt=""/>
      </NavBoady>
    </Nav>

    <Content>
      <Errmsg ref={errRef} enabled={errMsg} aria-live="assertive">{errMsg}</Errmsg>
      <Form onSubmit={handleSubmit} >
        <FormInner>
          <Header>
            <Heading>Sign in</Heading>
            <Subheading>Stay updated on your professional world</Subheading>
          </Header>

          <AuthInputs>
            <CommonInput
              ref={userRef}
              type="email"
              placeholder={`Email or Phone`}
              id="email" 
              autoComplete="off"
              onChange={(e) => setEmailOrPhone(e.target.value)}
              value={emailOrPhone}
              required
            />
            <AuthInputsLabel enabled={ emailOrPhone && emailOrPhone.length>0}>
                  Email or Phone
            </AuthInputsLabel>
          </AuthInputs>

          <AuthInputs>
            <CommonInput
                id="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)} 
                type="password"
                placeholder="Password (6+ characters)"
                required
            />

            <AuthInputsLabel  enabled={ password && password.length>0 }>
              Password (6+ characters)
            </AuthInputsLabel>

          </AuthInputs>

          <ForgetPassword>
            <ForgetPasswordLink
                href="/checkpoint/rp/request-password-reset" 
                data-cie-control-urn="forgot-password-btn">
                  Forgot password?
            </ForgetPasswordLink>
          </ForgetPassword>

          <FormButton disabled={!emailOrPhone||!password}>Sign in</FormButton>
          
        </FormInner>
      </Form>
      <HrText data-content="or" />
      <Auth2OContainer>
          <Navigate>
            New to LinkedIn?{" "}
            <NavigateLink to="/signup" >Join now</NavigateLink>
         </Navigate>
      </Auth2OContainer>
    </Content>
  </Container>
  );
}

export const Container = styled.div`
  max-width: 100%;
  height: 100%;
  background: #f5f5f5;
  @media (max-width: 900px) {
    background: none;
  }
`;

export const Content = styled.div`
  width: 300px;
  -webkit-box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 24px;
  border-radius: 8px;
  margin: 0 auto;
  background: var(--color-background-container, #fff);
  @media (max-width: 768px) {
    box-shadow:none;
  }
`;
const ForgetPassword = styled.span`
  @media (max-width: 900px) {
    display: flex;
    justify-content: left;
    width: 100%;
  }
`;
const ForgetPasswordLink = styled.a`
`;
export const NavImage = styled.img`

`;

export const NavBoady = styled.a`
    width: 135px;
    height: 34px;

`;

export const Nav = styled.nav`
  max-width: 1128px;
  padding: 12px 4px 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  @media (max-width: 900px) {
    padding: 12px 26px 0px;
  }
`;

export const Form = styled.form`

`;

export const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
 width: 100%;
`;

const Subheading = styled.h1`
  font-size: 0.8rem;
  line-height: 3.1;
  font-weight: 500;
  color: rgba(0,0,0,0.9);
`;

const Heading = styled.p`
  font-size: 1.8rem;
  line-height: 0.5;
  font-weight: 600;
  color: rgba(0,0,0,0.9);
`;
export const AuthInputs = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

export const AuthInputsLabel = styled.div`
   ${(props) =>
    props.enabled
      ? css`
        position: absolute;
        top: 3px;
        left: 18px;
        color: #888;
        font-size: 14px;
        transition: top 0.3s;
        `
      : css`
          display: none;
        `}
`;

export const CommonInput = styled.input`
  width: 100%;
  padding: 18px;
  border: 1px solid #ccc;

  &.filled::placeholder,
  &:focus::placeholder {
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }
`;

export const FormButton = styled.button`
  width: 300px;
  height: 50px;
  cursor: pointer;
  background-color: #0073b1;
  border-radius: 30px;
  outline: none;
  border: none;
  font-family: system-ui;
  font-weight: 600;
  color: #ffffff;
  font-size: 18px;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #004c75;
  }
`;

export const Errmsg = styled.p`
  ${(props) =>
    props.enabled
      ? css`
          background-color: lightpink;
          color: firebrick;
          font-weight: bold;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
        `
      : css`
          position: absolute;
          left: -9999px;
        `}
`;


export const HrText = styled.div`
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;

  &:before {
    content: "";
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }

  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;
    padding: 0 0.5em;
    line-height: 1.5em;
    color: #818078;
    background-color: #fcfcfa;
  }
`;

export const Auth2OContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Navigate = styled.p`
  font-size: 18px;
`
export const NavigateLink = styled(Link)`
  color: var(--linkedinBlue1);
  font-family: system-ui;
  cursor: pointer;
  font-size: 18px;
`

export default SignIn;
