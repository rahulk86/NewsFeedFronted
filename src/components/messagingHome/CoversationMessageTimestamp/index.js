import React from "react";
import styled, { css } from "styled-components";
import *  as fortawesome  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CoversationMessageTimestamp = ({createdAt,isSelf,isUnread }) => {
  const options = { hour: 'numeric', minute: '2-digit', hour12: true };
  const now = new Date();
  const messageDate = new Date(createdAt);
  const timeDifference = now - messageDate;
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;
  const oneWeek = 7 * oneDay;

  let formattedDate = "";

  if (timeDifference <= oneDay) {
    formattedDate = new Intl.DateTimeFormat('en-US', options).format(messageDate);
  } else if (timeDifference <= oneWeek) {
    const days = Math.floor(timeDifference / oneDay);
    formattedDate = days === 1 ? 'Yesterday' : new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(messageDate);
  } else {   
    formattedDate = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(messageDate);
  }

  return (
    <StyledMessageTimestamp >
      {formattedDate}
      {isSelf && <Unread isUnread={isUnread} ><FontAwesomeIcon icon={fortawesome.faCheckDouble} /></Unread> }        
    </StyledMessageTimestamp>
  );
};

const StyledMessageTimestamp = styled.div`
  display: flex;
  font-size: 0.6em;
  color: #888;
  align-self: flex-end;
`;

const Unread = styled.div`
 >svg{
    font-size: 12px;
    padding-left: 5px;
    ${(props) =>
      props.isUnread
        ? css`
           color:  #53bdeb;
          `
        : css`
          
          `
    }
  }
`;
export default CoversationMessageTimestamp;
