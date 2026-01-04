
import { useDispatch, useSelector } from "react-redux";
import { Link ,useLocation,useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { PiCaretDownLight } from "react-icons/pi";
// import ConfirmationModal from "../dashboard/ConfirmationModal";
import LogoutDropdown from "./LogoutDropdown";

import UseOnClickOutside from "../../../hooks/UseOnclickOutside";
import { logOut } from "../../../services/operations/authAPI";


function ProfileDropDown (){

    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [dropDownOpen, setDropDownOpen] = useState(false);
    // const [confirmLogout, setConfirmLogout] = useState(false);
    const ref = useRef(null);

    // console.log("User object-->",user);

    // to out side click then close dropdown
    UseOnClickOutside(ref, () => setDropDownOpen(false));

    // for Logout function
    const handleLogout = async () =>{
        dispatch(logOut(navigate));
        setDropDownOpen(false)
    }

    // logout dropdown data
    const logoutData ={
        btn1text : "Dashboard",
        btn2text : "Logout",
        btn2Handler: () => dispatch(logOut(navigate)),
        btn1Handler : ""
    }

    // reset dropdown after route change
    
    useEffect(() => {
        setDropDownOpen(false);
        }, [location.pathname]);


    // if user not found then return null
    if(!user){
        return null;
    }
    // if user exist then return its profile

    return (
        <div className="relative "
            ref={ref}
        >
            <div onClick={()=> setDropDownOpen((prev) => !prev)}
            className=" relative"
            >
                <div className="  flex mx-auto flex-row items-center justify-center gap-x-1  text-richblack-50 mt-0">
                    <img
                    src={user?.Image}
                    alt={`${user?.firstName}`}
                    className="aspect-square w-[35px] rounded-full object-cover "
                    />
                    <PiCaretDownLight className="text-sm text-richblack-100" />
                </div>
                {/* {       
                    dropDownOpen && (
                        <div
                            // onClick={(e) => e.stopPropagation()}
                            // ref={ref}
                        className=" flex flex-col gap-y-5 p-2 rounded-lg  absolute mr-3 mt-1 bg-richblack-600 text-richblack-50">
                            <Link to="/dashboard/my-profile" 
                            onClick={(e) => {
                                console.log("🧭 Dashboard link clicked");
                                e.stopPropagation()
                                setDropDownOpen(false)
                            }
                        } 
                            // ref={ref}
                            className="my-4 hover:bg-richblack-400 cursor-pointer"
                            >
                                <div className="flex flex-row items-center justify-center gap-x-2">
                                    <VscDashboard/>
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                            
                                <button
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        console.log("Logout clicked");
                                        dispatch(logOut(navigate));
                                        setDropDownOpen(false)
                                    }}
                                    className=" flex flex-row gap-x-2 justify-start items-center text-left"
                                >
                                    <VscSignOut/>
                                    <span>LogOut</span>
                                </button>
                            
                        </div>
                    )
                } */}


                {
                    dropDownOpen && (
                        <LogoutDropdown logoutData={logoutData}/>
                    )
                }






            </div>
        </div>
    );
}

export default ProfileDropDown;