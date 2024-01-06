import React from 'react';
import styled,{css} from "styled-components";
function NewFeedLogo(props) {
    return (
        <NavImage src="/images/newfeed.jpeg" alt=""/>
    );
}
const NavImage = styled.img`
  width: 200px;
`;
export default NewFeedLogo;