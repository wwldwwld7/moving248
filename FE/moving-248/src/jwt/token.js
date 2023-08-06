import { faRunning } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { func } from 'prop-types';
import { Cookies } from 'react-cookie';

const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {"Content-type": "application/json"}
});

//요청을 보내기 전
instance.interceptors.request.use(

    function(config){
        const atk = localStorage.getItem('accessToken');

        if(!atk){
            config.headers.Authorization = null;
            return config;
        }

        //로그인 시 발급받은 atk를 헤더에 담아서 요청을 보낸다.
        config.headers.Authorization = `${atk}`;
        // console.log(config);
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

const cookies = new Cookies(); // Cookies 객체 생성
//응답이 들어오면
instance.interceptors.response.use(
    function(response){
        console.log("interceptor response 200");
        return response;
    },
    async(error)=>{
        // console.log(error.config.url);
        const {
            config, 
            response: {status}
        } = error;
        

        if(status === 401){
            // const [cookies, setCookie] = useCookies(["refreshToken"]);
            const originalRequest = config;
            // console.log(cookies.get("refreshToken"));
            const refreshToken = cookies.get("refreshToken");
            // const refreshToken = cookies;
            // const refreshToken = localStorage.getItem("refreshToken");
            // console.log(refreshToken);

            if(refreshToken){
                const res = await axios.get('/member/reissue',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${refreshToken}`,
                    },
                }
                );

                // console.log(res);
                const accessToken = res.data.accessToken;
                await localStorage.setItem("accessToken", accessToken);

                originalRequest.headers.Authorization = `${accessToken}`;
                return axios(originalRequest);
                // axios.get('http://localhost:8080/member/reissue', {
                //     headers: {
                //         "Content-Type": "application/json",
                //         "Authorization": `${refreshToken}`
                //     }
                // })
                // .then(res => {
                //     const accessToken = res.data.accessToken;
                //     localStorage.setItem("accessToken", accessToken);

                //     config.headers.Authorization = `${accessToken}`;
                //     return axios(config);
                // })
                // .catch(err => {
                //     return Promise.reject(err);
                // });
            }
        }

        return Promise.regect(error);
    }
);
export const defaultInstance = instance;