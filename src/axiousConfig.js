import axios from 'axios'

const instance = axios.create({
       baseURL: "http://admin.bajos.in:8081/api/v1/admin/", 
        // baseURL:'http://ec2-15-207-51-90.ap-south-1.compute.amazonaws.com:8081/api/v1/admin',
       // baseURL: 'http://localhost:8081/api/v1/admin',
       // baseURL:'http://ec2-15-207-51-90.ap-south-1.compute.amazonaws.com:8081/api/v1/admin',
        headers: {
            'Content-Type': 'application/json'
        },
    });


export default instance;