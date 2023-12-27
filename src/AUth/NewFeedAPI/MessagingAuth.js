import urls from './NewFeedUrl';

export const getMessenger =async (axiosPrivate,profileData)=>{
    try {
      const response = await axiosPrivate.post(urls.getMessenger,profileData);
      return response;
    } catch (error) {
      throw error;
    }
}

export const getAllMessenger =async (axiosPrivate,controller)=>{
  try {
    const response = await axiosPrivate.get(urls.getMessengers,controller);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getAllMessages =async (axiosPrivate,messenger)=>{
  try {
    const response = await axiosPrivate.post(urls.getUserMessages,messenger);
    return response;
  } catch (error) {
    throw error;
  }
}

