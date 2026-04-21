import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/',
})

client.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export default client
