import { useSelector } from "react-redux";
import BtnIcon from "../../../common/BtnIcon";
import { useNavigate } from "react-router-dom";

export default function EditProfilePicture(){

    const {user} = useSelector((state) => state.profile);
    console.log("Print User Object--->",user);
    const navigate = useNavigate();



    return(
        <div className="flex items-center gap-x-8 justify-start rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 w-full">
            {/* for image */}
            <div className="flex items-center gap-x-4">
                <img
                    src={user?.Image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
            </div>
            {/* for text content */}
            <div className=" flex flex-col gap-5 ">
                {/* for heading */}
                <h2 className="text-lg font-semibold text-richblack-5"
                >Edit Profile Picture</h2>
                {/* for buttons */}
                <div className=" flex flex-row gap-x-6 items-center justify-center border-l">
                    <BtnIcon
                        text="Save"
                        onclick={() => {
                        navigate("")
                        }}
                        btncss={" bg-yellow-50 flex justify-center items-center flex-row gap-2 px-5 py-2 rounded-md text-richblack-900"}
                    >
                    </BtnIcon>
                    <BtnIcon
                        text="Cancel"
                        onclick={() => {
                        navigate("")
                        }}
                        customcss={"bg-richblack-700 border-richblack-600 border-solid flex justify-center items-center flex-row gap-2 px-5 py-2 rounded-md "}
                    >
                    </BtnIcon>
                    
                </div>
            </div>
        </div>
    );
}