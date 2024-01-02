import React from "react";
import styled, { css } from "styled-components";

const MessageTimestamp = ({ unreadCount, createdAt }) => {
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
    <StyledMessageTimestamp unreadCount={unreadCount}>
      {formattedDate}
    </StyledMessageTimestamp>
  );
};

const StyledMessageTimestamp = styled.div`
  font-size: 0.8em;
  padding: 3px;
  color: ${(props) => (props.unreadCount ? '#88d988' : '#888')};
  align-self: flex-end;
  display: flex;
`;

export default MessageTimestamp;
