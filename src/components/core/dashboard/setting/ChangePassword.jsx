
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import BtnIcon from "../../../common/BtnIcon";
import {updatePassword} from "../../../../services/operations/settingAPI"

export default function ChangePassword() {

    const[viewCurrentPassword, setViewCurrentPassword] = useState(null);
    const[viewNewPassword, setViewNewPassword] = useState(null);

    const {token} = useSelector( (state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState:{errors}} = useForm();

    const submitPasswordForm = async (data) =>{
        console.log("change password form data",data);
        try{
            dispatch(updatePassword(token, data, navigate));
        }
        catch(error){
            console.log("submit password form catch error",error);
            console.log(error.message);
        }

    }


  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className=" flex flex-col gap-5 lg:flex-row">
            <div className=" flex flex-col gap-2 lg:w-[48%]">
              <label 
                htmlFor="currentPassword"
                className="relative w-full flex gap-y-[3px] items-start flex-col text-richblack-5">
                <p className=" text-[0.875rem] leading-[1.375rem]">
                  Current Password
                  <sup className="text-red-700 font-semibold text-sm">*</sup>
                </p>
                <input
                  className=" py-1 px-2 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  type={viewCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter current password"
                  {...register("currentPassword", {required:true})}
                
                />
                <span
                  onClick={() => setViewCurrentPassword((prev) => !prev)}
                  className=" absolute right-4 top-[32px] cursor-pointer"
                >
                  {viewCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {/* input field errors */}
                {errors.currentPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your Current password.
                  </span>
                )}
              </label>
            </div>

            <div className=" flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="changePassword"
                className=" relative w-full flex gap-y-[3px] items-start flex-col text-richblack-5"
              >
                <p className=" text-[0.875rem] leading-[1.375rem]">
                Change Password
                <sup className="text-red-700 font-semibold text-sm">*</sup>
                </p>
                <input
                  type={viewNewPassword ? "text":"password"}
                  name="changePassword"
                  id="changePassword"
                  placeholder="Enter New Password "
                  {...register("changePassword",{required:true})}
                  className=" py-1 px-2 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                />
                {/* for eye icon */}
                <span
                  onClick={() => setViewNewPassword((prev) => !prev)}
                  className=" absolute right-4 top-[32px] cursor-pointer"
                >
                  {viewNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>

                {errors.changePassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your new password.
                  </span>
                )}
              </label>
            </div>
          </div>
          <div className="flex justify-items-end items-end gap-5 mt-3">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <BtnIcon type="submit" text="Update" />
            </div>
        </div>
      </form>
    </>
  );
}
