import React, { useRef,useState ,useEffect} from 'react';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import {Link, useNavigate,useLocation } from "react-router-dom";
import "../signin/index.css";
import styled from "styled-components";
import "./index.css";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const USER_EMAILORPHONE_REGEX = /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\+?\d{1,4}[-.\s]?\d{1,15}))$/;
const PASSWORD_REGEX = /^.{6,}$/;

function Signup() {
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
    <nav 
        className="nav" >
        <a href="/">
          <img src="/images/login-logo.svg" alt=""/>
        </a>
    </nav>
    <h1 className='main__subtitle'>Make the most of your professional life</h1>
    <div className='card-layout'>
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>          
      <form className="login__form" onSubmit={handleSubmit} >
          <div className='login-wrapper-inner'>
            <div className="auth-inputs">
              <babel htmlFor="username" className='labelForValidation'>
                  <FontAwesomeIcon icon={faCheck} className={validEmailOrPhone ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validEmailOrPhone || !emailOrPhone ? "hide" : "invalid"} />
              </babel>

              <input
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      type="email"
                      ref={userRef}
                      aria-invalid={validEmailOrPhone ? "false" : "true"}
                      aria-describedby="uidnote"
                      className="common-input"
                      placeholder="Email or phone number"
                      id="email" 
                      value={emailOrPhone || ""}
                      onFocus={() => setEmailOrPhoneFocus(true)}
                      onBlur={() => setEmailOrPhoneFocus(false)}
              />
              <babel htmlFor="username" className={ emailOrPhone&& emailOrPhone.length>0 ? "labelForInput" : "hide"}>
                  Email or phone number
              </babel>
               <p id="uidnote" className={emailOrPhoneFocus && emailOrPhone && !validEmailOrPhone ? "instructions" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div className="auth-inputs">
              <babel htmlFor="username" className='labelForValidation'>
                  <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
              </babel>
              <input
                    id="password"
                    value={password || ""}
                    onChange={(e) => setPassword(e.target.value)} 
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    type="password"
                    className="common-input"
                    placeholder="Password (6+ characters)"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
              />
              <babel htmlFor="username" className={ password&& password.length>0 ? "labelForInput" : "hide"}>
                Password (6+ characters)
              </babel>
               <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
            </div>

            <div className="auth-inputs">
              <babel htmlFor="username" className='labelForValidation'>
                  <FontAwesomeIcon icon={faCheck} className={validMatchPassword&&matchPassword ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validMatchPassword || !matchPassword ? "hide" : "invalid"} />
              </babel>
              <input
                    id="ConfirmPassword"
                    value={matchPassword || ""}
                    onChange={(e) => setMatcPassword(e.target.value)} 
                    aria-invalid={validMatchPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    type="password"
                    className="common-input"
                    placeholder="Conform Password"
                    onFocus={() => setMatchPasswordFocus(true)}
                    onBlur={() => setMatchPasswordFocus(false)}
              />
              <babel htmlFor="username" className={ matchPassword&& matchPassword.length>0 ? "labelForInput" : "hide"}>
                Conform Password
              </babel>
              <p id="confirmnote" className={ matchPassword&& !validMatchPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
              </p>
            </div>

            <div className="login__form_action_container">
                <button disabled={!validEmailOrPhone || !validPassword || !validMatchPassword ? true : false} className="login-btn">Agrre & join </button>
            </div>

          </div>
      </form>
      
      <hr className="hr-text" data-content="or" />
        <div className="google-btn-container">
          <p className="go-to-signup">
            Already on LinkedIn?{" "}
          <Link  className="join-now" to="/signIn">Sign in</Link>
          </p>
        </div>
    </div>
  </Container>
  );
}

const Container = styled.div`
  max-width: 100%;
  height: 100%;
  background: #f5f5f5;
`;

export default Signup;
