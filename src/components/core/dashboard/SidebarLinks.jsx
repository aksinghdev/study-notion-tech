
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, matchPath } from 'react-router-dom';


const SidebarLinks = ({link, iconName}) =>{

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) =>{
        // return matchRoute({path:route}, location.pathname);
        return matchPath(route, location.pathname) !== null;
    }
    // const matchRoute = (route) =>{
    //     return matchRoute({path:route}, location.pathname);
    // }


    return(
        <NavLink
        to={link.path}
        className={`${matchRoute(link.path) ? "bg-yellow-400":"bg-opacity-0"} relative p-8 text-sm font-medium`}
        >
            {/* for left side yello border */}
            <span className={`absolute left-0 top-0 w-[0.2rem] h-full bg-yellow-50 ${matchRoute(link.path) ? "opacity-100":" opacity-0"}`}>
            </span>
            {/* for content with icon */}
            <div className=' flex flex-row items-center gap-x-2'>
                <Icon className=" text-lg"/>
                <span>{link.name}</span>

            </div>
        </NavLink>
    );
}

export default SidebarLinks;