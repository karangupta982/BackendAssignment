import React from "react"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Dashboard = (props) => {

    const navigate = useNavigate()

    const logoutHandler = () =>{
        localStorage.removeItem("token")
        toast.success("Logged Out")
        navigate("/")
    }
  return (
    
    <div className="h-[70vh] w-[60vw] text-white font-bold flex justify-center items-center flex-col text-5xl bg-gray-700 gap-[10vh] backdrop-blur-sm bg-opacity-70 border border-gray-10 rounded-md  backdrop-filter">
        
        <h1 className="">WelCome to Dashboard.</h1>
        <Link to="/" className="">Home</Link>
        <div onClick={logoutHandler} className="cursor-pointer">
            Logout
        </div>
    </div>
  )
};

export default Dashboard;