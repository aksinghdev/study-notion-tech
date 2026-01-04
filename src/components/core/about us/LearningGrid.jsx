
import { data } from "react-router-dom";
import {LearningGridArray} from "../../../data/LearningGridData";
import HighlightText from "../../common/HighlightText"
import CTAButton from "../homepage/Button"

function LearningGrid (){
    return(
        <div className=" grid lg:grid-cols-4 text-white mt-20 p-5">
            {
                LearningGridArray.map( (card, index)=>(
                    <div
                        key={index}
                        className= {`${index === 0 && "lg:col-span-2 bg-transparent"}
                            ${card.order % 2 ===1 ? "bg-richblack-700" : "bg-richblack-800" }
                            ${card.order === 3 && "lg:col-start-2"} 
                        `}
                    >
                        {
                            card.order < 0 ? (
                                <div className=" flex flex-col text-start items-start justify-center gap-3   w-[85%]  ml-16 p-8 lg:h-[290px] ">
                                    <div className=" flex flex-col gap-0 items-start justify-center text-center text-2xl font-semibold"> 
                                        <h1 className=" ">
                                            {card.heading}
                                        </h1>
                                        <HighlightText text={card.highlightText}/>
                                    </div>
                                    <p className=" text-richblack-200 text-sm font-inter font-normal">
                                        {card.description}
                                    </p>
                                    <div className="mt-2">
                                        <CTAButton
                                            linkto={"/"}
                                            active={true}
                                            children={"Learn More"}
                                        />
                                    </div>
                                </div>
                            ):
                            (
                                <div className="p-8 pr-12 lg:h-[290px] w-[94%] flex flex-col gap-5 ">
                                    <h1 className=" text-lg font-semibold">
                                        {card.heading}
                                    </h1>
                                    <p className=" text-richblack-200 text-sm font-inter font-normal">
                                        {card.description}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default LearningGrid;