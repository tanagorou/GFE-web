import axios from "axios";
import axiosCaseConverter from "simple-axios-case-converter"

axiosCaseConverter(axios)

export const baseURL = process.env.REACT_APP_BASE_URL

export const api = axios.create({
  baseURL: baseURL + '/api/v1',
  withCredentials: true,  // クロスサイトリクエストでクッキーを送信するために必須
})