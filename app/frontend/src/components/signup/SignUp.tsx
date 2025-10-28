import React, { useEffect } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import axios from "axios";
import axiosCaseConverter from "simple-axios-case-converter";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Button, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Link from '@mui/material/Link';

axiosCaseConverter(axios)

const Container = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0'
})

const SignInCard = styled('div')({
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
})

type userData = {
  // firstName: string;
  // lastName: string;
  name: string;
  email: string;
  password: string;
  // passwordConfirmation: string;
};

export default function SignUp() {
  const apiUrl = "http://localhost:3000/api/v1/sign_up";
  const navigate = useNavigate()

  const [userData, setUserData] = useState<userData>({
    // firstName:'',
    // lastName: '',
    name: "",
    email: "",
    password: "",
    // passwordConfirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setUserData((preData: userData) => {
      return { ...preData, [fieldName]: value };
    });
  };


  // 現在はSignUpをしてもトークンが発行されず、ログイン状態とはなっていないことになっている。
  // サインアップ時にもトークンを発行するべきなのか、検討すべき
  const hundleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('userData:',userData)
      const response = await axios.post(
        apiUrl,
        { user: userData },
        {
          withCredentials: true,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("成功", response.data);
      navigate('/home')
    } catch (err: any) {
      console.log("エラー", err.response.data);
    }
  };

  return (
    <Container>
      <SignInCard>
        <h1>サインアップフォーム</h1>
        <form onSubmit={hundleSubmit}>
          {/* <div>
            <label htmlFor="firstName">名</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="博士"
              value={ userData.firstName }
              onChange={handleChange}
            />
            <label htmlFor="lastName">姓</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="太郎"
              value={ userData.lastName }
              onChange={handleChange}
            />
          </div> */}
          {/* <div>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="メールアドレス"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="パスワード"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirmation">再パスワード</label>
            <input
              id="passwordSecopasswordConfirmationnd"
              name="passwordConfirmation"
              type="password"
              placeholder="再パスワード"
              value={userData.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          <TextField 
            variant="outlined"
            margin="normal"
            fullWidth
            label='email'
            value={userData.email}
            onChange={handleChange}
            slotProps={{
              htmlInput: {
                'id': 'email',
                'name': 'email'
              }
            }}
          /> */}
          <TextField 
            variant="outlined"
            margin="normal"
            fullWidth
            label='name'
            type="text"
            value={userData.name}
            onChange={handleChange}
            slotProps={{
              htmlInput: {
                'id': 'name',
                'name': 'name'
              }
            }}
          />
          <TextField 
            variant="outlined"
            margin="normal"
            fullWidth
            label='email'
            type="email"
            value={userData.email}
            onChange={handleChange}
            slotProps={{
              htmlInput: {
                'id': 'email',
                'name': 'email'
              }
            }}
          />
          <TextField 
            variant="outlined"
            margin="normal"
            fullWidth
            label='password'
            type="password"
            value={userData.password}
            onChange={handleChange}
            slotProps={{
              htmlInput: {
                'id': 'password',
                'name': 'password'
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
        <Divider sx={{ my: 3, width: '100%' }}></Divider>
        <Link
            component="button"
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
              navigate('/signup')
            }}
          >
          Googleでログイン
        </Link>
      </SignInCard>
    </Container>
  );
}
