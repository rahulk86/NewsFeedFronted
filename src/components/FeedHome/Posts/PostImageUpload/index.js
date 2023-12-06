import React, { useRef,useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImage from "./uploadImage.svg";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";
const PostImageUpload = ({setImageUpload,setUploadedImage,uploadedImage}) => {
  const fileInputRef                      = useRef(null);

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
          <span>Editor</span>
          <FontAwesomeIcon icon={fortawesome.faClose}/> 
        </Header>
        {uploadedImage
        ? <UploadedImageBody>
            <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
          </UploadedImageBody>
        : <Body>
            <img  src={UploadImage} alt="UploadImage" />
            <span className="Bold">Select files to begin</span>
            <span>Share images or a single video in your post.</span>
            <button onClick={handleUploadClick} >Upload from computer</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
        </Body>
        }
        <Footer>
          <button className= "Back-Btn" onClick={()=>{setImageUpload(false);setUploadedImage(null);}} >Back</button>
          <button disabled={!uploadedImage} onClick={()=>{setImageUpload(false)}}> Next</button>
        </Footer>

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
  max-width: 1140px;
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
    button{
      width: 62px;
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
  height: 100%;
  max-height: 470px;
  background-color: rgb(240, 244, 250);
  display: flex;
  flex-direction: column; 
  align-items: center; 

  span{
    color :rgba(0 0 0/.6);
    margin: 6px;
  }
  
  button{
    width: 212px;
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

  .Bold {
    color :black;
    font-weight: bold;
    padding-top: 20px;
    font-size: 22px;
  }

  img {
    margin-top: 100px;
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
export default PostImageUpload;
