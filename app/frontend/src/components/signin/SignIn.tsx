import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import axiosCaseConverter from "simple-axios-case-converter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

axiosCaseConverter(axios)

type userData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const apiUrl = "http://localhost:3000/login";
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
        { user: userData },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("成功", response);
      login(response.headers.authorization)
      navigate('/')
    } catch (err: any) {
      console.log("エラー", err.response.data);
    }
  };

  return (
    <div>
      <h1>サインアップフォーム</h1>
      <form onSubmit={hundleSubmit}>
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
        <button>サインイン</button>
      </form>
    </div>
  );
}