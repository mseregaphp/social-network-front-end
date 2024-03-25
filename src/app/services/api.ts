import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants"
import type { RootState } from "../store"

//
const baseQuery = fetchBaseQuery({
  //путь запроса
  baseUrl: `${BASE_URL}/api`,

  //при каждом запросе устанавливаем токен в хедер
  // prepareHeaders: (headers, {getState}) =>{
  //     const token = (getState() as RootState).auth.token || localStorage.getItem("token")

  //     if (token) {
  //         headers.set('autorization', `Bearer ${token}`)
  //     }

  //     return headers;
  // }
})

//запрос перезапрашиваеться несколько раз в случае 500 ошибки
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,

  //отключаем функцию кеширования
  refetchOnMountOrArgChange: true,

  endpoints: () => ({}),
})
