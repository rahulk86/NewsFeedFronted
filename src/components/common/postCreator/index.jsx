import React ,{ useEffect,useState } from "react";
import "./index.css";


export default function PostCreator() {
return (
  <div className="post-status-main">
    {/* <div className="user-details">
      <img  />
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>
    </div> */}
    <div className="post-status">
      <img
        className="post-image"
        // src={currentUser?.imageLink}
        alt="imageLink"
      />
      <button
        className="open-post-modal"
        // onClick={() => {
        //   setModalOpen(true);
        //   setIsEdit(false);
        // }}
      >
        Start a Post
      </button>
    </div>
    </div>
    )}