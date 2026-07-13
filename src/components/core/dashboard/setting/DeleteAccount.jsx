import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/settingAPI";

export default function DeleteAccount() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector( (state) => state.auth);
  
  async function handleDeleteAccount() {
    try{
      dispatch(deleteAccount(token,navigate))
    }
    catch(error){
      console.log("handle Delete account function error", error.message);
    }
  }

  return (
    <>
      <div className="my-8 lg:my-10 flex flex-col sm:flex-row items-center sm:items-start gap-y-4 gap-x-14 rounded-md border-[1px] border-pink-700 bg-pink-900 p-4 sm:p-8 sm:px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 flex-shrink-0">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col items-center sm:items-start justify-items-start space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="w-full sm:w-3/5 text-pink-25 text-center sm:text-start">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit mt-2 cursor-pointer italic text-pink-300"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  );
}