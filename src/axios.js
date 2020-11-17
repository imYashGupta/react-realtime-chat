import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
});
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.interceptors.request.use(config => {
    if(localStorage.getItem("token")){
        config.headers["Authorization"] = "bearer " + localStorage.getItem("token");
    }
    return config;
},error => {
    Promise.reject(error);
})

export default instance;