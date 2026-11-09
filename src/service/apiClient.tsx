import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken } from './storage'
import { BASE_URL } from './config'

export const apiClient = axios.create({
    baseURL: BASE_URL,
})

export const publicApi = axios.create({
    baseURL: BASE_URL,
})

//Interceptors (when we send request  from frontend it will check 
// if i have access token or not , if yes attach and then request)

//Request Interceptor

apiClient.interceptors.request.use(
    async config => {
        const token = getAccessToken();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    error => Promise.reject(error)
);

//Response Interceptor

apiClient.interceptors.response.use(
    response=>response,
    async error =>{
        if(error.response?.status===403){
           const refreshToken =getRefreshToken();
           if(!refreshToken){
               return Promise.reject(error)
           }
           //if refresh has an error
        try{
            const {data} = await axios.post(`${BASE_URL}/user/refresh`, {
                refreshToken,
            })
            setAccessToken(data?.accessToken)
            error.config.headers.Authorization = `Bearer ${data?.accessToken}`;
            return axios(error.config)
        } catch (refreshError){
          return Promise.reject(refreshError)
        }
        }
        return Promise.reject(error)
    }
)


