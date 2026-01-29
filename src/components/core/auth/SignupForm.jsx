
import { tabData } from "../../../utils/constants"; 
import { ACCOUNT_TYPE } from "../../../utils/constants"; 
import { useState } from "react";
import Tab from "../../common/Tab";
import countrycode from "../../../../src/data/countrycode.json"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";




export default function SignupForm(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [createPassword, setCreatePassword] = useState(false);
    const [createConfirmPassword, setCreateConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
      firstName:"",
      lastName:"",
      email: "",
      contactNumber:"",
      password:"",
      confirmPassword:"",
    })

    const{firstName, lastName, email, contactNumber, password, confirmPassword} = formData

    function ChangeHandler(e) {
      setFormData( (prevData) => ({
        ...prevData,
        [e.target.name] : e.target.value
      }) )
    }
    
    const submitHandler = (e) => {
      e.preventDefault();

      if(password !== confirmPassword){
        toast.error("Password do not match")
        return
      }
      // for signup data to be used in backend
      const signupData = {
        ...formData,
        accountType
      }

      // setting data to state
      dispatch(setSignupData(signupData))

      // send otp 
      dispatch(sendOtp(formData.email, navigate))
      // reset
      setFormData({
        firstName:"",
        lastName:"",
        email: "",
        contactNumber:"",
        password:"",
        confirmPassword:"",
      })

      setAccountType(ACCOUNT_TYPE.STUDENT)

    }

    return(
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
        <form className=" w-full flex flex-col gap-6 mt-2 items-center justify-center"
          onSubmit={submitHandler}
        >
          <div className=" w-full flex gap-4 flex-row justify-between items-center">
            <label className=" w-full flex gap-y-[3px] flex-col text-richblack-5">
            <p className=" mb-1 text-[0.875rem] leading-[1.375rem]">
              First Name
              <sup className="text-red-700 font-semibold text-sm">*</sup>
            </p>
            <input
              className=" py-1 px-2 text-richblack-200 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              required
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={firstName}
              onChange={ChangeHandler}
            />
            </label>
        
            <label className=" w-full flex gap-y-[3px] flex-col text-richblack-5">
            <p className=" text-[0.875rem] leading-[1.375rem]">
              Last Name
              <sup className="text-red-700 font-semibold text-sm">*</sup>
            </p>
            <input
              className=" py-1 px-2 text-richblack-200 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              required
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={lastName}
              onChange={ChangeHandler}
            />
            </label>
          </div>
          <label className=" w-full flex gap-y-[3px] flex-col text-richblack-5">
            <p className="  text-[0.875rem] leading-[1.375rem]">
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
            <label className=" w-full flex gap-y-[3px] flex-col text-richblack-5">
                <p className=" text-[0.875rem] leading-[1.375rem]">
              Phone Nomber
              <sup className="text-red-700 font-semibold text-sm">*</sup>
                </p>

                <div className=" flex flex-row gap-3">
                    <select
                        className=" py-1 px-2 text-richblack-200 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-[40%]"
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    >
                    {
                        countrycode.map( (item, index) =>(
                            <option key={index} value={item.country} className=" bg-richblack-900 text-richblack-200">
                                {/*  */}
                                <p className=" opacity-0 visible m-2 flex gap-5 flex-col ">
                                   <p className=" mx-2">{item.country}</p> 
                                   <p>{item.code}</p> 
                                </p>
                            
                            </option>
                        ) )
                    }

                    </select>
                    <input
                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    required
                    type="text"
                    placeholder="Enter Phone Number"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={ChangeHandler}
                    />
                </div>
            </label>
            {/* password creation */}
            <div className=" flex flex-row gap-4 justify-between items-center">
                <label className="w-full relative">
                            <p className=" text-[0.875rem] leading-[1.375rem]">
                              Create Password
                              <sup className="text-red-700 font-semibold text-sm">*</sup>
                            </p>
                            <input
                              className=" py-1 px-2 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
                              type={createPassword ? "text" : "password"}
                              style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              required
                              // type="text"
                              placeholder="Enter password"
                              name="password"
                              value={password}
                              onChange={ChangeHandler}
                            />

                            <span 
                              onClick={ ()=>setCreatePassword((prev)=> !prev)}
                              className=" absolute right-4 top-[30px] cursor-pointer"> 
                                {
                                  createPassword ? <FaEyeSlash/> : <FaEye/>
                                }
                            </span>
                </label>
                <label className="w-full relative">
                            <p className=" text-[0.875rem] leading-[1.375rem]">
                              Confirm Password
                              <sup className="text-red-700 font-semibold text-sm">*</sup>
                            </p>
                            <input
                              className=" py-1 px-2 text-start bg-richblack-800 rounded-lg border-richblack-700 border-b-[1px] w-full"
                              type={createConfirmPassword? "text" : "password"}
                              style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                              required
                              // type="text"
                              
                              placeholder="Enter password"
                              name="confirmPassword"
                              value={confirmPassword}
                              onChange={ChangeHandler}
                            />
                
                            <span 
                              onClick={ ()=>setCreateConfirmPassword((prev)=> !prev)}
                              className=" absolute right-4 top-[30px] cursor-pointer"> 
                                {
                                  createConfirmPassword ? <FaEyeSlash/> : <FaEye/>
                                }
                            </span>
                </label>
            </div>
            <button
            type="submit"
            className=" w-full  mt-6 rounded-xl bg-yellow-50 py-2 px-3 font-semibold text-richblack-900 
                   hover:scale-95 hover:bg-yellow-25"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
          >
            Create Account
          </button>

          
        </form>
      </div>
    </div>
    );
}



