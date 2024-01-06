import { Outlet } from "react-router-dom";
import React,{ useState, useEffect } from "react";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import styled , { keyframes } from "styled-components";
import NewFeedLogo from "../../NewFeedLogo";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        !auth?.accessToken? verifyRefreshToken() : setIsLoading(false);
        return () => false;

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading,auth])

    return (
        <>
            {isLoading?
              <Container>
                <Containt>
                   <NewFeedLogo />
                 <LoadingBar />
                </Containt>
               </Container>
             : <Outlet />
            }
        </>
    )
}
const Container = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;       
`
const Containt = styled.div`
 position: relative;
    img{
       width: 70%;
       max-width: 250px;
    }

`;

const loadingAnimation = keyframes`
    0% {
        transform: translateX(-100%);
    }
    50% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const LoadingBar = styled.div`
    width: 98px;
    height: 2px;
    margin: 0 auto;
    border-radius: 2px;
    background-color: blue;
    position: relative;
    overflow: hidden;
    z-index: 1;

    &:before {
        content: '';
        height: 100%;
        width: 68px;
        position: absolute;
        background-color: #acacb5;
        border-radius: 2px;
        animation: ${loadingAnimation} 1.5s ease-in-out infinite;
    }
`;


export default PersistLogin