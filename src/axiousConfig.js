import axios from 'axios'


const instance = axios.create({
        // baseURL: 'http://localhost:8081/api/v1/admin',
       baseURL:'http://bajos.in:8081/api/v1/admin',
        headers: {
         

            'Content-Type': 'application/json',
        },
    });
  


export default instance;