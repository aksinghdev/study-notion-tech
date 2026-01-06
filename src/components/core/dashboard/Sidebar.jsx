
import react, { useState } from "react";
import {sidebarLinks} from '../../../data/dashboard-links';
import { useSelector } from "react-redux";
import SidebarLinks from './SidebarLinks';
import ConfirmationModal from "./ConfirmationModal";
import LogOut from "./LogOut";


const Sidebar = () =>{

    const {user, loading: profileLoading} = useSelector( (state) => state.profile);
    const { loading: authLoading} = useSelector( (state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);


    if(profileLoading || authLoading){
        return(
            <div>
                Loading...
            </div>
        );
    }


    return(
        <div className=" h-full">
            <div className=" min-w-[222px] lg:w-[100%] h-full p-8 flex flex-col gap-1 border-r-[1px] bg-richblack-300 border-r-richblack-700">
                <div className=" flex flex-col">
                    {
                        sidebarLinks.map( (link) => {
                            if(link.type && user?.accountType !== link.type) return null;

                            return(
                                // dought untill test
                                <SidebarLinks key={link.id} link={link} iconName={link.icon}  /> 
                            );
                        })
                    }
                </div>
                {/* for line */}
                <div className=" w-11/12 mx-auto my-6 h-[1px] bg-richblack-600"> </div>
                
                {/* for settings and logOut tab */}
                <div className={` flex flex-col gap-y-3`  }>
                    <SidebarLinks
                    link={{name:"Settings", path:"/dashboard/settings"}}
                    iconName="VscSettingsGear"
                    />

                    <LogOut confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} />
                </div>

                {confirmationModal && <ConfirmationModal modaldata={confirmationModal} />}
            </div>
        </div>
    );
}

export default Sidebar;