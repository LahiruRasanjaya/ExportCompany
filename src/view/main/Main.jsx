import './Main.css';
import {Dashboard} from "../dashboard/Dashboard";
import {ManageEmployee} from "../manage-employee/ManageEmployee";
import {ManageItem} from "../manage-item/ManageItem";
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import cmImage from '../../assets/images/cmInt.jpg'; 

export function Main() {

    const navigate = useNavigate();

    function handleSignOut(){
        localStorage.removeItem("user");
        navigate('/login');
    }

    return (
        <>
            <header className="p-2 border-b bg-cyan-700 h-auto
                flex justify-between items-center">
                <img src={cmImage} alt="CM International Logo" className="w-30 h-20" />
                <h1 className=" font-bold text-white text-4xl">
                C M International Export Kurunduwatta Gonamulla
                </h1>
                <button onClick={handleSignOut}
                    className="border px-3 py-1 rounded text-white
                    border-rose-600 hover:bg-rose-600
                    hover:text-white">
                    Sign Out
                </button>
            </header>
            <nav className="list-none flex items-center parent-container nav-container
            border-b justify-end bg-gray-400">
                <NavLink className="link" to="home">
                    <li className="p-2 border-x
                    hover:bg-cyan-700 hover:text-white
                    cursor-pointer">HOME</li>
                </NavLink>
                <NavLink to="employee">
                    <li className="p-2 hover:bg-cyan-700
                    hover:text-white
                    cursor-pointer">EMPLOYEES</li>
                </NavLink>
                <NavLink to="items">
                    <li className="p-2 border-x
                    hover:bg-cyan-700 hover:text-white
                    cursor-pointer">EMPLOYEES ATTENDANCE</li>
                </NavLink>
                <NavLink to="checkAttendance">
                    <li className="p-2 border-x
                    hover:bg-cyan-700 hover:text-white
                    cursor-pointer">CHECK ATTENDANCE</li>
                </NavLink>
            </nav>
            <div className="flex justify-center">
                <Outlet />
            </div>
        </>
    );
}

