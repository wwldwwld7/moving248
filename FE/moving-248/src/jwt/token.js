import { faRunning } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {"Content-type": "application/json"}
});

//요청을 보내기 전
instance.interceptors.request.use(

    function(request){
        

        request.headers['Authorization'] = window.localStorage.getItem('accessToken');
        return request;
    },
    function(error){
        return 
    }
);

//응답이 들어오면
instance.interceptors.response.use(

);