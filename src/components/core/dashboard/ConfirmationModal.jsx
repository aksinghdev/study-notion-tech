import BtnIcon from "../../common/BtnIcon";


const ConfirmationModal = ({modaldata}) =>{

    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className=" w-11/12 max-w-[350px] flex flex-col gap-3 rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <p className=" text-richblack-5 text-center text-lg font-bold">
                    {modaldata.text1}
                </p>
                <p className=" text-richblack-25 text-center text-base font-semibold mb-2">
                    {modaldata.text2}
                </p>
                <div className=" flex flex-row gap-x-5 items-center justify-center">
                    <BtnIcon onclick={modaldata?.btn1Handler} text={modaldata?.btn1text} />
                    <BtnIcon onclick= {modaldata?.btn2Handler} text={modaldata?.btn2text} outline={true} />
                </div>

            </div>
        </div>
    );
}

export default ConfirmationModal;