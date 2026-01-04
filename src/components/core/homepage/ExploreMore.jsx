import { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore";
import HilightText from "../../common/HighlightText";
import ExploreCard from "./ExploreCard";

const tabsName =[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]




function ExploreMore (){

    const[currentTab, setcurrentTab] = useState(tabsName[0]);
    const[courses, setcurrentCourse] = useState(HomePageExplore[0].courses);
    const[currentCard, setcurrentCard] = useState(courses[0].heading);

    // console.log(courses);

    const setMyCards = (value) =>{
        setcurrentTab(value);
        const result = HomePageExplore.filter((element)=>element.tag === value)
        setcurrentCourse(result[0].courses);
        setcurrentCard(result[0].courses[0].heading);
        console.log(courses);
    }
    return(
        <div  className=" mt-20 flex items-center justify-center gap-10 flex-col mb-8 relative">
            <div className=" flex flex-col items-center gap-3">
                <h1 className=" text-pure-greys-5 text-center font-inter font-bold text-3xl">
                    Unlock the
                    <HilightText text={"Power of Code"}/>
                </h1>
                <p className=" text-richblack-300 font-inter font-medium text-base text-center">
                    Learn to Build Anything You Can Imagine
                </p>
            </div>
            <div className=" flex flex-row gap-2 items-center justify-center bg-richblack-800 text-richblack-300 rounded-full px-2 py-1 mb-20">
                {
                    tabsName.map( (element , index)=>{
                        return(
                            <div
                                className={ ` text-center font-inter font-medium cursor-pointer rounded-2xl transition-all duration-500 
                                 px-2 py-1 hover:bg-richblack-700 hover:text-richblack-50 ${currentTab === element ?
                                 "bg-richblack-900 text-pure-greys-50 hover:bg-richblack-900"  : " text-richblack-300"} `}
                                onClick={()=>{setMyCards(element)}}
                                key={index}
                            >
                                {element}
                            </div>
                        )
                    } )
                }
            </div>
            {/* cards that show the data */}
                <div className=" flex flex-row gap-9 justify-center mb-16 
                items-center text-start text-richblack-25 w-[76%]">
                {
                    courses.map( (course , index)=>{
                        // console.log("course-->", course);
                        return(
                            <ExploreCard
                                key={index}
                                cardData= {course}
                                currentCard= {currentCard}
                                setcurrentCard= {setcurrentCard}
                            />
                        )
                    })
                    
                }

            </div>

        </div>
    );
}

export default ExploreMore;