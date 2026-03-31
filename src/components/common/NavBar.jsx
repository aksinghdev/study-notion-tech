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
import { logOut } from "../../services/operations/authAPI";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // let token = null;
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  console.log("Base Url",process.env.REACT_APP_BASE_URL);

  // const subLink = [
  //     {
  //         title: "python",
  //         link: "/catalog/python",
  //     },
  //     {
  //         title: "web-dev",
  //         link: "/catalog/web-dev",
  //     },
  //     {
  //         title: "web-dev",
  //         link: "/catalog/web-dev",
  //     },
  //     {
  //         title: "web-dev",
  //         link: "/catalog/web-dev",
  //     }
  // ]

  let result;
  const [subLink, setSubLink] = useState([]);
  const getCatalog = async () => {
    try {
      result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("prnting api result inside navbar data-->", result);
      setSubLink(result.data.data);
      console.log("prnting sublink data-->", subLink);

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

  
  return (
    <div className=" bg-richblack-800  justify-center flex w-full h-12 border-b-[1px] border-richblack-700  ">
      <div className=" w-11/12 flex items-center justify-between mx-auto max-w-maxContent bg-richblack- ">
        {/* Logo image */}
        <Link to={"/"}>
          <img src={logo} width={150} height={40} loading="lazy" alt="age" />
        </Link>
        {/* Navbar all pages buttons */}
        <nav className=" mx-auto flex flex-row justify-between items-center">
          <ul className=" flex flex-row gap-x-3 items-center justify-center font-inter font-medium text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div>
                    <div className="relative group flex flex-row gap-x-1 items-center justify-center cursor-pointer">
                      <p>{link.title}</p>
                      <FaAngleDown />
                      <>
                      { !subLink ? (<div className=" hidden">
                         No catalog data
                      </div>) : (
                         subLink.length > 0 && (
                        <div
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
                        bg-richblack-25 text-richblack-900 rounded-md 
                        flex flex-col gap-3 p-3 min-w-[200px] z-20
                        opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">

                          <div
                            className="absolute top-[-6px] left-1/2 -translate-x-1/2 
                          w-3 h-3 bg-richblack-25 rotate-45"
                          ></div>
                          {
                           
                              subLink.map((subItem, index) => (
                                <Link to={`${subItem.link}`} key={index}>
                                  <p className=" text-richblack-900">{subItem.name}</p>
                                </Link>
                              ))
                      
                          }
                        </div>
                       ) 
                      )
                        
                      }
                      </>
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
          {token != null && (
            <>
            {/* <button
              className=" bg-richblack-800 border-[1px] border-richblack-700 px-2 py-1 rounded-lg
                               hover:text-richblack-100  hover:bg-richblack-700 transition-all duration-300"
              onClick={handleLogout}
            >
              Log Out
            </button> */}
            <ProfileDropDown />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
