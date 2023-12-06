import React, { useRef,useState ,useEffect} from 'react';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import {Link,useLocation} from "react-router-dom";
import "../signin/index.css";
import styled from "styled-components";
import "./index.css";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignupWithSecurityCheck() {
  const userRef                      = useRef();
  const errRef                       = useRef();
  const [firstName, setFirstName]    = useState('');
  const [lastName, setLastName]      = useState('');
  const [errMsg, setErrMsg]          = useState('');
  const [success, setSuccess]        = useState(false);
  const location                     = useLocation();
    
  useEffect(() => {
    userRef.current.focus();
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const respnse =  await userAuth.createNewUser(
                                  location?.state?.emailOrPhone,
                                  location?.state?.password,
                                  firstName+' ' +lastName
                              );
      if(respnse.data){
        setSuccess(true);
        setFirstName('');
        setFirstName('');
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
              <input
                      onChange={(e) => setFirstName(e.target.value)}
                      type="name"
                      ref={userRef}
                      aria-describedby="uidnote"
                      className="common-input"
                      placeholder="First name"
                      id="firstName" 
                      value={firstName || ""}
              />
              <babel htmlFor="firstName" className={ firstName&& firstName.length>0 ? "labelForInput" : "hide"}>
                  First name
              </babel>
            </div>

            <div className="auth-inputs">
              <input
                    id="lastName"
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)} 
                    aria-describedby="pwdnote"
                    type="name"
                    className="common-input"
                    placeholder="Last name"
              />
              <babel htmlFor="lastName" className={ lastName&& lastName.length>0 ? "labelForInput" : "hide"}>
                Last name
              </babel>
            </div>

            <div className="login__form_action_container">
                <button  className="login-btn">Continue</button>
            </div>

          </div>
      </form>
    </div>
  </Container>
  );
}

const Container = styled.div`
  max-width: 100%;
  height: 100%;
  background: #f5f5f5;
`;

export default SignupWithSecurityCheck;
