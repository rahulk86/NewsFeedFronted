import React, { useRef,useState ,useEffect} from 'react';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import { useNavigate,useLocation } from "react-router-dom";
import {Container,
        Content,
        Nav,
        NavBoady,
        NavImage,
        Auth2OContainer,
        AuthInputs,
        AuthInputsLabel,
        CommonInput,
        Errmsg,
        Form,
        FormButton,
        FormInner,
        HrText,
        Navigate,
        NavigateLink
       }                                  from "../signin";
import styled ,{ css }  from "styled-components";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const USER_EMAILORPHONE_REGEX = /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\+?\d{1,4}[-.\s]?\d{1,15}))$/;
const PASSWORD_REGEX = /^.{6,}$/;

function Signup(props) {
  const userRef                                     = useRef();
  const errRef                                      = useRef();
  const [emailOrPhone, setEmailOrPhone]             = useState('');
  const [validEmailOrPhone, setValidEmailOrPhone]   = useState(false);
  const [emailOrPhoneFocus, setEmailOrPhoneFocus]   = useState(false); 

  const [password, setPassword]                     = useState('');
  const [validPassword, setValidPassword]           = useState(false);
  const [passwordFocus, setPasswordFocus]           = useState(false); 

  const [matchPassword, setMatcPassword]            = useState('');
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [mtchPasswordFocus, setMatchPasswordFocus]  = useState(false); 

  const [errMsg, setErrMsg]                         = useState('');
  const [success, setSuccess]                       = useState(false);

  const navigate                                    = useNavigate();
  const location                                    = useLocation();
    
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidEmailOrPhone(USER_EMAILORPHONE_REGEX.test(emailOrPhone));
  }, [emailOrPhone])

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatchPassword(password === matchPassword);
  }, [password, matchPassword])

  useEffect(() => {
  setErrMsg('');
  }, [emailOrPhone, password, matchPassword])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const v1 = USER_EMAILORPHONE_REGEX.test(emailOrPhone);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const respnse =  await userAuth.signUpWithEmailAndPassword(emailOrPhone,password);
      if(respnse.data){
        setSuccess(true);
        setEmailOrPhone('');
        setPassword('');
        setMatcPassword('');
        navigate('/register', { 
                                state: { from: location,
                                         emailOrPhone:emailOrPhone,
                                         password : password
                                        },
                                replace: true 
                              }
                );
      }
  } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg(err.response.data?.message);
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
  }
  };

  return (
  <Container>
    <Nav>
      <NavBoady>
        <NavImage src="/images/login-logo.svg" alt=""/>
      </NavBoady>
    </Nav>

    <BigMedidaSubtitle>Make the most of your professional life</BigMedidaSubtitle>
    <SmallMedidaSubtitle>Join Linkdin Now - it's free!</SmallMedidaSubtitle>
    <Content>
    <Errmsg ref={errRef} enable={errMsg} aria-live="assertive">{errMsg}</Errmsg>          
      <Form onSubmit={handleSubmit} >
          <FormInner>
            <AuthInputs>
              <LabelForValidation>
                <ValidInput icon={faCheck} enabled={validEmailOrPhone} />
                <InValidInput icon={faTimes} enabled={!validEmailOrPhone && emailOrPhone} />
              </LabelForValidation>

              <CommonInput
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  type="email"
                  ref={userRef}
                  aria-invalid={validEmailOrPhone ? "false" : "true"}
                  aria-describedby="uidnote"
                  placeholder="Email or phone number"
                  id="email" 
                  value={emailOrPhone || ""}
                  onFocus={() => setEmailOrPhoneFocus(true)}
                  onBlur={() => setEmailOrPhoneFocus(false)}
              />

              <AuthInputsLabel enabled={ emailOrPhone&& emailOrPhone.length>0}>
                  Email or phone number
              </AuthInputsLabel>

              <Instructions id="uidnote"  isInstructions={emailOrPhoneFocus && emailOrPhone && !validEmailOrPhone }>  
                    <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.<br />
                      Must begin with a letter.<br />
                      Letters, numbers, underscores, hyphens allowed.
              </Instructions>

            </AuthInputs>

            <AuthInputs>
              <LabelForValidation>
                <ValidInput icon={faCheck} enabled={validPassword} />
                <InValidInput icon={faTimes} enabled={!validPassword && password } />
              </LabelForValidation>

              <CommonInput
                    id="password"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)} 
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    type="password"
                    placeholder="Password (6+ characters)"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
              />

              <AuthInputsLabel enabled={ password&& password.length>0}>
                Password (6+ characters)
              </AuthInputsLabel>

              <Instructions isInstructions={passwordFocus && !validPassword }>
                 <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: 
                    <span aria-label="exclamation mark">!</span> 
                    <span aria-label="at symbol">@</span> 
                    <span aria-label="hashtag">#</span> 
                    <span aria-label="dollar sign">$</span> 
                    <span aria-label="percent">%</span>
              </Instructions>

            </AuthInputs>

            <AuthInputs>
              <LabelForValidation>
                  <ValidInput icon={faCheck} enabled={validMatchPassword&&matchPassword} />
                  <InValidInput icon={faTimes} enabled={!validMatchPassword && matchPassword }/>
              </LabelForValidation>

              <CommonInput
                    id="ConfirmPassword"
                    value={matchPassword || ""}
                    onChange={(e) => setMatcPassword(e.target.value)} 
                    aria-invalid={validMatchPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    type="password"
                    placeholder="Conform Password"
                    onFocus={() => setMatchPasswordFocus(true)}
                    onBlur={() => setMatchPasswordFocus(false)}
              />

              <AuthInputsLabel enable={ matchPassword&& matchPassword.length>0 }>
                Conform Password
              </AuthInputsLabel>

              <Instructions id="uidnote" isInstructions={matchPassword&& !validMatchPassword}>    
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </Instructions> 

            </AuthInputs>

            <FormButton 
                disabled={!validEmailOrPhone || !validPassword || !validMatchPassword }
              >
                Agrre & join
            </FormButton>

          </FormInner>
      </Form>
      
      <HrText data-content="or" />

      <Auth2OContainer>
        <Navigate>
          Already on LinkedIn?{" "}
          <NavigateLink to="/signIn">Sign in</NavigateLink>
        </Navigate>
      </Auth2OContainer>

    </Content>
  </Container>
  );
}


