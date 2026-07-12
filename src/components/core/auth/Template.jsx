
// import LoginForm from "./LoginForm";
// import imgFrame from "../../../assets/Images/frame.png"
// import SignupForm from "./SignupForm";

// export default function Template ({
//   heading,
//   description1,
//   image,
//   formType,
// }) {

//     var loading = false;

//     return (
//         <div>
//         {loading ? (
//             <div className=" spinner"></div>
//         ) : (
//             <div className=" flex flex-row gap-20 justify-between items-center mx-auto max-w-maxContent pb-14  w-11/12 ">
//                 {/* text and form section */}
//                 <div className=" flex flex-col gap-5 items-start justify-center w-full max-w-[36%] pt-32">
//                     <div className=" flex flex-col gap-5 items-start ">
//                     <h1 className=" font-inter font-semibold text-3xl text-start">{heading}</h1>
//                     <p>{description1}</p>
//                     </div>
//                     <div className=" w-full items-start">
//                         {
//                             formType === "login" ? (<LoginForm/>): (<SignupForm/>)
//                         }
//                     </div>
//                 </div>
//                 {/* image section */}
//                 <div className=" relative mt-40">    
//                     <img src={imgFrame}/>
//                     <img src={image} 
//                         className=" absolute bottom-7 right-7"
//                     />
//                 </div>

//             </div>
//         )}
//         </div>
//     );
// };

import LoginForm from "./LoginForm";
import imgFrame from "../../../assets/Images/frame.png"
import SignupForm from "./SignupForm";

export default function Template ({
  heading,
  description1,
  image,
  formType,
}) {

    var loading = false;

    return (
        <div>
        {loading ? (
            <div className=" spinner"></div>
        ) : (
            <div className=" flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between items-center mx-auto max-w-maxContent pb-14  w-11/12 ">
                {/* text and form section */}
                <div className=" flex flex-col gap-5 items-start justify-center w-full lg:max-w-[36%] pt-8 lg:pt-32">
                    <div className=" flex flex-col gap-5 items-start ">
                    <h1 className=" font-inter font-semibold text-2xl sm:text-3xl text-start">{heading}</h1>
                    <p>{description1}</p>
                    </div>
                    <div className=" w-full items-start">
                        {
                            formType === "login" ? (<LoginForm/>): (<SignupForm/>)
                        }
                    </div>
                </div>
                {/* image section - hidden on mobile/tablet, shown on lg+ */}
                <div className=" hidden lg:block relative mt-40">    
                    <img src={imgFrame}/>
                    <img src={image} 
                        className=" absolute bottom-7 right-7"
                    />
                </div>

            </div>
        )}
        </div>
    );
};