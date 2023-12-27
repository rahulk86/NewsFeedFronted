import axios from './axios';
import urls from './NewFeedUrl';

export const getPosts =async (axiosPrivate,controller)=>{
    try {
        return await axiosPrivate.get(urls.allPost, {
                                            signal: controller.signal
                                        });
    } catch (error) {
        return error;
    }
}

export const createNewPost =async (axiosPrivate,post)=>{
  try {
    const formData = new FormData();
    formData.append('text', post.text);
    if (post.image) {
      formData.append('file', post.image);
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return await axiosPrivate.post(urls.createPost, formData,config);
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
