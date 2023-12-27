import urls from './NewFeedUrl';

export const getProfile =async (axiosPrivate,controller)=>{
    try {
      const response = await axiosPrivate.get(urls.getProfile,{
                                                  signal: controller.signal
                                              });
      return response;
    } catch (error) {
      throw error;
    }
}

export const getAllProfile =async (axiosPrivate,controller)=>{
  try {
    const response = await axiosPrivate.get(urls.getAllProfile,{
                                                signal: controller.signal
                                            });
    return response;
  } catch (error) {
    throw error;
  }
}

export const uploadImage =async (axiosPrivate,image)=>{
    try {
      const formData = new FormData();
      formData.append('file', image);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      return await axiosPrivate.post(urls.uploadImage, formData,config);
    } catch (error) {
      throw error;
    }
  }

  