import React ,{ useEffect,useRef,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";
import * as PostAuth from "../../../../AUth/NewFeedAPI/PostAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ProfileImage from "../../../../components/ProfileImage";
import PostImageUpload from "../PostImageUpload/index";
import { useNavigate,useLocation } from "react-router-dom";
import styled from "styled-components";


const NewPost = ({ funVal,setPostData ,profileData}) => {
  const textareaRef                       = useRef(null);
  const [text, setText]                   = useState();
  const [post, setPost]                   = useState();
  const [imageUpload, setImageUpload]     = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const axiosPrivate                      = useAxiosPrivate();
  const navigate                          = useNavigate();
  const location                          = useLocation();

  useEffect(() => {
    const updatePost = async () => {
      if(!post) return ;
      try {
        const response = await PostAuth.createNewPost(axiosPrivate, post);
        if (response.data) {
          setPostData(null);
          console.log('post created sucessfully');
          funVal(false);
          navigate('/feed', { state: { from: location }, replace: true });
        }
        else{
          console.error('Error updating post:');
          navigate('/signIn', { state: { from: location }, replace: true });
        }
      } catch (error) {
        console.error('Error updating post:', error);
        navigate('/signIn', { state: { from: location }, replace: true });
      }
    };

    updatePost();
  }, [post]);


  useEffect(() => {
    const adjustTextareaHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };
    adjustTextareaHeight();
  }, [text]);

  const handlePostEvent = () => {
    setPost({ ...post, text: text,image: uploadedImage});
  };

  const handleCloseEvent = () => {
    funVal(false);
  };

    return (
      imageUpload
      ?<PostImageUpload 
             setImageUpload={setImageUpload} 
             setUploadedImage={setUploadedImage} 
             uploadedImage = {uploadedImage} />
      :<Container>
        <Content>
        <button 
          onClick={handleCloseEvent}
          className="close">
           <FontAwesomeIcon icon={fortawesome.faClose}/> 
        </button>
        <Profile>
          <UserProfile>
            <ProfileImage profileData={profileData} />
          </UserProfile>
           <ProfileInfo>
              <ProfileName >
                <span>{profileData.user.name}</span>
                <FontAwesomeIcon icon={fortawesome.faCaretDown} /> 
              </ProfileName>
              <span >Post to Connections only</span>
           </ProfileInfo>
        </Profile>
          <Header>
            <textarea  
            ref={textareaRef}
            value={text}
            onChange={(event)=>{setText(event.target.value)}}
            placeholder="What do you want to talk about?"
            autoFocus={true}
            />
            { uploadedImage &&<img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />}
          </Header>
          {
          !uploadedImage && 
          <FooterIcon>
            <button onClick={()=>{setImageUpload(true); setUploadedImage(null);}}>
                <FontAwesomeIcon icon={fortawesome.faImage} />
            </button>
            <button>
                <FontAwesomeIcon icon={fortawesome.faCertificate} />
            </button>
            <button>
                <FontAwesomeIcon icon={fortawesome.faBriefcase}/>
            </button>
          </FooterIcon>
          }

          <PostBtn>
            <button
            disabled={!text}
            onClick={handlePostEvent}
            >
              Post
            </button>
          </PostBtn>
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
  max-width: 740px;
  background-color: white;
  overflow: auto;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 2px 0px 24px;
`;

const ProfileInfo = styled.div`
    width: 100%;
    flex-direction: column;
    span{
      font-size: 12px;
    }
`;

const ProfileName = styled.div`
  svg{
   padding-left: 11px;
   font-size: 21px;
   color: rgb(105, 103, 103);
  }
  span{
      font-size: 18px;
    }
  
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0,0.6);
  font-weight: 400;
  display: flex;
  justify-content: center;
  flex-direction: column;

  textarea {
    font-size: 20px;
    border: none;      
    outline: none;      
    padding: 0;        
    margin: 0;          
    resize: none;      
    width: 100%;       
    height: 150px; 
  }

  img {
    border-radius: 1%;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  }

`
const FooterIcon = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
    button{
      padding: 19px;
      font-size: 20px;
      background-color: white;
    }
`;
 const PostBtn = styled.div`
  border-top: 0.1px solid #e2e9df;
  display: flex;
  justify-content: flex-end;
    button{
      width: 62px;
      height: 33px;
      margin: 12px;
      cursor: pointer;
      background-color: var(--linkedinBlue2);
      border-radius: 18px;
      outline: none;
      border: none;
      font-family: system-ui;
      font-weight: 600;
      color: #ffffff;
      font-size: 16px;
    }
    button:disabled {
      background-color: #ccc; 
      color: #666; 
      cursor: not-allowed; 
    }
 `;
 const UserProfile = styled.div`
  box-shadow: none;
  width: 52px;
  height: 50px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  >svg {
    width: 100%;
    height: 80%;
    object-fit: cover;
  }
`;
export default NewPost;