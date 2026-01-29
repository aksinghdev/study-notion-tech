
import { setUser, setLoading } from "../../slices/profileSlice"

import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../api"
import toast from "react-hot-toast";
const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints;

// User details thunk
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

// Get enrolled courses thunk
export function getEnrolledCourses (token){
    return async (dispatch) =>{
        dispatch(setLoading(true))
        let result = [];
        try{
        const response = await apiConnector (
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        console.log("print get enrolled courses response",response);
        // update   redux and local storage
        result = response.data.data;
        }
        catch(error){
            console.log("get enrolled courses thunk error",error);
            console.log(error.message);
        }finally{
            dispatch(setLoading(false));
            return result;
        }
    }
    
}