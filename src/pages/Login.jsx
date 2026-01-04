

import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/auth/Template";
import HilightText from "../components/common/HighlightText";


function Login(){
  return(
    <div className=" w-full bg-richblack-900 text-richblack-5 mx-auto ">
      <Template 
        heading="Welcom Back"
        description1={
          <>
          Build skills for today, tomorrow, and beyond.{<HilightText text={"𝐸𝒹𝓊𝒸𝒶𝓉𝒾𝑜𝓃 𝓉𝑜 𝒻𝓊𝓉𝓊𝓇𝑒-𝓅𝓇𝑜𝑜𝒻 𝓎𝑜𝓊𝓇 𝒸𝒶𝓇𝑒𝑒𝓇."} color=" text-blue-200"/>}
          </>
        }
        image= {loginImg}
        formType= "login"
      />
      
    </div>
  );
}

export default Login;

