import React from "react";
import {Link } from "react-router-dom";
import newFeedUrl from '../../AUth/NewFeedAPI/NewFeedUrl';
import "./index.css";
import NewFeedLogo from "../../NewFeedLogo";

const Home = (props) => {
  return (
    <div class="container">
    <nav class="nav">
      <a href="/">
        <NewFeedLogo/>
      </a>
      <div>
        <Link  className="join" to="/signup">Join now</Link>
        <Link  className="sign-in" to="/SignIn">Sign in</Link>
      </div>
    </nav>
    <section class="section">
      <div class="hero">
        <h1>Welcome to your professional community</h1>
        <img src="/home/images/login-hero.svg" alt="Login Hero" />
      </div>
      <div class="form">
        <a class="google" href={newFeedUrl.googleAuthUrl} >
          <img src="/home/images/google.svg" alt="Google Logo" />
          Sign in with Google
        </a>
      </div>
    </section>
  </div>
  );
};
export default Home;
