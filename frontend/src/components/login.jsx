import React from "react"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../Services/apiConnector";
import { endpoints } from "../Services/apis";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const {LOGIN_API} = endpoints

const Login = () => {

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful },
    } = useForm()


    const submitForm = async (data) => {
        console.log("LoginForm Data - ", data)
        setLoading(true)
        const toastId = toast.loading("Loading")
        try{
            const response = await apiConnector("POST",LOGIN_API,data, { withCredentials: true })
            console.log("response", response)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            localStorage.setItem("token", JSON.stringify(response.data.token))
            toast.success("Login successful.")
            navigate("/dashboard")
        }
        catch(error){
            toast.error(`Login failed. ${error.message}`)
            console.log("Login failed. ",error)
            navigate("/login")
        }
        toast.dismiss(toastId)
        setLoading(false)
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                password:"",
            })
        }
    }, [reset, isSubmitSuccessful])


  return (
    <form className="flex flex-col gap-7 text-center h-[80vh] w-[90vw] md:w-[50vw] bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100" onSubmit={handleSubmit(submitForm)}>

<h1 className="text-center text-4xl mt-[2vh]">
        <span className="font-bold text-5xl">L</span>
        <span className="font-thin">OG</span>
        <span className="font-bold">IN</span>
        <span className="font-thin text-5xl"> F</span>
        <span className="font-bold">OR</span>
        <span className="font-thin text-5xl">M</span>
    </h1>

        <div className="mx-[2vw] my-[3vh] flex flex-col gap-7 text-left">

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-2xl font-bold">
                    Email
                </label>
                <input type="email" name="email" id="email"
                className="p-[0.7rem] rounded" placeholder="Enter Your Email"
                {...register("email", {required:true})} 
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px]  text-red-950">
                            !Please Enter Your Email Address.
                        </span>
                    )
                }

            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-2xl font-bold" >
                    Password
                </label>
                <input type="password" name="password" id="password"
                className="p-[0.7rem] rounded" placeholder="Enter Your Password"
                {...register("password", { 
                    required: "Password is required", 
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                })}
                />
                {
                    errors.password && (
                        <span className="-mt-1 text-[12px]  text-red-950">
                            !Please Enter 6 digit Password.
                            </span>
                        )
                }
            </div>

            <Link to="/forgot-password">
                <p className="text-right text-md text-blue-100">
                    Forgot Password
                </p>
            </Link>

            <div>
            <button className="px-[0.6rem] py-[0.3rem] w-[10vw] text-center  text-2xl font-semibold rounded bg-slate-300 mt-[4vh] " type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
            </div>
        </div>

        <Link to="/signup">
            <button className="px-[0.6rem] py-[0.3rem] text-2xl font-semibold rounded bg-slate-300">Signup</button>
        </Link>

    </form>
  )
};

export default Login;