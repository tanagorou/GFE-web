import React, { useEffect } from "react";
import { Avatar, Container, CssBaseline, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import axios from "axios";
import axiosCaseConverter from "simple-axios-case-converter";

axiosCaseConverter(axios)
// export default function SignUp(){
//   return(
//     <Container component='main' maxWidth='xs'>
//       <p>haaaa</p>
//       <CssBaseline/>
//         <Avatar>
//           <LockOutlinedIcon/>
//         </Avatar>
//         <Typography component='h1' variant="h5">
//           Sign up
//         </Typography>
//     </Container>
//   )
// }

type userData = {
  // firstName: string;
  // lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function SignUp() {
  const apiUrl = "http://localhost:3000/signup";

  const [userData, setUserData] = useState<userData>({
    // firstName:'',
    // lastName: '',
    email: "",
    password: "",
    passwordConfirmation: "",
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
        { user: userData },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("成功", response.data);
    } catch (err: any) {
      console.log("エラー", err.response.data);
    }
  };

  return (
    <div>
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
        <div>
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
        <button>サインアップ</button>
      </form>
    </div>
  );
}
