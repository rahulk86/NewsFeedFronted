import axios from '../AUth/NewFeedAPI/axios';
import useAuth from "./useAuth";
import urls from '../AUth/NewFeedAPI/newFeedUrl';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios(urls.signout, {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout