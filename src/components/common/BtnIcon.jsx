

const BtnIcon = ({
    text,
    onclick,
    disabled,
    children,
    outline= false,
    type,
    customClasses,
    btncss,
    customcss = false
    }) =>{

        return(
            <button
                type={type}
                onClick={onclick}
                disabled={disabled}
                btncss = {btncss}
                className= {  customcss ? `${customcss}` :`  flex items-center 
                    ${outline ?" border border-yellow-50 bg-transparent text-richblack-5" : " bg-yellow-50 text-richblack-900"}
                 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold  ${customClasses}
                    `}
            >
                {
                    children ? (
                        <div className={`${btncss ? (btncss): ""} ${outline && "text-yellow-50"}`}>
                            <span>
                                {text}
                            </span>
                            {children}
                        </div>
                    ) : (text)
                }
            </button>
        );
}

export default BtnIcon;