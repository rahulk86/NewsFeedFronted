import React from 'react';
import styled,{css} from "styled-components";
function NewFeedLogo(props) {
    return (
        <NavImage src="/home/images/newfeed.jpeg" alt=""/>
    );
}
const NavImage = styled.img`
  width: 150px;
  height: 45px;
  @media (max-width: 768px) {
    width: 110px;
    height: 37px;
  }
  
`;
export default NewFeedLogo;