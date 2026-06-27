import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants";

const InstructorRoute = ({ children }) => {
  const { user } = useSelector((state) => state.profile);

  if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
    return children;
  }

  return <Navigate to="/dashboard/my-profile" replace />;
};

export default InstructorRoute;
