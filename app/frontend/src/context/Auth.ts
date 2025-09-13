// 現在必要な関数

import { data } from "react-router-dom"

// 1. レスポンスから現在のUserを格納する関数 => setCurrentUser
export const setCurrentUser = (data: null) => {
  console.log(data)
  const currentUser = { user: { current: data.user } }
  return currentUser
}
// 2. レスポンスからアクセストークンを格納する関数 =>setAccessToken
export const setAccessToken = (data: null) => {
  const token = data.token
  const [, payload] = token.split(".")
  const decoded = JSON.parse(atob(payload))
  const currentAccessToken = { auth: { token: token, expires: decoded.exp, payload: { decoded } } }
  return currentAccessToken
}
// 3. レスポンスからexpを格納する関数 => setExp

// トークンが有効かどうかを調べる => 有効ならtrue　isExpired
export const isExpired = (token) => {
  return Date.now() >= token.auth.expires
}
// Userが存在しているかどうか確認（data.user.subとtoken.payload.subがあり、一致するかどうか）　isExistUser
export const isExistUser = (data) => {
  return data.user.sub && data.auth.payload.sub && data.user.sub == data.auth.payload.sub
}
// Userが存在し、accessトークンが有効かどうか。有効期限切れのときにtrueを返す。isExistUserAndExpired
export const isExistUserAndExpired = (data) => {
  return isExistUser(data) && !isExpired(data)
}
// ユーザーが存在し、かつ有効の場合、そのUserはログイン状態とする　loggedIn

// useEffectはページ遷移したとき呼ばれてしまうのでif文で条件分岐を行う必要がある。
// そこでisExistUserAndExpiredが有効の場合、サイレントリフレッシュを行う。
// これはリフレッシュトークンが有効である限り、アクセストークンを発行したいため。