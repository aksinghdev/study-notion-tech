
import ContactForm from '../contact Us/ContactForm'

export default function ContactFormSection(){
    return(
        <div className=" flex flex-col gap-6 items-center justify-center">
            <div className=" flex flex-col gap-4 justify-center items-center mb-5">
                <h1 className=" text-3xl font-semibold text-richblack-5">
                    Get in Touch
                </h1>
                <p className=" text-richblack-300 font-inter font-medium">
                    We’d love to here for you, Please fill out this form.
                </p>
            </div>
            {/* form  */}
            <ContactForm/>
        </div>
    );
}