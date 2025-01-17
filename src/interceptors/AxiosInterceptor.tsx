import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AxiosInterceptor = () => {
  const navigate = useNavigate();
  const isRefreshing = useRef(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.data?.code === "AUTHGUARD_001") {          
          navigate('/signin');
        } else if (error.response?.data?.code === "AUTHGUARD_002" && !isRefreshing.current) {
          isRefreshing.current = true;

          try {
            const refresh_token = localStorage.getItem('refresh_token');
            const refresh_response = await axios.get('http://localhost:3000/auth/refreshToken', {
              headers: {
                "refresh_token": refresh_token
              }
            });


            if (refresh_response.status === 200 && refresh_response.data.access_token) {
              localStorage.setItem('access_token', refresh_response.data.access_token);
              localStorage.setItem('refresh_token', refresh_response.data.refresh_token);

              axios.defaults.headers.common['Authorization'] = `Bearer ${refresh_response.data.access_token}`;
              originalRequest.headers['Authorization'] = `Bearer ${refresh_response.data.access_token}`;

              isRefreshing.current = false;
              return axios(originalRequest);
            } else {
              throw new Error("Unexpected refresh response");
            }
          } catch (refreshError) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            isRefreshing.current = false;
            navigate('/signin');
          }
        } else if (error.response?.data?.code === "AUTH_003") {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/signin');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return null;
};

export default AxiosInterceptor;