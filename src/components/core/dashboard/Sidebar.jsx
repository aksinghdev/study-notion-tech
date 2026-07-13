import react, { useState } from "react";
import {sidebarLinks} from '../../../data/dashboard-links';
import { useSelector } from "react-redux";
import SidebarLinks from './SidebarLinks';
import ConfirmationModal from "../../common/ConfirmationModal";
import LogOut from "./LogOut";
import { FiMenu, FiX } from "react-icons/fi";


const Sidebar = () =>{

    const {user, loading: profileLoading} = useSelector( (state) => state.profile);
    const { loading: authLoading} = useSelector( (state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);


    if(profileLoading || authLoading){
        return(
            <div>
                Loading...
            </div>
        );
    }


    const sidebarContent = (
        <>
            <div className=" flex flex-col">
                {
                    sidebarLinks.map( (link) => {
                        if(link.type && user?.accountType !== link.type) return null;

                        return(
                            // dought untill test
                            <SidebarLinks key={link.id} link={link} iconName={link.icon} onClick={() => setMobileOpen(false)} /> 
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
                onClick={() => setMobileOpen(false)}
                />

                <LogOut confirmationModal={confirmationModal} setConfirmationModal={setConfirmationModal} />
            </div>

            {confirmationModal && <ConfirmationModal modaldata={confirmationModal} />}
        </>
    );

    return(
        <>
            {/* Mobile top bar with hamburger - visible only below lg */}
            <div className=" lg:hidden flex items-center justify-between px-4 py-3 bg-richblack-300 border-b-[1px] border-richblack-700">
                <p className=" font-semibold text-richblack-900">Dashboard Menu</p>
                <button onClick={() => setMobileOpen(!mobileOpen)} className=" text-2xl text-richblack-900">
                    {mobileOpen ? <FiX/> : <FiMenu/>}
                </button>
            </div>

            {/* Mobile slide-in drawer */}
            {mobileOpen && (
                <div className=" lg:hidden fixed inset-0 z-[1300] flex">
                    <div className=" w-[75%] max-w-[280px] h-full bg-richblack-300 p-6 flex flex-col gap-1 overflow-y-auto">
                        {sidebarContent}
                    </div>
                    <div className=" flex-1 bg-black/50" onClick={() => setMobileOpen(false)}></div>
                </div>
            )}

            {/* Desktop static sidebar - hidden below lg */}
            <div className=" hidden lg:block h-full">
                <div className=" min-w-[222px] lg:w-[100%] h-full p-8 flex flex-col gap-1 border-r-[1px] bg-richblack-300 border-r-richblack-700">
                    {sidebarContent}
                </div>
            </div>
        </>
    );
}

export default Sidebar;