import axios from '../AUth/NewFeedAPI/axios';
import useAuth from './useAuth';
import urls from '../AUth/NewFeedAPI/newFeedUrl';

const useRefreshToken = () => {
    const { setAuth }              = useAuth();
    const refresh = async () => {
        try{
        const response = await axios.post(urls.refresh);
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
      }
      catch(err){
        throw err;
      }
    }
    return refresh;
};

export default useRefreshToken;
