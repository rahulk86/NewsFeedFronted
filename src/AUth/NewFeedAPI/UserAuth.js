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

  export const verifyEmail =async (token)=>{
    try {
      return  await axios.get(urls.verifyEmail+'?token='+token);
    } catch (error) {
      throw error;
    }
  }

  export const verifyEmailByCode =async (code)=>{
    try {
      return  await axios.get(urls.verifyEmailByCode+'?code='+code);
    } catch (error) {
      throw error;
    }
  }

  export const forgetPassword =async (data)=>{
    try {
      return  await axios.post(urls.forgetPassword,data);
    } catch (error) {
      throw error;
    }
  }
  
  export const passwordResetEmail =async (email)=>{
    try {
      return  await axios.post(urls.passwordResetEmail+'?email='+email);
    } catch (error) {
      throw error;
    }
  }