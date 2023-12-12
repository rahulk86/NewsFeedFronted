import React, { useRef,useState ,useEffect} from 'react';
import  * as userAuth from "../../AUth/NewFeedAPI/UserAuth";
import {useLocation} from "react-router-dom";
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
           <FormButton  className="login-btn">Continue</FormButton>
        </FormInner>
      </Form>
    </Content>
  </Container>
  );
}

export default SignupWithSecurityCheck;
