const baseURL               = window.location.protocol + "//" + window.location.host;
const webSocketURL          = `${baseURL}/wb`;
const Oauth2RedirectUri     = `${baseURL}/oauth2/redirect`;

const login                 = "/api/users/login";
const signout               = "/api/users/signout";
const refresh               = "/api/users/refresh";
const signUp                = "/api/users/signup";
const register              = "/api/users/register";
const verifyEmail           = "/api/users/verify/email";
const verifyEmailByCode     = "/api/users/verify/emailByCode";
const recievSuccess         = "/topic/emailVerificationSuccess";
const sendSuccess           = "/api/users/emailVerificationSuccess";
const forgetPassword        = "/api/users/forgetPassword";
const passwordResetEmail    = "/api/users/passwordResetEmail";


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
const emailConfirmation     = "/register/emailConfirmation";

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
    signout,
    refresh,
    signUp,
    recievSuccess,
    forgetPassword,
    passwordResetEmail,
    sendSuccess,
    uploadImage,
    verifyEmailByCode,
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
    verifyEmail,
    emailConfirmation,
    updateMessengerTime,
    receiveUpdateTime,
    updateTime,
    unreadCount
  };