import React from "react";
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineimage from '../../../assets/Images/TimelineImage.png'

const timeline =[
  {
    logo: logo1,
    heading :"Leadership",
    description:"Fully committed to the success company",
  },
  {
    logo: logo2,
    heading :"Responsibility",
    description:"Students will always be our top priority",
  },
  {
    logo: logo3,
    heading :"Flexibility",
    description:"The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading :"Solve the problem",
    description:"Code your way to a solution",
  },
]

export default function TimelineSection(){
    return(
        <div className=" flex flex-row gap-20 justify-between items-center ">
            <div className=" flex flex-col gap-10 items-start justify-evenly w-[45%]">
              {
                timeline.map( (element, index) =>{
                  return(
                    <div className=" flex flex-row gap-10 items-start relative" key={index}>
                      <div className=" w-[55px] h-[55px] bg-white items-center flex justify-center p-4 rounded-full">
                        <img src={ element.logo}  width='30px'/>
                      </div>
                      <div className={`w-[55px] ${(index==3) ? 'opacity-0' : 'opacity-100'}`}>
                        <p className=" w-8 h-[1px] rotate-90 border border-dashed absolute top-20 left-[11px]
                         border-richblack-100 my-[-6px] "></p>
                      </div>
                      <div className=" flex flex-col gap-1 text-start justify-center">
                        <h2 className=" text-lg font-semibold text-richblack-800">{element.heading}</h2>
                        <p className=" text-richblack-700 font-inter text-base">{element.description}</p>

                      </div>
                    </div>
                  )
                }

                )
              }
            </div>
            <div className=" relative shadow-richblue-200 flex justify-center items-center">
                <img src={timelineimage} className=" h-fit z-10"/>
              <div className=" w-[655px] h-[420px] rounded-full blur-2xl bg-blue-300 absolute top-8 right-0 opacity-60">
              </div>
              <div className=" w-[70%] flex flex-row gap-12 bg-caribbeangreen-700 absolute bottom-[-37px] z-20 p-6 items-center justify-items-center">
                <div className=" flex flex-row text-center justify-center items-center gap-4">
                  <h2 className=" text-richblack-5 text-4xl font-inter font-bold"> 10</h2>
                  <p className=" text-sm text-start font-inter text-caribbeangreen-300">YEARS EXPERINECE</p>
                </div>
                <div className=" w-16 h-[1px] border border-caribbeangreen-500 rotate-90 bg-caribbeangreen-200"></div>
                <div className=" flex flex-row text-center justify-center gap-4">
                  <h2 className="text-richblack-5 text-4xl font-inter font-bold">250</h2>
                  <p className="text-sm text-start font-inter text-caribbeangreen-300">
                    TYPES OF COURSES
                  </p>
                </div>

              </div>

            </div>
        </div>
    );
}