import React from "react";
import {Link } from "react-router-dom";
import { GOOGLE_AUTH_URL} from '../../AUth/NewFeedAPI/constants';
import "./index.css";

const Home = (props) => {
  return (
    <div class="container">
    <nav class="nav">
      <a href="/">
        <img src="/images/login-logo.svg" alt="LinkedIn Logo" />
      </a>
      <div>
        <Link  className="join" to="/signup">Join now</Link>
        <Link  className="sign-in" to="/SignIn">Sign in</Link>
      </div>
    </nav>
    <section class="section">
      <div class="hero">
        <h1>Welcome to your professional community</h1>
        <img src="/images/login-hero.svg" alt="Login Hero" />
      </div>
      <div class="form">
        <a class="google" href={GOOGLE_AUTH_URL} >
          <img src="/images/google.svg" alt="Google Logo" />
          Sign in with Google
        </a>
      </div>
    </section>
  </div>
  );
};
export default Home;
