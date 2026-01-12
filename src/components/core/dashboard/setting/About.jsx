
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BtnIcon from "../../../common/BtnIcon";

export default function About(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector( (state) => state.profile)
    const {token} = useSelector( (state) => state.auth)

    const {
        register,
        handleSubmit,
        formState : {errors},
    } = useForm();


    return(
        <>
        <form>
            <div >
                <h2 className=" text-start flex items-start text-lg font-semibold text-richblack-5 w-full">
                    About

                </h2>
                <div className=" flex flex-col gap-2 w-full ">
                            <label htmlFor="about" className=" w-full flex gap-y-[3px] items-start flex-col text-richblack-5">
                                Introduce yourself further
                            <textarea
                                type="textarea"
                                name="about"
                                placeholder="Enter First Name"
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
            {/* <div className=" flex justify-items-end items-end gap-3 flex-row">
                    <button
                        onClick={()=>{
                            navigate("/dashboard/my-profile");
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <BtnIcon text="Save" type="submit"/>
            </div> */}
        </form>
        
        
        
        </>
    );
}