import React from "react";
import { Link } from "react-router-dom";


function CTAButton({children, active, linkto}){
    return(
        <Link to={linkto}>
            <div className={`text-center font-bold px-6 py-3 rounded-md hover:scale-95 transition-all duration-150 min-w-fit w-fit
                 border-b border-r border-richblack-400 ${active ? " bg-yellow-100 text-richblack-900":" bg-richblack-800 text-richblack-5"}`}>
                {children}
            </div>
        </Link>
    );
}

export default CTAButton;