import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {useForm}  from "react-hook-form"
import {toast} from "react-hot-toast"
import {apiConnector} from "../Services/apiConnector"
import { endpoints } from "../Services/apis";
import { useNavigate } from 'react-router-dom';



const {SENDOTP_API} = endpoints;

const SignUp = () => {
    const [loading,setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful },
    } = useForm()

    const navigate = useNavigate()



    const submitForm = async (data)=>{
        console.log("Form Data - ", data)
        setLoading(true)
        const toastId = toast.loading("Signing up");
        
        try{
            const response = await apiConnector("POST",SENDOTP_API,
                {
                    email: data.email,
                    checkUserPresent: true,
                }
            )
            console.log("response from signup", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email",{ state: { userData: data } })
        }
        catch(error){
            console.log("SignUp Failed.", error.message)
            toast.error("SignUp Failed." + error.message)
            navigate("/signup")
        }
        setLoading(false)
        toast.dismiss(toastId)
    }


    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                userName:"",
                email:"",
                password:"",
            })
        }
    }, [reset, isSubmitSuccessful])


  return (
   <div className=" h-[80vh] w-[90vw] md:w-[50vw] bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100">

    <h1 className="text-center text-4xl mt-[2vh]">
        <span className="font-bold text-5xl">S</span>
        <span className="font-thin">IG</span>
        <span className="font-bold">NU</span>
        <span className="font-thin text-5xl">P F</span>
        <span className="font-bold">OR</span>
        <span className="font-thin text-5xl">M</span>
    </h1>
        <form className="mx-[2vw] my-[3vh] flex flex-col gap-7 text-left" onSubmit={handleSubmit(submitForm)}>

        <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <label className="text-2xl font-normal" htmlFor="userName">UserName</label>

                <input type="text" name="userName" id="userName" placeholder="Your Name" className="p-[0.7rem] rounded"
                {...register("userName", { required:true})} 
                />
                {
                    errors.userName && (
                        <span className="-mt-1 text-[12px]  text-red-950">
                            !Please Enter Your UserName.
                        </span>
                    )
                }
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-2xl font-normal">
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
                <label htmlFor="password" className="text-2xl font-normal">
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
                        <span className="-mt-1 text-[12px] text-red-950">
                            !Please Enter 6 Digit Password.
                        </span>
                        )
                }
            </div>

            <div className="text-center">
                <button className="px-[0.6rem] py-[0.3rem]  text-center  text-2xl font-semibold rounded bg-slate-300 mt-[4vh]  " type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
             </div>
        </div>

        <Link to="/login" className="text-center">
                <button className="px-[0.6rem] py-[0.3rem] text-2xl font-semibold rounded bg-slate-300 ">Login</button>
            </Link>
        </form>
   </div>
    
  )
};

export default SignUp;