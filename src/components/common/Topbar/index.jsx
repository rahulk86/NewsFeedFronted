import React ,{ useEffect,useState } from "react";
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getPosts } from "../../../AUth/AuthAPI";
import useLogout from "../../../hooks/useLogout";
import PostCreator from ".././postCreator/index";
import LinkedinLogo from "./linkedin.png";
import { useNavigate, Link,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import "../../signin/index.css";



export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [postData, setPostData]        = useState();
  const axiosPrivate                   = useAxiosPrivate();
  const { auth }                       = useAuth();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/home');
  }  

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      try{
        const response = await getPosts(axiosPrivate,controller);
        if(response.data){
          isMounted && setPostData(response.data);
        }
        else{
          navigate('/signIn', { state: { from: location }, replace: true });
        }
      }
      catch(err){
        navigate('/signIn', { state: { from: location }, replace: true });
      }
    };

    fetchData();
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

   return (
   <div className="topbar-main">
    <header className="global-nav">
      <div className="global-nav__content ">
         <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      
      <div className="search">
        <input
         className="search-input"
          type="text"
        />
         <babel htmlFor="search" className='search-icon'>
            <FontAwesomeIcon icon={fortawesome.faSearch} className="faSearch" />
        </babel>
      </div>

      <nav className="nav__content">
        <div>
          <babel htmlFor="home">
              <FontAwesomeIcon icon={fortawesome.faHome} /> 
          </babel>
          <span>Home</span>
        </div>

        <div>
          <babel htmlFor="people">
              <FontAwesomeIcon icon={fortawesome.faPeopleGroup} /> 
          </babel>
          <span>My Network</span>
        </div>

        <div>
          <babel htmlFor="jobs">
              <FontAwesomeIcon icon={fortawesome.faBriefcase} /> 
          </babel>
          <span>Jobs</span>
        </div>

        <div>
          <babel htmlFor="messaging">
              <FontAwesomeIcon icon={fortawesome.faMessage} /> 
          </babel>
          <span>Messaging</span>
        </div>

        <div>
          <babel htmlFor="messaging">
              <FontAwesomeIcon icon={fortawesome.faBell} /> 
          </babel>
          <span>Notification</span>
        </div>

        <div>
          <babel htmlFor="user">
              <FontAwesomeIcon icon={fortawesome.faUser} /> 
          </babel>
          <div className="nav__content_people">
            <span>Me</span>
            <FontAwesomeIcon icon={fortawesome.faCaretDown} /> 
          </div>
        </div>

      </nav>
      </div>
     </header>
     <div className="authentication-outlet">
        <div id="voyager-feed" class="feed-container-theme feed-outlet">
          <PostCreator/>
        </div>
     </div>
   </div>
   );
 
}
