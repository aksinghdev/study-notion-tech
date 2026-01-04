import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { lazy, use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";
import { ACCOUNT_TYPE } from "../../utils/constants";
// import { logOut } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // let token = null;
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  // console.log("Base Url",process.env.REACT_APP_BASE_URL);

  // const subLink = [
  //     {
  //         title: "python",
  //         link: "/catalog/python",
  //     },
  //     {
  //         title: "web-dev",
  //         link: "/catalog/web-dev",
  //     }
  // ]

  // console.log("token .....",token);
  let result;
  const [subLink, setSubLink] = useState([]);
  const getCatalog = async () => {
    try {
      result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("prnting sublink data-->", result);
      setSubLink(result.data.allCategories);
    } catch (error) {
      console.error(error);
      console.log("Category not found");
    }
  };
  useEffect(() => {
    getCatalog();
  }, []);
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // const handleLogout = () => {
  //   dispatch(logOut(navigate));
  // };
  return (
    <div className=" bg-richblack-800  justify-center flex w-full h-12 border-b-[1px] border-richblack-700  ">
      <div className=" w-11/12 flex items-center justify-between mx-auto max-w-maxContent bg-richblack- ">
        {/* Logo image */}
        <Link to={"/"}>
          <img src={logo} width={150} height={40} loading="lazy" alt="age" />
        </Link>
        <nav className=" mx-auto flex flex-row justify-between items-center">
          <ul className=" flex flex-row gap-x-3 items-center justify-center font-inter font-medium text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div>
                    <div className="relative group flex flex-row gap-x-1 items-center justify-center cursor-pointer">
                      <p>{link.title}</p>
                      <FaAngleDown />

                      <div
                        className="absolute left-[73%] top-[-40%] bg-richblack-25 text-richblack-900 invisible 
                                                        translate-x-[-30%] translate-y-[45%] rounded-md flex flex-col gap-3 p-3
                                                        lg:w-[280px] opacity-80 z-20 transition-all duration-200 group-hover:visible group-hover:opacity-100
                                                    "
                      >
                        <div
                          className="absolute right-[65%] top-[-15%] bg-richblack-25 text-richblack-900 invisible 
                                                        translate-x-[40%] translate-y-[45%] rounded-sm rotate-45 
                                                        w-8 h-8 opacity-80 z-10 transition-all duration-100 group-hover:visible group-hover:opacity-100
                                                    "
                        ></div>
                        {subLink.length ? (
                          subLink.map((link, index) => (
                            <Link to={`${link.link}`} key={index}>
                              <p className=" text-richblack-900">{link.name}</p>
                            </Link>
                          ))
                        ) : (
                          <div className="group-hover:opacity-0"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? " text-yellow-5"
                          : "text-richblack-25"
                      }
                                                 hover:text-richblack-100`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* login dashboard cart buttons */}

        <div className=" flex flex-row gap-x-4 items-center justify-between text-richblack-5">
          {user && user?.accoutType != ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to={"/dashboard/cart"} className=" relative">
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className=" bg-richblue-300 text-white text-center ">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button
                className=" bg-richblack-800 border-[1px] border-richblack-700 px-2 py-1 rounded-lg
                                 hover:text-richblack-100  hover:bg-richblack-700 transition-all duration-300"
              >
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button
                className=" bg-richblack-800 border-[1px] border-richblack-700 px-2 py-1 rounded-lg
                                 hover:text-richblack-100  hover:bg-richblack-700 transition-all duration-300"
              >
                Sign Up
              </button>
            </Link>
          )}
          {
            token != null && (
              // <button
              //   className=" bg-richblack-800 border-[1px] border-richblack-700 px-2 py-1 rounded-lg
              //                    hover:text-richblack-100  hover:bg-richblack-700 transition-all duration-300"
              //   // onClick={handleLogout}
              // >
              //   Log Out
              // </button>
              <ProfileDropDown/>
            )

          }
        </div>
      </div>
    </div>
  );
}

export default NavBar;
