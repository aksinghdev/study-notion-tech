import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPasswordToken } from "../services/operations/authAPI";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { loading } = useSelector((state) => state.auth);
  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setEmailSend));
  };

  return (
    <div className=" w-screen h-screen flex flex-col items-center justify-center gap-4 text-richblack-5 overflow-y-hidden">
      
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className=" w-[30%] p-6 flex flex-col gap-3">
            <h1 className=" font-semibold text-3xl font-inter">{emailSend ? "Check Email" : "Reset Your Password"}</h1>
            <p className=" text-richblack-100 font-normal ">
              {emailSend
                ? `We have sent the reset email to ${email}`
                : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"}
            </p>
            <form onSubmit={handleOnSubmit}
                className=" mt-4"
            >
              {!emailSend && (
                <label className=" w-full flex gap-y-[3px] flex-col text-richblack-5">
                  <p className=" mb-1 text-[0.875rem] leading-[1.375rem]">Email Address
                    <sup className="text-red-700 font-semibold text-sm">*</sup>
                  </p>
                  <input
                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              )}
              <button type="submit"
                className=" w-full  mt-6 rounded-xl bg-yellow-50 py-2 px-3 font-semibold text-richblack-900 
                   hover:scale-95 hover:bg-yellow-25"
                    style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
              >
                {!emailSend ? "Reset Password" : "Resend Email"}
              </button>
            </form>
            <Link to={"/login"}>
              <p className=" ml-auto max-w-max text-sm text-blue-100 hover:text-blue-50 transition-all duration-200">Back to login</p>
            </Link>
          </div>
        )}
      
    </div>
  );
}

// export default function ForgotPassword(){

//     const {loading} = useSelector((state)=> state.auth);

//     return(
//         <div>
//             {
//                 loading ? (
//                     <div>
//                         Loading...
//                     </div>
//                 ):(

//                 )
//             }
//         </div>
//     );
// }
