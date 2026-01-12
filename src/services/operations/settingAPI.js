import {toast} from "react-hot-toast";
import { settingsEndpoints } from "../api";
import { setUser } from "../../slices/profileSlice";
import { logOut } from "./authAPI";
import { apiConnector } from "../apiConnector";
import { setLoading } from "../../slices/authSlice";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints


export function updateDisplayPicture (token, formData,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        console.log("received formdata--",formData);
        console.log("received token--",token);
    
        try{
            console.log("inside try before api connector call.");
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    // "content-type":"multipart/form-data",
                    Authorization : `Bearer ${token}`,
                    
                }
            )
            console.log("Update DP API response",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Your DP updated succefully")
            // update localstorage
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", response.data.user)
            // navigate to dashboard
            navigate("/dashboard/my-profile");
            dispatch(setUser(response.data.user));
        }
        catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId);
    }
}

// edit profile 
export function updateProfile(token, data, navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading....")
        console.log("inside update profile thunk printing received data",data);
        console.log("recieved token",token);

        try{
            console.log("before update profile");
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                data,
                {
                    // Authorization: `Bearer ${token}`,
                    Authorization : `Bearer ${token}`,
                }
            )
            console.log("update profile result",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Your profile updated succefully")
            dispatch(setUser(response.data.user));
            // localStorage.setItem("user", JSON.stringify(result.data.user));

            // update localstorage
            // localStorage.setItem("token", responce.data.token)
            // localStorage.setItem("user", result.data.user)
            // navigate to dashboard
            navigate("/dashboard/my-profile");
        }
        catch(error){
            console.log("Error in Update profile API error",error);
            toast.error("Could not update your profile, ERROR!!!");

        }
        toast.dismiss(toastId);
    }
}