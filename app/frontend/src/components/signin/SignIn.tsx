import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import axiosCaseConverter from "simple-axios-case-converter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { styled } from '@mui/material/styles';
import { Button, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Link from '@mui/material/Link';
import { GoogleIcon } from "../GoogleIcon";

const Container = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0'
})

const LoginCard = styled('div')({
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
})

axiosCaseConverter(axios)

type userData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const apiUrl = "http://localhost:3000/api/v1/auth_token";
  const navigate = useNavigate()
  const { login } = useAuth()

  const [userData, setUserData] = useState<userData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setUserData((preData: userData) => {
      return { ...preData, [fieldName]: value };
    });
  };

  const hundleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('userData:',userData)
      const response = await axios.post(
        apiUrl,
        { auth: userData },
        {
          withCredentials: true,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("成功", response);
      login(response.data)
      navigate('/home')
    } catch (err: any) {
      console.log("エラー", err.response.data);
    }
  };

  return (
    <Container>
      <LoginCard>
        <h1>サインアップフォーム</h1>
        <form onSubmit={hundleSubmit}>
          <TextField 
            variant="outlined" 
            margin="normal" 
            fullWidth 
            label="email" 
            type="email"
            value={userData.email}
            onChange={handleChange}
            slotProps={{
              htmlInput: {
                'id': 'email',
                'name': 'email',
              }
            }}
            />
          <TextField 
            variant="outlined" 
            margin="normal" fullWidth 
            label="password" 
            type="password" 
            value={userData.password}
            onChange={handleChange}
            slotProps={{
              htmlInput: {
                'id': 'password',
                'name': 'password',
              }
            }}
            />
          <Button 
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            >
            サインイン
          </Button>
        </form>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
              navigate('/signup')
            }}
          >
            新規登録
          </Link>
        <Divider sx={{ my: 3, width: '100%' }}></Divider>
        {/* <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
              navigate('/signup')
            }}
          >
          Googleでログイン
        </Link> */}
        <GoogleIcon />
      </LoginCard>
    </Container>
  );
}