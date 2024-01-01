import React from 'react';
import styled from 'styled-components';

const UnreadMessage = ({unreadCount})=>{
    return (
      <UnreadMessageCount>
        {unreadCount > 0 && (
          <CountBadge>{unreadCount}</CountBadge>
        )}
      </UnreadMessageCount>
    );
}

const CountBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #88d988;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 50%;
`;

const UnreadMessageCount = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
`;

export default UnreadMessage;
