
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { PiCaretDownLight } from "react-icons/pi";

import LogoutDropdown from "./LogoutDropdown";
import UseOnClickOutside from "../../../hooks/UseOnclickOutside";
import { logOut } from "../../../services/operations/authAPI";

function ProfileDropDown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  UseOnClickOutside(ref, () => setDropDownOpen(false));

  // If user not loaded yet
  if (!user) return null;

  // Centralized handlers
  const handleDashboard = () => {
    navigate("/dashboard/my-profile");
    setDropDownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logOut(navigate));
    setDropDownOpen(false);
  };

  // Data passed to dropdown component
  const logoutData = {
    btn1text: "Dashboard",
    btn2text: "Logout",
    btn1Handler: handleDashboard,
    btn2Handler: handleLogout,
  };

  return (
    <div className="relative" ref={ref}>
      {/* Profile Button */}
      <button
        onClick={() => setDropDownOpen((prev) => !prev)}
        className="flex items-center gap-x-1 focus:outline-none"
      >
        <img
          src={user.userImage}
          alt={user.firstName}
          className="w-[35px] h-[35px] rounded-full object-cover"
        />
        <PiCaretDownLight className="text-sm text-richblack-100" />
      </button>

      {/* Dropdown */}
      {dropDownOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <LogoutDropdown logoutData={logoutData} />
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;








