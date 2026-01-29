import {toast} from "react-hot-toast";
import { profileEndpoints, settingsEndpoints, endpoints } from "../api";
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

const{RESETPASSWORD_API} = endpoints

const{GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints


export function updateDisplayPicture (token, formData,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        // console.log("received formdata--",formData);
        // console.log("received token--",token);
    
        try{
            // console.log("inside try before api connector call.");
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

            // fetch updated user
            const result = await apiConnector(
                "GET",
                GET_USER_DETAILS_API,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            const userData = result.data.data;
            const userImage = userData.userImage
            ? userData.userImage
            : `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;
            
            // update redux and localstorage
            const updatedUser = {...userData, image:userImage}
            dispatch(setUser(updatedUser));
            localStorage.setItem("user", JSON.stringify(updatedUser));

            // navigate to dashboard
            toast.success("Your DP updated succefully")
            navigate("/dashboard/my-profile");
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
        try{
            // update profile
            console.log("before update profile");
            const response = await apiConnector(
                "PUT",
                UPDATE_PROFILE_API,
                data,
                {
                    Authorization : `Bearer ${token}`,
                }
            )
            
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            console.log("update profile responce",response);
            
            // fetch updated user
            const result = await apiConnector(
                "GET",
                GET_USER_DETAILS_API,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            const userData = result.data.data;
            const userImage = userData.userImage
            ? userData.userImage
            : `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;
            
            // update redux and local storage
            const finalUser = {...userData, image: userImage}
            dispatch(setUser(finalUser));
            localStorage.setItem("user",JSON.stringify(finalUser));

            // success toast & navigate to dashboard
            toast.success("Your profile updated succefully")
            navigate("/dashboard/my-profile");
        }
        catch(error){
            console.log("Error in Update profile API error",error);
            toast.error("Could not update your profile, ERROR!!!");

        }
        toast.dismiss(toastId);
    }
}

// Update password thunk

export function updatePassword(token,data,navigate){
    return async(dispatch) =>{
        // console.log("🔥 UPDATE PASSWORD THUNK CALLED");

        const toastId = toast.loading("Loading....")
        // console.log("inside updatepassword thunk print form data amd token",data,token);
        try{

            const bodyData = {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            };
            // change password
            const result = await apiConnector(
                "POST",
                CHANGE_PASSWORD_API,
                bodyData,
                {
                        Authorization:`Bearer ${token}`
                }    
            )
            if(!result.data.success){
                throw new Error(result.data.message);
            }
            const userData = result.data.data
            const userImage = userData.userImage ? userData.userImage :
            `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

            const newUser = {...userData, image: userImage}
            dispatch(setUser(newUser));
            localStorage.setItem("user",JSON.stringify(newUser)); 

            console.log("update passwod result",userData);
            toast.success("your password successfully changed ");
            navigate("/dashboard/my-profile");
        }
        catch(error){
            console.log("Change password thunk catch error",error);
            console.log(error.message);
            toast.error("Could not update your account password")
        }finally{
            toast.dismiss(toastId);
        }
    }
}

// delete accout thunk
export function deleteAccount(token, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const result = await apiConnector(
                "DELETE",
                DELETE_PROFILE_API,
                null,
                {
                    Authorization : `Bearer ${token}`
                }
            )
            if(!result){
                throw new Error(result.data.message);
            }
            toast.success("Your account deleted successfully")
            dispatch(logOut(navigate));
        }
        catch(error){
            console.log("Delete account catch api error",error);
            console.log(error.message);
            toast.error("Could not delete your account")
        }finally{
            toast.dismiss(toastId);
        }
    }
}