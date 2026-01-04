
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useParams, Link, useNavigate  } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useDispatch } from "react-redux";
import {resetPassword} from "../services/operations/authAPI"
import { FaCircleCheck } from "react-icons/fa6";

export default function UpdatePassword(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useParams();
    // console.log("print token for update password:-----",token);

    const [showPassword, setshowPassword] = useState(false);
    const [ConfirmShowPassword, setConfirmShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        newPassword:"",
        confirmNewPassword:"",
    })
    const{newPassword, confirmNewPassword} = formData;
    
    const ChangeHandler = (e) =>{
        setFormData( (prev) =>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        if(newPassword !== confirmNewPassword){
            toast.error(" Password not Matched")
            return
        }
        
        dispatch(resetPassword( token, newPassword, confirmNewPassword, navigate))
    }

    return(
        <div className=" w-screen h-screen flex flex-col items-center justify-center gap-6 text-richblack-5 overflow-y-hidden">
            <div className=" w-[30%] p-6 flex flex-col gap-3">
                <h1 className=" font-semibold text-3xl font-inter">
                    Choose New Password
                </h1>
                <p className=" text-richblack-100 font-normal text-lg ">
                    Almost done. Enter your new password and youre all set.
                </p>

                <form onSubmit={handleOnSubmit}
                    className=" flex flex-col gap-4 mt-5"
                >
                    <label className="w-full relative">
                        <p className=" text-[0.875rem] leading-[1.375rem]">
                            New Password
                            <sup className="text-red-700 font-semibold text-sm">*</sup>
                        </p>
                        <input
                        className=" py-1 px-2 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
                        type={showPassword? "text" : "password"}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        required
                        placeholder="New password"
                        name="newPassword"
                        value={newPassword}
                        onChange={ChangeHandler}
                    />
                        <span 
                            onClick={ ()=>setshowPassword((prev)=> !prev)}
                            className=" absolute right-4 top-[30px]"> 
                                {
                                    showPassword ? <FaEyeSlash/> : <FaEye/>
                                }
                        </span>
                    </label>
                    <label className="w-full relative">
                        <p className=" text-[0.875rem] leading-[1.375rem]">
                            Confirm New Password
                            <sup className="text-red-700 font-semibold text-sm">*</sup>
                        </p>
                        <input
                        className=" py-1 px-2 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
                        type={ConfirmShowPassword ? "text" : "password"}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        required
                        placeholder="Confirm New password"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={ChangeHandler}
                    />
                        <span 
                            onClick={ ()=>setConfirmShowPassword((prev)=> !prev)}
                            className=" absolute right-4 top-[30px]"> 
                                {
                                    ConfirmShowPassword ? <FaEyeSlash/> : <FaEye/>
                                }
                        </span>
                    </label>
                
                    <div className="w-full text-caribbeangreen-300 text-xs font-inter flex flex-row gap-6">
                    
                            <ul className=" flex flex-col gap-3">
                                <li className=" flex flex-row gap-2 text-center items-center ">
                                    <FaCircleCheck/>
                                    <p>one lowercase character</p>
                                </li>
                                <li className=" flex flex-row gap-2 text-center items-center ">
                                    <FaCircleCheck/>
                                    <p>one uppercase character</p>
                                </li>
                                <li className=" flex flex-row gap-2 text-center items-center ">
                                    <FaCircleCheck/>
                                    <p>one number</p>
                                </li>
                            </ul>
                        
                    
                            <ul className=" flex flex-col gap-3">
                                <li className=" flex flex-row gap-2 text-center items-center ">
                                    <FaCircleCheck/>
                                    <p>one special character</p>
                                </li>
                                <li className=" flex flex-row gap-2 text-center items-center ">
                                    <FaCircleCheck/>
                                    <p>8 character minimum</p>
                                </li>
                            </ul>
                        
                    </div>


                    <button type="submit"
                    className=" w-full  mt-6 rounded-xl bg-yellow-50 py-2 px-3 font-semibold text-richblack-900 
                    hover:scale-95 hover:bg-yellow-25"
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    >
                        Reset Password
                    </button>

                </form>
                <Link to={"/login"}>
                    <div className=" flex flex-row gap-3 items-center text-richblack-25 hover:text-richblack-100">
                        <GoArrowLeft/>
                        <p className=" text-richblack-">Back to login</p>
                    </div>
                </Link>

            </div>
        </div>
    );
}