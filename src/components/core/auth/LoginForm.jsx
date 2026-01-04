import { useState } from "react";
import { ACCOUNT_TYPE } from "../../../utils/constants"; 
import { tabData } from "../../../utils/constants"; 
import Tab from "../../../components/common/Tab";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import CTAButton from "../../homepage/Button";
import { useDispatch } from "react-redux";
import { loginApiCall } from "../../../services/operations/authAPI";

export default function LoginForm() {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setshowPassword] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] =useState({ 
    email:"",
    password:"",
  });

  const {email, password} = formData
  // console.log("Print Login form data--",formData);
  // console.log(accountType);

  const ChangeHandler = (e)=>{
    setFormData( (prevData) =>({
      ...prevData,
      [e.target.name] : e.target.value
    } ))
  }

  
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginApiCall(email, password, accountType, navigate));
    // console.log("print to send email", email, password);
  }



  // const tabData = [
  //   {
  //     id: 1,
  //     tabName: "Student",
  //     type: ACCOUNT_TYPE.STUDENT,
  //   },
  //   {
  //     id: 2,
  //     tabName: "Instructor",
  //     type: ACCOUNT_TYPE.INSTRUCTOR,
  //   },
  // ];

  return (
    <div className=" bg-richblack900 w-full flex mx-auto items-start ">
      <div className="  flex flex-col items-start justify-between w-full">
        {/* student or instructor button selector */}
        <div className=" mb-4">
          <Tab
            tabdata={tabData}
            accountType={accountType}
            setAccountType={setAccountType}
          />
        </div>
        {/* form section */}
        <form className=" w-full flex flex-col gap-3 items-center justify-center"
        
          onSubmit={HandleSubmit}
        >
          <label className=" w-full flex gap-y-[3px] flex-col text-richblack-5">
            <p className=" mb-1 text-[0.875rem] leading-[1.375rem]">
              Email Address
              <sup className="text-red-700 font-semibold text-sm">*</sup>
            </p>
            <input
              className=" py-1 px-2 text-richblack-200 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              required
              type="email"
              placeholder="Enter email address"
              name="email"
              value={email}
              onChange={ChangeHandler}
            />
          </label>

          <label className="w-full relative">
            <p className=" mb-1 text-[0.875rem] leading-[1.375rem]">
              Password
              <sup className="text-red-700 font-semibold text-sm">*</sup>
            </p>
            <input
              className=" py-1 px-2 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
              type={showPassword? "text" : "password"}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              required
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={ChangeHandler}
            />

            <Link to="/forgot-password">
              <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                Forgot Password
              </p>
            </Link>
            <span 
              onClick={ ()=>setshowPassword((prev)=> !prev)}
              className=" absolute right-4 top-[34px]"> 
                {
                  showPassword ? <FaEyeSlash/> : <FaEye/>
                }
            </span>
          </label>

          <button
            type="submit"
            className=" w-full  mt-6 rounded-xl bg-yellow-50 py-2 px-3 font-semibold text-richblack-900 
                   hover:scale-95 hover:bg-yellow-25"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
