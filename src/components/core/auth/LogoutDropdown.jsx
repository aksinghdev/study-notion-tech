import BtnIcon from "../../common/BtnIcon"


export default function LogoutDropdown({logoutData}){
    return(
        <div className=" absolute right-0 mt-2 z-50 ">
            <div className=" flex flex-col gap-4 bg-richblack-700 py-2 px-3 rounded-md w-full
             text-richblack-25 ">
                <BtnIcon onclick={logoutData?.btn2Handler} text={logoutData?.btn2text} 
                customcss={"text-richblack-200 bg-transparent text-center cursor-pointer"} />
                <BtnIcon onclick={logoutData?.btn1Handler} text={logoutData?.btn1text}
                    customcss={"text-richblack-200 bg-transparent text-center cursor-pointer"}
                />
            </div>
            {/* <div
            className="text-richblack-200 bg-transparent text-center "
            >
            </div> */}
        </div>
    )
}