import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/api";
import { styled } from '@mui/material/styles';
import { Button, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Link from '@mui/material/Link';
import { handleGoogleLogin } from "../GoogleCallback";

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

type userData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const {enqueueSnackbar} = useSnackbar()

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
      // console.log('userData:',userData)
      const response = await api.post(
        '/auth_token',
        { auth: userData },
        {
          withCredentials: true,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("成功", response.data);
      login(response.data)
      navigate('/home')
    } catch (err: any) {
      // console.log("エラー", err.response.data);
      enqueueSnackbar('エラーが発生しました', {variant: 'error'})
    }
  };

  return (
    <Container>
      <LoginCard>
        <h1>サインイン</h1>
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
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            console.info("I'm a button.");
            handleGoogleLogin()
          }}
        >
          Googleでログイン</Link>
      </LoginCard>
    </Container>
  );
}