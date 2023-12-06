import React, { useRef,useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ProfileAuth from "../../../../AUth/NewFeedAPI/ProfileAuth";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ProfileImageUpload = ({funVal}) => {
  const fileInputRef                      = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(false);
  const axiosPrivate                      = useAxiosPrivate();

  const handleSaveProfileFrame = async () => {
    if (!uploadedImage) {
      console.error('No image selected.');
      return;
    }

    try {
      const response = await ProfileAuth.uploadImage(axiosPrivate,uploadedImage);

      if (response.ok) {
        console.log('Profile frame saved successfully!');
        setUploadedImage(null);
      } else {
        console.error('Failed to save profile frame.');
      }
    } catch (error) {
      console.error('Error while saving profile frame:', error);
    }
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploadedImage(selectedFile);
    }
  };

  return (
    <Container>
      <Content>

        <Header>
          <span>Add photo</span>
          <FontAwesomeIcon icon={fortawesome.faClose} onClick={()=>{funVal(false)}}/> 
        </Header>
        <Body>

         { uploadedImage && <img  src={URL.createObjectURL(uploadedImage)} alt="UploadImage" />}
        </Body>
        {
          uploadedImage?
          <Footer>
            <button className="Back-Btn">Change photo</button>
            <button onClick={handleSaveProfileFrame}  >Save photo</button>
          </Footer>
          :
          <Footer>
            <button className="Back-Btn">Use camera</button>
            <button onClick={handleUploadClick}  >Upload photo</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
          </Footer>
         }

      </Content>
    </Container>
  );
    }

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0,0.6);
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 752px;
  background-color: white;
  overflow: auto;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Footer = styled.div`
  border-top: 0.1px solid #e2e9df;
  display: flex;
  justify-content: flex-end;
  max-height: 165px;
  height: 100%;

    button{
      width: 125px;
      height: 33px;
      margin: 12px;
      cursor: pointer;
      background-color: #0073b1;
      border-radius: 18px;
      outline: none;
      border: none;
      font-family: system-ui;
      font-weight: 600;
      color: #ffffff;
      font-size: 16px;
    }
    .Back-Btn{
      background-color: white;
      border: 1px solid #0073b1;
      color: #0073b1;
    }
    
    button:disabled {
      background-color: #ccc; 
      color: #666; 
      cursor: not-allowed; 
    }
`;
const Header = styled.div`
  border-bottom: 0.1px solid #e2e9df;
  padding: 12px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  
`;
const Body = styled.div`
    width: 150px; // Adjust the size as needed
    height: 150px;
    overflow: hidden;
    border-radius: 50%; // Make it circular
    margin: auto;
  img {
    width: 100%;
    height: 150%;
    object-fit: cover;
  }
`;
const UploadedImageBody = styled.div`
  height: 100%;
  max-height: 470px;
  background-color: rgb(240, 244, 250);
  display: flex;
  flex-direction: column; 
  img {
  padding: 12px;
  width: 200px;
  height: auto;
  }
`;
export default ProfileImageUpload;
