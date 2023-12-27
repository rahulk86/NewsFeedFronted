
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/home/index";
import SignUp from "../components/signup/index";
import SignupWithSecurityCheck from "../components/signupWithSecurityCheck/index";
import SignIn from "../components/signin/index";
import FeedHome from "../components/FeedHome/index";
import PersistLogin from "../components/persistLogin/index";
import RequireAuth from "../AUth/RequireAuth";
import Unauthorized from "../AUth/Unauthorized";
import Layout from "../components/layout/index";
import MessagingHome from "../components/messagingHome";


const ROLES = {
  'User': 'ROLE_USER',
  'Editor': 'ROLE_MODERATOR',
  'Admin': 'ROLE_ADMIN'
}

const RouterComponent = () => (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={ <SignUp />} />
        <Route path="/register" element={ <SignupWithSecurityCheck />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/oauth2/redirect" element={<SignIn />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/feed" element={<FeedHome/>} />
            <Route path="/messaging" element={<MessagingHome/>} />
          </Route>
        </Route>

      </Route>
    </Routes>
);

export default RouterComponent;
