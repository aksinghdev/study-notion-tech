import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countryCode from '../../../data/countrycode.json' 



export default function ContactForm(){

    const [loading, setLoading] = useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}

    }=useForm();

    const submitForm = async (data) =>{
        console.log("Logging form data ", data);

        try{
            setLoading(true)

            const responce = {status:"OK"}
            console.log("Print form status", responce);
            setLoading(false);
        }
        catch(error){
            console.log("contact form error:", error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                firstName:"",
                lastName:"",
                email:"",
                phoneNo:"",
                message:"",
            })
        }
    }, [reset, isSubmitSuccessful]);


    return(

        <form onSubmit={handleSubmit(submitForm)}
         className=" text-richblack-5 text-sm flex flex-col gap-5">
            {/* clint name */}
            <div className=" flex flex-col lg:flex-row gap-5 justify-center items-center w-full">
                {/* firstname */}
                <div className=" flex flex-col gap-0 w-full">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        className=" rounded-md bg-richblack-800 py-2 px-2 text-richblack-200 text-start border-b-[1px] border-richblack-700"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First name"
                        {...register("firstName", {required: true})}
                    />
                    {
                        errors.firstName && (
                            <span>
                                Please enter your Name
                            </span>
                        )
                    }
                </div>
                {/* lastname */}
                <div className=" flex flex-col gap-0 w-full">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        className=" rounded-md bg-richblack-800 py-2 px-2 text-richblack-200 text-start border-b-[1px] border-richblack-700"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        type=" text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter Last Name"
                        {...register("lastName")}
                    />
                </div>

            </div>
            {/* email */}
            <div className=" flex flex-col gap-0">
                    <label htmlFor="email">Email</label>
                    <input
                        className=" rounded-md bg-richblack-800 py-2 px-2 text-richblack-200 text-start border-b-[1px] border-richblack-700"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        type=" email"
                        name="email"
                        placeholder="Enter Email"
                        id="email"
                        {...register("email", {required: true})}
                    />
                    {
                        errors.email && (
                            <span>
                                Please Enter Email
                            </span>
                        )
                    }
            </div>
                {/* Phone No */}
                <div>
                    <label htmlFor="phoneNo">Phone Number</label>
                    <div className=" flex flex-row gap-4 w-full">
                        <select
                            name="dropDown"
                            id="dropDown"
                            {...register("countryCode", {required: true})}
                            className=" w-[30%] rounded-md bg-richblack-800 py-2 px-2 text-richblack-200 text-start border-b-[1px] border-richblack-700"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        >
                            {
                                countryCode.map( (element, index) =>{
                                    return(
                                        <option key={index} value={element.code}>
                                            {element.code}-{element.country}
                                        </option>
                                    )
                                } )
                            }

                        </select>
                            <input
                                className=" w-full rounded-md bg-richblack-800 py-2 px-2 text-richblack-200 text-start border-b-[1px] border-richblack-700"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                            
                                type=" number"
                                name="phoneNo"
                                id="phoneNo"
                                placeholder="12345 67890"
                                {...register("phoneNo",{
                                    required:{value: true, message:"Please Enter Phone no"},
                                    minLength:{value:8, message:"invalid phone No"},
                                    maxLength:{value:10, message:"invalid phone No"}
                                    
                                    }
                                )}
                            />
                        {
                            errors.phoneNo && (
                                <span>
                                    Please Enter phone number
                                </span>
                            )
                        }
                    </div>
                </div>
                {/* message area */}
                <div className=" flex flex-col my-5">
                    <label>Message</label>
                    <textarea
                        className=" rounded-md bg-richblack-800 py-2 px-2 text-richblack-200 text-start border-b-[1px] border-richblack-700"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        id="message"
                        name="message"
                        rows={5}
                        cols={40}
                        {...register("message",{required: true})}
                    />
                </div>

                {/* send button */}
                
                <button type="submit"
                
                style={{
                    boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.5)",
                }}
                className=" bg-yellow-50 w-full text-center font-semibold text-richblack-900 rounded-md p-2 hover:bg-yellow-200 transition-all duration-300"> 
                    Send Message
                </button>
                          
        </form>
    );
}