import "./App.css";

import {Routes, Route, Navigate} from "react-router-dom";
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
import InstructorRoute from "./components/core/auth/InstructorRoute";
import StudentRoute from "./components/core/auth/StudentRoute";
import MyProfile from "./components/core/dashboard/MyProfile";
import MyCourses from "./components/core/dashboard/MyCourses";
import MyDashboard from "./components/core/dashboard/MyDashboard";
import SettingIndex from "./components/core/dashboard/SettingIndex";
import AddCourseIndex from "./components/core/dashboard/courses/addCourse/AddCourseIndex";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import PurchaseHistory from "./components/core/dashboard/PurshesHistory";
import CartIndex from "./components/core/dashboard/Cart/CartIndex";
function App() {

  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {/* navbar section */}
      <NavBar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />
        {/* <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} /> */}

        {/* Open Route - only for non logged in user */}
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
          // path="/update-password/:id"
          element={
            <OpenRoute>
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

        
        {/* Private Route - only for Logged IN users */}

        {/* All dashboard routes */}
        <Route 
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
         >
          <Route index element={<Navigate to="my-profile" replace />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<SettingIndex/>} />

          <Route
            path="instructor"
            element={
              <InstructorRoute>
                <MyDashboard/>
              </InstructorRoute>
            }
          />
          <Route
            path="my-courses"
            element={
              <InstructorRoute>
                <MyCourses/>
              </InstructorRoute>
            }
          />
          <Route
            path="add-course"
            element={
              <InstructorRoute>
                <AddCourseIndex/>
              </InstructorRoute>
            }
          />

          <Route
            path="cart"
            element={
              <StudentRoute>
                <CartIndex/>
              </StudentRoute>
            }
          />
          <Route
            path="enrolled-courses"
            element={
              <StudentRoute>
                <EnrolledCourses/>
              </StudentRoute>
            }
          />
          <Route
            path="purchase-history"
            element={
              <StudentRoute>
                <PurchaseHistory/>
              </StudentRoute>
            }
          />
        </Route>
         
      </Routes>
    

    </div>
  );
}

export default App;


// <link rel="icon" type="image/png" href="../public/Logo-Small-Light.png" />