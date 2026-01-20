
import { setUser, setLoading } from "../../slices/profileSlice"

import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../api"
const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints;


export function getUserDetails(token){
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector(
                "GET",
                GET_USER_DETAILS_API,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error("Failed to fetch user Details");
            }
            console.log("print get user details api response",response);
            // getupdate user 
            const user = response.data.data;
            // udate redux
            dispatch(setUser(user));
            // sync or update local storage
            localStorage.setItem("user",JSON.stringify(user));
        }
        catch(error){
            console.log("GET_USER_DETAILS_API Thunk function Error");
            console.log(error);
        }finally{

            dispatch(setLoading(false))
        }
    };
};