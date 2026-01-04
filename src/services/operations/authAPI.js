
import toast from "react-hot-toast";

import { setLoading, setSignupData, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { addToCart, removeFromCart, resetCart } from "../../slices/cartSlice";
import { endpoints } from "../api";
import { apiConnector } from "../apiConnector";

const {
    LOGIN_API,
    SENDOTP_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SIGNUP_API,
} = endpoints;


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
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}



// login api call

// export function loginApiCall(email, password, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Loading...")
//     dispatch(setLoading(true))

//     console.log(" email--->",email);
//     console.log(" password--->",password);
//     // const bodyData ={
//     //     email,
//     //     password,
//     // }
//     try {
//         console.log(" LOGIN_API----",endpoints.LOGIN_API)
//       const response = await apiConnector("POST",
//         endpoints.LOGIN_API,
//         {
//             email,
//             password
//         },
//     )
//       console.log(" email--->",email);
//       console.log(" password--->",password);
//       console.log("LOGIN API RESPONSE............", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message)
//       }

//       toast.success("Login Successful")
//       dispatch(setToken(response.data.token))
//     //   const userImage = response.data?.user?.image
//     //     ? response.data.user.image
//     //     : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
//     //   dispatch(setUser({ ...response.data.user, image: userImage }))
//       localStorage.setItem("token", JSON.stringify(response.data.token))
//       navigate("/dashboard/my-profile")
//     } catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       if (error.response && error.response.status === 401) {
//         toast.error("Invalid email or password");
//         } else {
//             toast.error("Login failed. Please try again.");
//         }
//     }
//     dispatch(setLoading(false))
//     toast.dismiss(toastId)
//   }
// }


export function loginApiCall(email, password, AccountType, navigate){
    return async (dispatch) => {
        const toastId = toast.loading(" Loading...")
        dispatch(setLoading(true))
        // console.log("email inside login call ", email);
        try{
            // console.log("email inside login call try ", email);
            // console.log("PRINT LOGIN API ---->>>",LOGIN_API);
            const responce = await apiConnector("POST", LOGIN_API,{
                email : email,
                password : password,
                AccountType: AccountType,
            })
            // console.log("email inside login call ", email);
            // console.log("Lgin API response--->",responce);
            if(!responce.data.success){
                throw new Error(responce.data.message);
            }

            // succefullly login
            toast.success("Loged In Successfully")
            dispatch(setToken(responce.data.token))
            // user setup
            const userImage = responce.data.existUserLogin.userImage ? responce.data.existUserLogin.userImage :
            `https://api.dicebear.com/5.x/initials/svg?seed=${responce.data.existUserLogin.firstName} ${responce.data.existUserLogin.lastName}`
            dispatch(setUser({...responce.data.existUserLogin, Image: userImage}))
            // update localstorage
            localStorage.setItem("token", responce.data.token)
            localStorage.setItem("user", responce.data.user)
            // navigate to dashboard
            navigate("/dashboard/my-profile")

        }
        catch (error) {
            console.log("LOGIN API ERROR............", error)
            if (error.response && error.response.status === 401) {
                toast.error("Invalid email or password");
            } else {
                toast.error("Login failed. Please try again.");
            }
            toast.error("Login Failed ")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
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