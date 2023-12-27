import urls from './NewFeedUrl';

export const getRepliesByCommentId =async (axiosPrivate,commentId)=>{
    try {
      let reply = {};
      reply.commentId = commentId;
      return await axiosPrivate.post(urls.allCommentReplies,reply);
    } catch (error) {
        return error;
    }
}

export const getRepliesByReplyId =async (axiosPrivate,replyId)=>{
  try {
    let reply = {};
    reply.replyId = replyId;
    return await axiosPrivate.post(urls.allReplyReplies,reply);
  } catch (error) {
      return error;
  }
}

export const createNewReplyForComment=async (axiosPrivate,reply)=>{
  try {
    return await axiosPrivate.post(urls.createReplyForComment, reply);
  } catch (error) {
      return error;
  }
}
export const createNewReplyForReply=async (axiosPrivate,reply)=>{
  try {
    return await axiosPrivate.post(urls.createReplyForReply, reply);
  } catch (error) {
      return error;
  }
}

export const vote =async (axiosPrivate,votable)=>{
    try {
      return await axiosPrivate.post(urls.vote,votable);
    } catch (error) {
      return error;
    }
}
