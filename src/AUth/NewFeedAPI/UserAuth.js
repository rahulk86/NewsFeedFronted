import axios from './axios';
import urls from './NewFeedUrl';

export const signInWithEmailAndPassword =async (email,password)=>{
    let data       = {};
    data.email    = email;
    data.password = password;
    try {
      const response = await axios.post(urls.login, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  export const signOut =async (axiosPrivate)=>{
    try {
      await axiosPrivate.post(urls.signout);
    } catch (error) {
      throw error;
    }
  }

  export const oauth2 =async (token)=>{
    try {
      const config = { 
                    headers: {
                    'Authorization': `Bearer ${token}`
                    }
                 };
      const data = {};
      return  await axios.post(urls.oauth2,data, config);
    } catch (error) {
      throw error;
    }
  }

  export const signUpWithEmailAndPassword =async (email,password)=>{
    let data       = {};
    data.email    = email;
    data.password = password;
    try {
      const response = await axios.post(urls.signUp, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

export const createNewUser =async (email,password,username)=>{
    let data       = {};
    data.username  = username;
    data.email     = email;
    data.password  = password;
    try {
      const response = await axios.post(urls.register, data);
      return response;
    } catch (error) {
      throw error;
    }
  }