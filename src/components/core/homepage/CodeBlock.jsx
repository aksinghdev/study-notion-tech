
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export default function CodeBlock({position, heading, subheading, ctabtn1, ctabtn2, codeblock, bggradient, codecolor}){
    return(
        <div className= {`flex ${position} gap-16  w-[80%] justify-center items-center`}>
            <div className=" w-[50%]">
                {/* left text section */}
                <h1 className=" text-3xl font-bold">
                    {heading}
                </h1>
                <p className=" text-richblack-300 text-left font-medium mt-5">
                    {subheading}
                </p>
                <div className=" flex flex-row gap-6 mt-14">
                
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className=" flex flex-row gap-3 items-center justify-center">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                
                </div>
            </div>
            <div className=" flex flex-row w-[50%] p-1  rounded-md bg-bgcodegradient opacity-80 shadow-2xl text-left justify-start items-baseline relative">
                {/* right code setion */}
                <div className={` w-[320px] h-[210px] rounded-full opacity-30 blur-2xl absolute top-10 left-10 ring-transparent ${bggradient}`}>  {/*for bg gradient*/}

                </div> 
                <div className=" flex flex-col gap-1 text-center font-medium font-mono text-richblack-400 w-[10%]  bg-opacity-50">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                </div>
                    <div className={`font-mono w-[90%] flex flex-col gap-1 font-medium ${codecolor} h-fit bg-opacity-30`}>
                        <pre className=" whitespace-pre-wrap">
                            
                        <TypeAnimation
                            sequence={[codeblock, 1000, ""]}
                            repeat={Infinity}
                            omitDeletionAnimation= {true}
                            style={
                                {
                                    whiteSpace:"pre-line"
                                }
                            }
                        />
                        </pre>
                    </div>
            </div>

        </div>
    );
}