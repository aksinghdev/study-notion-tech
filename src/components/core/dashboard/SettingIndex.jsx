
import EditProfilePicture from "../dashboard/setting/EditProfilePicture";
import EditProfile from "../dashboard/setting/EditProfile"


export default function SettingIndex(){
    return(
        <div className="mt-20 text-center text-white mx-auto w-full">
            <EditProfilePicture/>
            
            <EditProfile/>
        </div>
    );
}