
import React from "react";
import { FaCommentAlt } from "react-icons/fa";
import styled from "styled-components";


const FixedMessageIcon  = ({ onClick }) => {
  return (
    <IconContainer onClick={onClick}>
      <FaCommentAlt size={30} />
    </IconContainer>
  );
};

const IconContainer = styled.div`
    display: none;
    @media (max-width: 768px) {
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      background-clip: content-box;
      background-color: white;
      background-position: center;
      background-size: 60%;
      background-repeat: no-repeat;
      border: 0px solid white;
      border-radius: 20%;
      overflow: hidden;
      box-shadow: 0 0 0 1px rgb(0 0 0 / 15%),0 0 0 rgb(0 0 0 / 20%);
      display: flex;
      position: fixed;
      bottom: 100px;
      left: 300px;
      cursor: pointer;

       
      >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      >svg {
        margin-top: 15px;
        width: 100%;
        height: 43%;
        object-fit: cover;
      }

    }
`;

export default FixedMessageIcon ;
