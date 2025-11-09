import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/api";
import { useSnackbar } from "notistack";
import { styled } from '@mui/material/styles';
import { Button, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Link from '@mui/material/Link';

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
  name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { login } = useAuth()
  const {enqueueSnackbar} = useSnackbar()
  const navigate = useNavigate()

  const [userData, setUserData] = useState<userData>({
    name: "",
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


  // 現在はSignUpをしてもトークンが発行されず、ログイン状態とはなっていないことになっている。
  // サインアップ時にもトークンを発行するべきなのか、検討すべき
  const hundleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        '/sign_up',
        { user: userData },
        {
          withCredentials: true,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/json",
          },
        }
      );
      login(response.data)
      navigate('/home')
    } catch (err: any) {
      // console.log("エラー", err.response.data);
      enqueueSnackbar('エラーが発生しました', {variant: 'error'})
    }
  };

  return (
    <Container>
      <SignInCard>
        <h1>サインアップ</h1>
        <form onSubmit={hundleSubmit}>
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
