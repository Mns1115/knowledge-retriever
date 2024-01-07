import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyMessages from './components/MyMessages';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import  { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
const BACKEND_API_URL = "http://127.0.0.1:8000"

export default function JoyMessagesTemplate() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    // const values = qs.parse(location.search);
    
    const code = searchParams.get('code') ? searchParams.get('code') : null;
    console.log("Search Params"+searchParams.get('code'))
    if (code) {
      onGogglelogin();
    }
  }, []);

  let location = useLocation();
  const navigate = useNavigate();
  const googleLoginHandler = (code: any) => {
    return axios
      .get(`${BACKEND_API_URL}/api/auth/google/${code}`)
      .then((res) => {
        console.log("res", res)
        localStorage.setItem("goggleFirstName", res.data.user.first_name);
        localStorage.setItem("goggleEmail", res.data.user.email);
        navigate('/')
        return res.data;
      })
      .catch((err) => {
        console.log("error", err)
        return err;
      });
  };

  const onGogglelogin = async () => {
    const response = await googleLoginHandler(location.search);
    console.log(response);
  }

  
  return (

    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />
        <Header />
        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          <MyMessages />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}