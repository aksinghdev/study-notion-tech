
import axios from "axios"

export const axiosInstance = axios.create({
    withCredentials: true,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log("print bodydata for update DP",bodyData);
    return axiosInstance(
        
        // console.log("print method--",method);
        {
        method: method,
        url: `${url}`,
        data : bodyData ? bodyData : null,
        headers : headers ? headers : {},
        params: params ? params : null,

        // headers : headers || {},
        // data : bodyData || {},
        // params : params || {},
    });

};