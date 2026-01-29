
import toast from "react-hot-toast";

import { setLoading, setSignupData, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { addToCart, removeFromCart, resetCart } from "../../slices/cartSlice";
import { endpoints } from "../api";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../api";

const {
    LOGIN_API,
    SENDOTP_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SIGNUP_API,
} = endpoints;

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
} = profileEndpoints


export function sendOtp (email, navigate){
    console.log("getting email for sending otp",email);
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            console.log("inside try in send otp");
            const result = await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent: true,
            });
            console.log("Api response is --------->", result);
            console.log(result.data.success)

        if (!result.data.success) {
            // throw new Error(response.data.message)
            console.log("response not found for send otp", result.data.message);
        }
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")

        }
        catch(error){
            // console.log(error);
            // console.log(error.response.data.message);
            console.log(" sendOTP api error ", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

// Signup handler
export function signupCall(firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp, navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const output = await apiConnector("POST", SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                contactNumber,
                otp,
            });
            console.log("signup api output:---",output)
            console.log(output.data.success);

            if (!output.data.success) {
                console.log("response not found for signup api", output.data.message);
                throw new Error(output.data.message)
            }
            toast.success(output.data.message);
            navigate("/login")

        }
        catch(error){
            console.log("signUp api error")
            toast.error("SignUp failed !")
            console.log(error);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}



// login api call
export function loginApiCall(email, password, AccountType, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      // LOGIN API
      const result = await apiConnector("POST", LOGIN_API, {
        email,
        password,
        AccountType,
      });

      if (!result.data.success) {
        throw new Error(result.data.message);
      }

      const token = result.data.token;

      dispatch(setToken(token));
      localStorage.setItem("token", token);

      // FETCH USER DETAILS
      const response = await apiConnector(
        "GET",
        GET_USER_DETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      const userData = response.data.data;

      const userImage = userData.image
        ? userData.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

      dispatch(setUser({ ...userData, image: userImage }));
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Logged in successfully");
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR", error);
      toast.error(error.message || "Login failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}


export function logOut(navigate){
    console.log("inside log out thunk triggred");
    return(dispatch) =>{
        try{    
            dispatch(setToken(null))
            dispatch(setUser(""))
            dispatch(resetCart())
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            toast.success("Logged Out")
            navigate("/")
        }
        catch(error){
            console.error("Log out failed",error)
        }
    }
}

export function resetPasswordToken(email, setEmailSend){
    return async(dispatch) =>{
        dispatch(setLoading(true))
        try{
            const responce = await apiConnector("POST",RESETPASSTOKEN_API,{email})
            console.log(" printing responce for forgot password........",responce);

            if(!responce.data.success){
                throw new Error(responce.data.message)
            }
            toast.success("Reset Email sent")
            setEmailSend(true)
        }
        catch(error){
            console.log("Error in reset password");
            toast.error("Reset Password Failed")
        }
        dispatch(setLoading(false))
    }

}

// http://localhost:3400/api/v1/auth/reset-password

export function resetPassword(token, newPassword, confirmNewPassword, navigate){
    
    return async(dispatch) =>{
        const toastId = toast.loading("Loading........")
        dispatch(setLoading(true));
        try{
            
            const result = await apiConnector("POST",RESETPASSWORD_API,{
                token,
                newPassword,
                confirmNewPassword,
            })

            console.log("print Result:---",result);
            if(!result.data.success){
                throw new Error(result.data.message)
            }
            toast.success("Reset Password done")
            const email = result.data.email;
            console.log("passed email from reset password:---",email);
            navigate("/reset-complete",{state:{email}});
        }
        catch(error){
            console.log("Error in reset password by email link");
            toast.error("Reset Password Failed")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}