import React, { useRef,useState,useEffect } from 'react';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import useAuth from '../../hooks/useAuth';
import {Link, useNavigate,useLocation } from "react-router-dom";
import {toast } from 'react-toastify';
import "./index.css";
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
  <div>
    <nav 
      className="nav">
      <a href="/">
        <img src="/images/login-logo.svg" alt=""/>
      </a>
    </nav>

    <div className='card-layout'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form className="login__form" onSubmit={handleSubmit} >
        <div className='login-wrapper-inner'>
          <div className="header__content ">
            <h1 className="header__content__heading ">Sign in</h1>
            <p className="header__content__subheading ">Stay updated on your professional world</p>
          </div>

          <div className="auth-inputs">
            <input
              ref={userRef}
              type="email"
              className="common-input"
              placeholder={`Email or Phone`}
              id="email" 
              autoComplete="off"
              onChange={(e) => setEmailOrPhone(e.target.value)}
              value={emailOrPhone}
              required
            />
            <babel htmlFor="username" className={ emailOrPhone && emailOrPhone.length>0 ? "labelForInput" : "hide"}>
                  Email or Phone
            </babel>
          </div>

          <div className="auth-inputs">
            <input
                id="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)} 
                type="password"
                className="common-input"
                placeholder="Password (6+ characters)"
                required
            />
            <babel htmlFor="username" className={ password && password.length>0 ? "labelForInput" : "hide"}>
                      Password (6+ characters)
            </babel>
          </div>
          
          <a 
              href="/checkpoint/rp/request-password-reset" 
              className="btn__tertiary--medium forgot-password" 
              data-cie-control-urn="forgot-password-btn">
                Forgot password?
          </a>

          <div className="login__form_action_container">
              <button disabled={!emailOrPhone || !password ? true : false} className="login-btn">Sign in </button>
          </div>
        </div>
      </form>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
          <p className="go-to-signup">
            New to LinkedIn?{" "}
            <Link  className="join-now" to="/signup">Join now</Link>
         </p>
      </div>
    </div>
  </div>
  );
}

export default SignIn;
