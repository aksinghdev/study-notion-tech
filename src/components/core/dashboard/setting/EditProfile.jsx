
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import BtnIcon from "../../../common/BtnIcon";
import countrycode from "../../../../data/countrycode.json"
import { updateProfile } from "../../../../services/operations/settingAPI"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector( (state) => state.profile)
    const {token} = useSelector( (state) => state.auth)

    const {
        register,
        handleSubmit,
        formState : {errors},
    } = useForm();

    const submitProfileForm = async (data) =>{
        console.log("profile form data--->",data);
        try{
            dispatch(updateProfile(token,data,navigate));
        }
        catch(error){
            console.log("submit profile form error",error.message);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                    <h2 className=" text-start flex items-start text-lg font-semibold text-richblack-5">
                        Profile Information

                    </h2>
                    {/* name */}
                    <div className=" flex flex-col gap-5 lg:flex-row">
                        <div className=" flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className=" w-full flex gap-y-[3px] items-start flex-col text-richblack-5">
                                First Name
                            
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                id="firstName"
                                {...register("firstName", {require: true})}
                                defaultValue={user?.firstName}
                                className=" py-1 px-2 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                            />
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your first name.
                                </span>
                            )}
                            <div className=" flex items-start text-xs text-richblack-200">
                                Name entered above will be used for all issued certifies.
                            </div>
                            </label>
                        </div>
                        
                        <div className=" flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className=" w-full flex gap-y-[3px] items-start flex-col text-richblack-5">
                                Last Name
                            
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                id="lastName"
                                {...register("lastName", {require: true})}
                                defaultValue={user?.lastName}
                                className=" py-1 px-2 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                            />
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your last name.
                                </span>
                            )}
                            
                            </label>
                        </div>
                        
                        
                    </div>
                    {/* DOB and Gender */}
                    <div className=" flex flex-col gap-5 lg:flex-row">
                        {/* date of birth */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dob"
                                className=" w-full flex gap-y-[3px] items-start flex-col text-richblack-5"
                            >
                            <p className=" mb-1 text-[0.875rem] leading-[1.375rem]">
                                Date of Birth
                                <sup className="text-red-700 font-semibold text-sm">*</sup>
                            </p>
                            <input
                                type="date"
                                name="dob"
                                id="dob"
                                placeholder="date of birth"
                                className=" py-1 px-2 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}

                                {...register("dob",{
                                    require:{
                                        value: true,
                                        message: "select date of birth from calender"
                                    },
                                    max:{
                                        value: new Date().toISOString().split("T")[0],
                                        message:"date of birth can not be in future"
                                    }
                                })}
                                defaultValue={user?.additionalDetails.dob}
                                />
                                {errors.dob && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dob.message}
                                    </span>
                                )}
                            </label>
                        </div>
                        {/* Gender */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dob"
                                className=" w-full flex gap-y-[3px] items-start flex-col text-richblack-5"
                            >
                                <p className=" mb-1 text-[0.875rem] leading-[1.375rem]">
                                    Gender
                                    <sup className="text-red-700 font-semibold text-sm">*</sup>
                                </p>
                            </label>
                            <select
                                type="text"
                                name="gender"
                                id="gender"
                                placeholder="Gender"
                                className=" py-1 px-4 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}

                                {...register("gender",{required: true})}
                                defaultValue={user?.additionalDetails.gender}
                            >
                                {
                                    genders.map((ele,i)=>{
                                        return(
                                            <option key={i} value={ele}>
                                                {ele}
                                            </option>
                                        )
                                    })
                                }

                            </select>
                                {errors.dob && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                     Please select your gender
                                    </span>
                                )}
                            
                        </div>

                    </div>
                    {/* phone No and Education */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* phone no  */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNo" className=" w-full flex gap-y-[3px] flex-col text-richblack-5">
                                <p className=" text-start text-[0.875rem] leading-[1.375rem]">
                                    Phone Nomber
                                    <sup className="text-red-700 font-semibold text-sm">*</sup>
                                </p>

                                <div className=" flex flex-row gap-3">
                                    <select
                                        className=" py-1 px-2 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-[40%]"
                                        style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    >
                                    {
                                        countrycode.map( (item, index) =>(
                                            <option key={index} value={item.country} className=" bg-richblack-900 text-richblack-200">
                                                {/*  */}
                                                <p className=" opacity-0 visible m-2">
                                                    {item.country}
                                                </p>
                                                {item.code}
                                            </option>
                                        ) )
                                    }

                                    </select>
                                    <input
                                    className=" py-1 px-2 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    name="contactNo"
                                    id="contactNo"
                                    {...register("contactNo",{required:true})}

                                    />
                                </div>
                            </label>
                        </div>
                        {/* Education */}
                        <div className=" flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="highestEducation" className=" w-full flex gap-y-[3px] items-start flex-col text-richblack-5">
                                Education
                            <input
                                type="text"
                                name="highestEducation"
                                placeholder="Enter Your Highest Education"
                                id="highestEducation"
                                {...register("highestEducation")}
                                defaultValue={user?.additionalDetails?.highestEducation}
                                className=" py-1 px-2 text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                            />
                            {/* {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your last name.
                                </span>
                            )} */}
                            
                            </label>
                        </div>
                    </div>
                
                    <div >
                        
                        <div className=" flex flex-col gap-2 w-full ">
                                    <label htmlFor="about" className=" w-full flex gap-y-[3px] items-start flex-col text-richblack-5">
                                        About You
                                    <textarea
                                        type="textarea"
                                        name="about"
                                        placeholder="Write something about you..."
                                        id="about"
                                        {...register("about", {
                                        required: true,
                                        minLength: {
                                        value: 20,
                                        message: "Minimum 20 characters required",
                                        },
                                        maxLength: {
                                        value: 300,
                                        message: "Maximum 1000 characters allowed",
                                        },
                                        })}
                                        defaultValue={user?.additionalDetails?.about}
                                        className=" py-1 px-2 min-h-[100px] text-richblack-200 text-start bg-richblack-600 rounded-lg border-richblack-700 border-b-[1px] w-full"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                    />
                                    {errors.about && (
                                        <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please write something about you.
                                        </span>
                                    )}
                                    <div className=" flex items-start text-xs text-richblack-200">
                                        Write something about you to introduce more.
                                    </div>
                                    </label>
                        </div>
                    </div>
                </div>
                <div className=" flex justify-items-end items-end gap-3 flex-row">
                    <button
                        onClick={()=>{
                            navigate("/dashboard/my-profile");
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <BtnIcon text="Save" type="submit"/>
                </div>
            </form>
        
        </>
    );
}

