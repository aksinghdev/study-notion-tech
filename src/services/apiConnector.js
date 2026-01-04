
import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    // console.log("print bodydata",bodyData);
    return axiosInstance(
        
        // console.log("print method--",method);
        {
        method:`${method}`,
        url: `${url}`,
        data : bodyData ? bodyData : null,
        headers : headers ? headers : null,
        params: params ? params : null,

        // headers : headers || {},
        // data : bodyData || {},
        // params : params || {},
    });
};