import React from "react"
import {Link} from "react-router-dom"


const Home = () => {
  return (
    <div className="h-[70vh] w-[60vw]  bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100">
        <h1 className="text-5xl relative top-2 text-center text-white">Home</h1>
            <div className="flex justify-between items-center m-[5rem] text-4xl font-bold text-white">
                <Link to={"/signup"}>
                    Signup
                </Link>

                
                  <Link to={"/dashboard"}>
                      Dashboard
                  </Link>
                

                <Link to={"/login"}>
                    Login
                </Link>

                
            </div>
    </div>
  )
};

export default Home;