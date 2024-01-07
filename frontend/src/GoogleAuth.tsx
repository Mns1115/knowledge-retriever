import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { GoogleLogin } from '@react-oauth/google';
import Button from '@mui/joy/Button';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate, useNavigate
} from 'react-router-dom';

import Main from './Main'

interface AuthResponse {
    token: string;
    user: User;
}

interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
}



const GoogleAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const openGoogleLoginPage = () => {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        
        const scope = [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" ");
    
        const params = new URLSearchParams({
          response_type: "code",
          client_id: "478510628923-e1l9dtk9g81f1cmagri7ln2go1litcvo.apps.googleusercontent.com",
          redirect_uri: `http://localhost:3000/`,
          prompt: "select_account",
          access_type: "offline",
          scope,
        });
    
        const url = `${googleAuthUrl}?${params}`;
    
        window.location.href = url;
      };

    const handleLogin = (googleUser: any) => {

        setUser(googleUser);
        const accessToken = googleUser.access_token;
        console.log(googleUser);
    };
    const responseMessage = (response: any) => {
        console.log(response);
    };
    const errorMessage = (error: any) => {
        console.log(error);
    };
    const onSuccess = async (res: any) => {
        try {
            const result: AxiosResponse<AuthResponse> = await axios.post("/auth/", {
                token: res?.tokenId,
            });

            setUser(result.data.user);
        } catch (err) {
            console.log(err);
        }

        console.log('106159009882023715924');
    };

    return (


        <Button
            variant="soft"
            color="neutral"
            fullWidth
        >
            {!user && (
                <GoogleLogin
                    onSuccess={openGoogleLoginPage}
                    // {credentialResponse => {
                    //     console.log(credentialResponse);
                    // }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            )}

            {user && (
                <>
                    <Navigate to="/" />
                </>
            )}
        </Button>
    );
};

export default GoogleAuth;