// 1. レスポンスから現在のUserを格納する関数 => setCurrentUser
export const setCurrentUser = (data: any) => {
  // console.log(data)
  const currentUser = data ? { user: { current: data.user } } : { user: { current: '' } }
  return currentUser
}
// 2. レスポンスからアクセストークンを格納する関数 =>setAccessToken
export const setAccessToken = (data: any) => {
  const token = data.token
  const [, payload] = token.split(".")
  const decoded = JSON.parse(atob(payload))
  const currentAccessToken = { auth: { token: token, expires: decoded.exp * 1000, payload: { ...decoded } } }
  return currentAccessToken
}
// 3. レスポンスからexpを格納する関数 => setExp

// トークンが有効かどうかを調べる => 有効ならtrue　isExpired
export const isExpired = (token: any) => {
  return Date.now() >= token.auth.expires
}
// Userが存在しているかどうか確認（data.user.subとtoken.payload.subがあり、一致するかどうか）　isExistUser
export const isExistUser = (data: any) => {
  return data?.user?.current?.sub && data?.auth?.payload?.sub && data?.user?.current?.sub == data?.auth?.payload?.sub
}
// Userが存在し、accessトークンが有効かどうか。有効期限切れのときにtrueを返す。isExistUserAndExpired
export const isExistUserAndExpired = (data: any) => {
  return isExistUser(data) && isExpired(data)
}
// ユーザーが存在し、かつ有効の場合、そのUserはログイン状態とする　loggedIn
export const loggedIn = (data: any) => {
  return isExistUser(data) && !isExpired(data)
}

// useEffectはページ遷移したとき呼ばれてしまうのでif文で条件分岐を行う必要がある。
// そこでisExistUserAndExpiredが有効の場合、サイレントリフレッシュを行う。
// これはリフレッシュトークンが有効である限り、アクセストークンを発行したいため。

// 追記：10/17 バグ：リロードをし続けると、ログイン画面に遷移してします（リフレッシュトークンの有効期間にもかかわらず）
