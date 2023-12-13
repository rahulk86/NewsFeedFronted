const baseURL               = "http://3.27.142.109:8086";
const Oauth2RedirectUri     = "http://newfeedrecatclone.s3-website-us-east-1.amazonaws.com/oauth2/redirect";
// const baseURL               = "http://192.168.29.228:8086";
// const Oauth2RedirectUri     = "http://localhost:3000/oauth2/redirect";
const login                 = "/api/users/login";
const oauth2                = "/api/users/oauth2";
const signout               = "/api/users/signout";
const refresh               = "/api/users/refresh";
const signUp                = "/api/users/signup";
const getProfile            = "/api/users/profile/get";
const uploadImage           = "/api/users/profile/upload";
const register              = "/api/users/register";
const createPost            = "/api/users/post/create";
const createComment         = "/api/users/post/comment/create";
const createReplyForComment = "/api/users/post/comment/reply/create";
const allCommentReplies     = "/api/users/post/comment/reply/get";
const allComments           = "/api/users/post/comment/get";
const allPost               = "/api/users/post/get";
const vote                  = "/api/users/post/vote";
const createReplyForReply   = "/api/users/post/comment/reply/reply/create";
const allReplyReplies       = "/api/users/post/comment/reply/reply/get";
const googleAuthUrl       = `${baseURL}/oauth2/authorize/google?redirect_uri=${Oauth2RedirectUri}`;
const FaceBookAuthUrl     = `${baseURL}/oauth2/authorize/facebook?redirect_uri=${Oauth2RedirectUri}`;
const GithubAuthUrl       = `${baseURL}/oauth2/authorize/github?redirect_uri=${Oauth2RedirectUri}`;

export default {
    baseURL,
    getProfile,
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
    GithubAuthUrl
  };