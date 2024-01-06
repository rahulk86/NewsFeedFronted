// const baseURL               = "http://54.253.132.48:8086";
// const Oauth2RedirectUri     = "http://newfeedrecatclone.s3-website-us-east-1.amazonaws.com/oauth2/redirect";
const baseURL               = "http://localhost:8086";
// const baseURL               = "http://192.168.29.228:8086";
const webSocketURL          = `${baseURL}/wb`;
const Oauth2RedirectUri     = "http://localhost:3000/oauth2/redirect";

const login                 = "/api/users/login";
const oauth2                = "/api/users/oauth2";
const signout               = "/api/usersAuth/signout";
const refresh               = "/api/users/refresh";
const signUp                = "/api/users/signup";
const register              = "/api/users/register";


const createComment         = "/api/users/post/comment/create";
const createReplyForComment = "/api/users/post/comment/reply/create";
const allCommentReplies     = "/api/users/post/comment/reply/get";
const allComments           = "/api/users/post/comment/get";

const getProfile            = "/api/users/profile/get";
const getAllProfile         = "/api/users/profile/getAll";
const uploadImage           = "/api/users/profile/upload";
const createPost            = "/api/users/post/create";
const allPost               = "/api/users/post/get";
const vote                  = "/api/users/post/vote";

const createReplyForReply   = "/api/users/post/comment/reply/reply/create";
const allReplyReplies       = "/api/users/post/comment/reply/reply/get";

const getMessenger          = "/api/messenger/createUserMessenger";
const createGroup           = "/api/messenger/createGroup";
const conversation          = "/topic/conversation";
const sendMessage           = "/api/messenger/sendMessage";
const groupConversation     = "/topic/GroupConversation";
const groupSendMessage      = "/api/messenger/sendGroupMessage";
const receiveUpdateTime     = "/topic/receiveUpdateTime";
const updateTime            = "/api/messenger/updateTime";

const getMessengers         = "/api/messenger/get";
const unreadCount           = "/api/messenger/unreadCount";
const getUserMessages       = "/api/messenger/getUserMessage";
const getGroupMessage       = "/api/messenger/getGroupMessage";
const updateMessengerTime   = "/api/messenger/updateMessengerTime";

const googleAuthUrl       = `${baseURL}/oauth2/authorize/google?redirect_uri=${Oauth2RedirectUri}`;
const FaceBookAuthUrl     = `${baseURL}/oauth2/authorize/facebook?redirect_uri=${Oauth2RedirectUri}`;
const GithubAuthUrl       = `${baseURL}/oauth2/authorize/github?redirect_uri=${Oauth2RedirectUri}`;

export default {
    baseURL,
    webSocketURL,
    getProfile,
    getAllProfile,
    login,
    oauth2,
    signout,
    refresh,
    signUp,
    uploadImage,
    register,
    createPost,
    allPost,
    allComments,
    allCommentReplies,
    createReplyForComment,
    allReplyReplies,
    createReplyForReply,
    vote,
    createComment,
    googleAuthUrl,
    FaceBookAuthUrl,
    GithubAuthUrl,
    getMessenger,
    getMessengers,
    conversation,
    sendMessage,
    getUserMessages,
    groupConversation,
    groupSendMessage,
    createGroup,
    getGroupMessage,
    updateMessengerTime,
    receiveUpdateTime,
    updateTime,
    unreadCount
  };