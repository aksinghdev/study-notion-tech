
import { MdPeople } from "react-icons/md";
import { IoBook } from "react-icons/io5";

// shadow-[-15px_-15px_rgba(245,230,060,0.90)]
export default function ExploreCard({cardData, currentCard, setcurrentCard}){
    return(
        <div className={` bg-richblack-700 p-4 flex flex-col gap-5 cursor-pointer transition-all duration-200
             ${currentCard === cardData.heading ? "bg-white text-richblack-800 shadow-[15px_15px_rgba(245,230,060,0.90)]" :""}`}
             onClick={()=>{setcurrentCard(cardData.heading)}}>
            <h1 className={`  text-xl font-inter font-semibold `}>
                {cardData.heading}
            </h1>
            <p className={`
                 font-medium  text-richblack-500  `}>{cardData.description}</p>
        <div className={ `flex flex-row items-center justify-between mt-14 ${currentCard === cardData.heading ? "text-[#1ffffb9c]":""}` }>
                <div className=" flex flex-row gap-2 items-center">
                    <MdPeople />
                    <p>{cardData.level}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <IoBook />
                    <p>{cardData.lessionNumber} Lessons</p>
                </div>
            </div>
        </div>
    );
}