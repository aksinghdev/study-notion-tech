import "./App.css";

import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/common/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OpenRoute from "./components/core/auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetComplete from "./pages/ResetComplete";
import About from "./pages/About";
import ContactUs from './pages/ContactUs'
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import MyProfile from "./components/core/dashboard/MyProfile";
import MyCourses from "./components/core/dashboard/MyCourses";
import MyDashboard from "./components/core/dashboard/MyDashboard";
import Setting from "./components/core/dashboard/Setting";
import AddCourses from "./components/core/dashboard/AddCourses";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import PurchaseHistory from "./components/core/dashboard/PurshesHistory";


function App() {
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {/* navbar section */}
      <NavBar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />
        {/* <Route path="/dashboard/my-profile" element={<MyProfile/>} /> */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUp/>
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
         <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              {/* <ForgotPassword/> */}
              <UpdatePassword/>
            </OpenRoute>
          }
        />

         <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

         <Route
          path="/reset-complete"
          element={
            <OpenRoute>
              <ResetComplete/>
            </OpenRoute>
          }
        />

        <Route path="/dashboard" element={<Dashboard/>} >
          {/* <Route index element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
            } /> */}
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="instructor" element={<MyDashboard />} />
          <Route path="settings" element={<Setting/>} />
          <Route path="add-courses" element={<AddCourses/>} />
          <Route path="enrolled-courses" element={<EnrolledCourses/>} />
          <Route path="purchase-history" element={<PurchaseHistory/>} />
        </Route>
         
      </Routes>
    

    </div>
  );
}

export default App;


// <link rel="icon" type="image/png" href="../public/Logo-Small-Light.png" />