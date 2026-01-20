
import axios from "axios"

export const axiosInstance = axios.create({
    withCredentials: true,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log("print bodydata inside api connector",bodyData);
    // console.log("print url inside api connector",url);
    console.log("HEADERS 👉", headers);
    console.log("PARAMS 👉", params);
    console.log("URL 👉", url);

    return axiosInstance(
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