import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, Route } from "react-router-dom";
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

function NavBar(){
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
  
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect( () =>{
    ;( async() => {
      setLoading(true)
      try{
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        console.log("Print category result : ",result)
        setSubLinks(result?.data?.data);
      }catch(error){
        console.log("Couldn't fetch categories", error)
      }
      setLoading(false)
    })()
  },[])
    
  const matchRoute = (route) =>{
    return matchPath({path : route}, location.pathname )
  }

  console.log("Print subLinks : ",subLinks);
  
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
              
                <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <FaAngleDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>







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
