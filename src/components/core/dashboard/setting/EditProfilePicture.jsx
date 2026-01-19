import { useDispatch, useSelector } from "react-redux";
import BtnIcon from "../../../common/BtnIcon";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import {updateDisplayPicture} from "../../../../services/operations/settingAPI"

export default function EditProfilePicture(){

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    console.log("inside edit DP Print User Object--->",user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    const fileInputRef = useRef(null);

    const clickHandler = () =>{
        fileInputRef.current.click();
    }

    const fileChangeHandler = (e) =>{
        const file = e.target.files[0];

        if(file){
            setImageFile(file)
            previewFile(file)
        }
    }

    // before update view
    const previewFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            setPreviewSource(reader.result)
        }
    }

    // file upload function dispatch data to backend call
    const fileUploadHandler = () =>{
        try{
            console.log("Loading... in fileUploader");
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", imageFile)
            console.log("formData -->", formData);
            dispatch(updateDisplayPicture(token, formData,navigate)).then(() =>{
                setLoading(false)
            })
        }
        catch(error){
            console.log("Error in file Uploading -", error.message);
        }
    }

    useEffect( () =>{
        if(imageFile){
            previewFile(imageFile)
        }
    },[imageFile]);

    return(
        <div className="flex items-center gap-x-8 justify-start rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 w-full">
            {/* for image */}
            <div className="flex items-center gap-x-4">
                <img
                    src={ previewSource || user?.userImage}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
            </div>
            {/* for text content */}
            <div className=" flex flex-col gap-5 ">
                {/* for heading */}
                <h2 className="text-lg font-semibold text-richblack-5">
                    Edit Profile Picture
                </h2>
                {/* for buttons */}
                <div className=" flex flex-row gap-6">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={fileChangeHandler}
                        className=" hidden"
                        accept="image/png, image/gif, image/jpeg"
                    />
                    <button
                        onClick={clickHandler}
                        disabled = {loading}
                        className=" cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Select
                    </button>
                    <BtnIcon
                        text={loading? "Uploading..." : "Upload"}
                        onclick={fileUploadHandler}
                    >
                        {!loading && (
                            <FiUpload className=" text-lg text-richblack-900"/>
                        )}
                    </BtnIcon>
                    
                </div>
            </div>
        </div>
    );
}