import React from "react";
import styled from "styled-components";
import ProfileImage from "../../ProfileImage";

const SelectedAdmin = ({ profileData, onClose }) => {
  return (
    <SelectedContainer>
      <GroupProfile>
        <GroupProfileImage>
          <ProfileImage profileData={profileData} />
        </GroupProfileImage>
        <GroupProfileInfo>
          <ProfileName>
            <span>{profileData.user.name}</span>
          </ProfileName>
        </GroupProfileInfo>
      </GroupProfile>
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </SelectedContainer>
  );
};

const SelectedContainer = styled.div`
    display: flex;
    align-items: center;
    height: fit-content;
    background-color: #f5f5f5;
    border-radius: 20px;
    margin: 4px;
    padding: 4px;
`;

const GroupProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

const GroupProfileInfo = styled.div`
  padding-left: 10px;
  flex-direction: column;
  span {
    font-size: 14px;
    font-weight: bold;
  }
`;

const GroupProfileImage = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 0 2px #ffffff;
    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ProfileName = styled.div`
  span {
    font-size: 14px;
    color: rgb(105, 103, 103);
  }
`;

const CloseButton = styled.div`
  margin-left: auto;
  font-size: 18px;
  cursor: pointer;
`;

export default SelectedAdmin;
