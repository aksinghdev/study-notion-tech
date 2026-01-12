import BtnIcon from "../../common/BtnIcon"


export default function LogoutDropdown({logoutData}){
    return(
        <div className="  mt- right-[-4]">
            <div className=" flex flex-col gap-4 items-center justify-center bg-richblack-700 py-2 px-2 rounded-md bg-rich
             text-richblack-25 ">
                <BtnIcon onclick={logoutData?.btn2Handler} text={logoutData?.btn2text} 
                customcss={"text-richblack-200 bg-transparent text-center"} />
                <BtnIcon onclick={logoutData?.btn1Handler} text={logoutData?.btn1text}
                    customcss={"text-richblack-200 bg-transparent text-center"}
                />
            </div>
            <div
            className="text-richblack-200 bg-transparent text-center "
            >

            </div>
        </div>
    )
}