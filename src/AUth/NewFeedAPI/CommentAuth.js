import urls from './newFeedUrl';

export const getComments =async (axiosPrivate,postId)=>{
    try {
      let comment = {};
      comment.postId = postId;
      return await axiosPrivate.post(urls.allComments,comment);
    } catch (error) {
        return error;
    }
}

export const createNewComment =async (axiosPrivate,comment)=>{
  try {
    return await axiosPrivate.post(urls.createComment, comment);
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