export const BigMedidaSubtitle = styled.h1`
  text-align: center !important;
  padding-left: 16px !important;
  padding: 19px;
  padding-right: 16px !important;
  padding-top: 2px !important;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const SmallMedidaSubtitle = styled.h2`
  display: none;
  @media (max-width: 900px) {
    text-align: center!important;
    display: flex;
    justify-content: center;
    padding: 12px 12px 0;
    font-size: 21px;
  }
`;

export const Instructions = styled.p`
  ${(props) =>
    props.isInstructions
      ? css`
        font-size: 0.75rem;
        border-radius: 0.5rem;
        background: #000;
        color: #fff;
        position: absolute;
        bottom: 65%;
        left: 101%;
        width: 60%;
        padding: 8px;
        box-sizing: border-box;

        @media (max-width: 900px) {
          margin-left: -195px;
          margin-bottom: 23px;
          transform: translateX(-60%);
        }
        `
      : css`
          position: absolute;
          left: -9999px;
        `}
`;

const LabelForValidation =  styled.div`
  position: absolute;
  top: 50%;
  right: 8px; /* Adjust the right offset as needed */
  transform: translateY(-50%);
`;
const ValidInput = styled(FontAwesomeIcon)`
    ${(props) =>
      props.enabled
        ? css`
          color: limegreen;
          margin-left: 0.25rem;
          `
        : css`
            display: none;
          `}
`;

const InValidInput = styled(FontAwesomeIcon)`
    ${(props) =>
      props.enabled
        ? css`
            color: red;
            margin-left: 0.25rem;
          `
        : css`
            display: none;
          `
      }
`;

export default Signup;
